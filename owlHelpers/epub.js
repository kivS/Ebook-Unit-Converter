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
		//bind current epub file into the zippedFiles promise
		zip.loadAsync(e.target.result).then(processEpub.bind(null,file.name));
		
		function processEpub(epubFile,zippedFiles){
			console.log('\nCurrent epub file: '+epubFile);
			// Go over each file in the zip 
			for(var zippedFile in zippedFiles.files){
				// If file has no data || file name matches any parementers(eg: .jpg, .png ..) then file is skipped
				if( (!zip.files[zippedFile]._data) || (zip.files[zippedFile].name.match(/(\.png|\.css|\.jp\w*g|\.xml)/gi) !== null) ) continue;
			
				var currentFileInZip = zip.files[zippedFile];
				// Get data from each matched text & and bind the current file to the promise result so johny doesn't feel lost
				currentFileInZip.async('string').then(processCurrentFile.bind(null,currentFileInZip));

				function processCurrentFile(currentFile,data){
					console.log('\n');
					console.log('Current File:')
					console.log(currentFile);
					console.log('data: '+Boolean(data));

					var regexp,regExp_result, newData;
					// Iterate over the units the user chose and see if there's an early simple match with the data
					// TODO: instead of a loop on the units maybe it's better just get all the alias in the user unit and build a bigger regexp to run only once
					// 		 that way there's no false convertions
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

			}

		}
		
	} 

}




module.exports = bot;