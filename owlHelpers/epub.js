var bot = {};


bot.start = function(file){
	//return console.info('['+file.name + '] is an epub ebook!');
	
	// Use FileReader API to load file to memory
	var flRdr = new FileReader();

	flRdr.readAsBinaryString(file);

	flRdr.onload = function(e){
		//Use jszip to get zip's content
		window.zip = new JSZip();

		zip.loadAsync(e.target.result).then(function(zippedFiles) {
			// Go over each file in the zip 
			for(var zippedFile in zippedFiles.files){
				// If file has no data || file name matches any parementers(eg: .jpg, .png ..) then file is skipped
				if( (!zip.files[zippedFile]._data) || (zip.files[zippedFile].name.match(/(\.png|\.css|\.jp\w*g|\.xml)/gi) !== null) ) continue;

				//console.log(zip.files[zippedFile].name);
				
				// Get data from each matched text file
				if(zip.files[zippedFile].name == "OEBPS/part19.xhtml") zip.files[zippedFile].async('string').then(function(data){
					$debug.test_data =data;
					
					// Iterate over the units the user chose and see if there's a match with the data
					 var regexp,regExp_result,convertedData;
					$owl.config.unit[$owl.user_options.unit].forEach(function(el){
						//Build regExp for data with each alias(Array) ex: (km | kilometer | ..)
						regexp = new RegExp("\\b("+el.alias.toString().replace(/,/g,'|')+")\\b",'gi');
						console.log('RegExp: '+regexp);
						regExp_result = data.match(regexp);
						console.log('RegExp result: '+regExp_result);

						if(regExp_result !== null){
							convertedData = owlUnitsBot.converter(data,$owl.config.unit[$owl.user_options.unit]);
							$debug.converted_data = convertedData;
						}
						
					});   


				});

			}
		});
		
		
	}
}




module.exports = bot;