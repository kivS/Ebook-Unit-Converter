var bot = {};


bot.start = function(file){
	//console.info('['+file.name + '] is an epub ebook!');
	
	// Use FileReader API to load file to memory
	var flRdr = new FileReader();
	// Read ebook as binary string
	flRdr.readAsBinaryString(file);

	flRdr.onload = function(e){
		//Use jszip to get ebook's content
		window.zip = new JSZip();
		//load zip & bind current epub file into the zippedFiles promise
		zip.loadAsync(e.target.result).then(processEpub.bind(null,file.name));
		
		function processEpub(epubFile,zippedFiles){
			console.log('\nCurrent epub file: '+epubFile);
			var zippedFiles = zippedFiles.files;
			var lastZippedFileTracker = Object.keys(zippedFiles);
	
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

				// Get data from each matched text,bind the current file to the promise result so johny doesn't feel lost & bind currentFile.name to get last processed file in zip 
				currentFileInZip.async('string').then(processCurrentFile.bind(null,currentFileInZip)).then(checkLastFile.bind(null,currentFileInZip.name));

				function processCurrentFile(currentFile,data){
					console.log('\nCurrent File:')
					console.log(currentFile);
					console.log('data: '+Boolean(data));
					// Let's stop here if there's no data shall we?!
					if(Boolean(data) == false) return false;

					var regexp,regExp_result, newData;
					// Iterate over the units the user chose and see if there's an early simple match with the data
					// TODO: instead of a loop on the units maybe it's better just get all the alias in the user unit and build a bigger regexp to run only once
					// 		 that way there's no false convertions
					// TODO: bug - last proccessed file in zip on show on some epubs		 
					$owl.config.unit[$owl.user_options.unit].forEach(function(el){
						//Build the regExp with array(unit.alias) for the data
						regexp = new RegExp("\\b("+el.alias.toString().replace(/,/g,'|')+")\\b",'gi');
						console.log('RegExp: '+regexp);
						regExp_result = data.match(regexp);
						console.log('RegExp result: '+regExp_result);
						if(regExp_result !== null){
							//Converts the data
							newData = owlUnitsBot.converter(data,$owl.config.unit[$owl.user_options.unit]);

							if(newData != null){
								data = newData;
								console.log('Converted data: '+data);
								//Save converted data into current file
								zip.file(currentFile.name, data);
							}else{
								console.log('Converted data: '+newData);
							}

						}

					});

				}

				function checkLastFile(currentFileName){
					if(lastZippedFileTracker.length !== 1){
						lastZippedFileTracker = lastZippedFileTracker.filter(e=>e!==currentFileName);
						//console.log('lastZippedFileTracker:'+lastZippedFileTracker);
					}else{
						console.log('Last processed file in zip: '+currentFileName);
						//Save converted epub ebooks
						//zip.generateAsync({type:'blob'}).then(saveEpubFile.bind(null,epubFile));

						function saveEpubFile(epubFile_name,epubFile_data){
							console.log('File saved: '+epubFile);
							console.log(epubFile_data);
							//
							$owl.converted_ebooks.push({
								'name':epubFile_name,
								'file_data':epubFile_data
							});
						}
					}
				}				
			});
		}
		
	} 

}




module.exports = bot;