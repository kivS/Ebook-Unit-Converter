var $units = require('./units.js');
var $config = require('../config.js');
var JSZip = require('../node_modules/jszip/dist/jszip.min.js');

var bot = {};
var lastZippedFileTracker,filesChangedInEpub,zip,config,aliasesRegExp;

bot.start = function(file){
	//console.info('['+file.name + '] is an epub ebook!');
	// Use FileReader API to load file to memory
	var flRdr = new FileReader();
	// Read ebook as binary string
	flRdr.readAsBinaryString(file);

	flRdr.onload = function(e){
		// Local $config
		config = $config.open();
		//Use jszip to get ebook's content
		zip = new JSZip();
		//load zip & bind current epub file into the zippedFiles promise
		zip.loadAsync(e.target.result).then(processEpub.bind(null,file.name));		
	} 
}

function processEpub(epubFile,zippedFiles){
	console.log('\nCurrent epub file: '+epubFile);
	var zippedFiles = zippedFiles.files;
	lastZippedFileTracker = Object.keys(zippedFiles);

	// init epub changed tracker
	filesChangedInEpub = 0;

	//Build aliases regExp
	aliasesRegExp = new RegExp("\\b("+getAliasesRegExp()+")\\b",'gi');

	// Go over each file in the zip 
	Object.keys(zippedFiles).forEach(key=>{
		// If file has no data || file name matches any parementers(eg: .jpg, .png ..) then file is skipped & removed from the lastZippedFileTracker
		if( (!zippedFiles[key]._data) || (zippedFiles[key].name.match(/(\.png|\.css|\.jp\w*g|\.xml)/gi) !== null) ){
			//new array without the matched keys
			lastZippedFileTracker = lastZippedFileTracker.filter(e=>e!==key);
			return;
		} 

		//Get current fileInZip object
		var currentFileInZip = zippedFiles[key];

		//console.log(currentFileIn);

		// Get data from each matched text,bind the current file to the promise result so johny doesn't feel lost & bind currentFile.name to get last processed file in zip 
		currentFileInZip.async('string').then(processCurrentFile.bind(null,currentFileInZip,epubFile)).then(checkLastFile.bind(null,currentFileInZip.name,epubFile));

	});
}

function getAliasesRegExp(){
	try{
		var x = '';
		// Local $config
		var config = $config.open();

		config.unit[config.user_options.unit].forEach(el=>{
			x += el.alias.toString()+",";
		});
		// take out last ',' and replace ',' to '|''
		return x.slice(0,-1).split(',').join('|');

	}catch(e){
		console.error(e.stack);
	}
}

function processCurrentFile(currentFile,epubFile,data){
	console.log('\nCurrent File:')
	console.log(currentFile);
	console.log('data: '+Boolean(data));
	// Let's stop here if there's no data shall we?!
	if(Boolean(data) == false) return false;

	//Aliases regExp
	console.log('Aliases RegExp: '+aliasesRegExp);
	var regExp_result = data.match(aliasesRegExp);
	console.log('RegExp result: '+regExp_result);

	if(regExp_result !== null){
		//Converts the data
		var newData = $units.converter(data,config.unit[config.user_options.unit],epubFile);

		if(newData != null){
			data = newData;
			console.log('Converted data: '+data);

			//update epub tracker
			filesChangedInEpub +=1;

			//Save converted data into current file
			zip.file(currentFile.name, data);
		}else{
			console.log('Converted data: '+newData);
		}

	}


}

function checkLastFile(currentFileName,epubFile){
	if(lastZippedFileTracker.length !== 1){
		lastZippedFileTracker = lastZippedFileTracker.filter(e=>e!==currentFileName);
		//console.log('lastZippedFileTracker:'+lastZippedFileTracker);
	}else{
		console.log('Last processed file in zip: '+currentFileName);

		// save epub only if its files have been updated...
		console.log('Number of files changes in [%s]: %s',epubFile,filesChangedInEpub);
		if(filesChangedInEpub === 0){
			var config = $config.open();
			config.infos.push({
				id: Date.now()+Math.random(),
				type: 'error',
				msg: 'Nothing to change in ['+epubFile+']...'
			});
			$config.save(config);

			return false;
		}

		//Save converted epub ebooks
		zip.generateAsync({type:'blob'}).then(saveEpubFile.bind(null,epubFile));

	}
}

function saveEpubFile(epubFile_name,epubFile_data){
	console.log('File saved: '+epubFile_name);
	console.log(epubFile_data);
	//
	// Local $config
	var config = $config.open();
	var file_id = Date.now()+Math.random();

	window.converted_ebooks_data.push({
		id: file_id.toString(),
		file_name: epubFile_name,
		file_data: epubFile_data
	});

	config.converted_ebooks.push({
		id: file_id,
		system: (config.user_options.unit === 'toImperial')? 'Imperial System':'Metric System',
		name: epubFile_name,
	});
	$config.save(config);
}

module.exports = bot;