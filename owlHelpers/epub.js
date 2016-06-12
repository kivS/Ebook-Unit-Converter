var bot = {};


bot.start = function(file){
	//return console.info('['+file.name + '] is an epub ebook!');
	
	// Use FileReader API to load file to memory
	var flRdr = new FileReader();
	// Read ebook as binary string
	flRdr.readAsBinaryString(file);

	flRdr.onload = function(e){
		//Use jszip to get ebook's content
		window.zip = new JSZip();
		//TODO: bind current epub file into the zippedFiles promise
		zip.loadAsync(e.target.result).then(function(zippedFiles) {
			// Go over each file in the zip 
			for(var zippedFile in zippedFiles.files){
				// If file has no data || file name matches any parementers(eg: .jpg, .png ..) then file is skipped
				if( (!zip.files[zippedFile]._data) || (zip.files[zippedFile].name.match(/(\.png|\.css|\.jp\w*g|\.xml)/gi) !== null) ) continue;

				
				
				var currentFileInZip = zip.files[zippedFile];
				
				
				// Get data from each matched text & and bind the current file to the promise result so johny doesn't feel list
				currentFileInZip.async('string').then(processCurrentFile.bind(null,currentFileInZip));

				function processCurrentFile(currentFile,data){
					console.log('Current File:')
					console.log(currentFile);
					console.log('data: '+data);

					var regexp,regExp_result,convertedData;
					// Iterate over the units the user chose and see if there's an early simple match with the data
					$owl.config.unit[$owl.user_options.unit].forEach(function(el){
						//Build the regExp with array(unit.alias) for the data
						regexp = new RegExp("\\b("+el.alias.toString().replace(/,/g,'|')+")\\b",'gi');
						console.log('RegExp: '+regexp);
						regExp_result = data.match(regexp);
						console.log('RegExp result: '+regExp_result);

						/*if(regExp_result !== null){
							//Converts the data
							//TODO: check if data is static after converting it twice!
							convertedData = owlUnitsBot.converter(data,$owl.config.unit[$owl.user_options.unit]);
							$debug.converted_data = convertedData;
							//Save converted data
							//zip.file(zippedFile, convertedData);
						}*/

					});

				}
				
				

			}
		});
		
		
	}
}




module.exports = bot;