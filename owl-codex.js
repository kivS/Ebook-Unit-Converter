
/*******************************************************************************************************************************************
 *
 *                                      [ START ]  PROGRAM VARIABLES
 * 
 ******************************************************************************************************************************************/ 

 
var $owl = {
	infos:{
		error: new Array()
	
	},
	config:{},
	user_options:{}
}
/*******************************************************************************************************************************************
 *
 *                                      [ END ]  PROGRAM VARIABLES
 *
 * 
 ******************************************************************************************************************************************/







/*******************************************************************************************************************************************
 *
 *                                      [ START ]  MAIN BLOCK - PROGRAM STARTER
 *
 * 
 ******************************************************************************************************************************************/

/**
 * User inserts ebooks and chooses beetween imperic or metric system. Owl picks up his pen and starts cramming. Users gets his freshly converted ebooks 
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function startOwl(e){
	console.log(f = e.target.files);

	var files = e.target.files;

//Goes over & filters files uploaded by the user and calls the apropriate block for decoding the supported file
	for (var i = 0; i < files.length; i++) {
		
		var fileExtension = files[i].name.split('.').pop();
		var fileType = files[i].type;

		var isEpub = fileExtension === 'epub' && fileType === 'application/epub+zip';

		switch(true){
			case isEpub :
				epub_file(files[i]);
			break;

			default:
				$owl.error.push('['+files[i].name+'] is not supported by owl');
			
		}
	}
    

}

/*******************************************************************************************************************************************
 *
 *                                      [ END ]  MAIN BLOCK - PROGRAM STARTER
 *
 * 
 ******************************************************************************************************************************************/







/*******************************************************************************************************************************************
 *
 *                                      [ START ]  SECONDARY BLOCK - EBOOK TYPES
 * 
 ******************************************************************************************************************************************/

/**
 * Decode, search & replace  and encode of file
 * @return {[type]} [description]
 */
function epub_file(file){
	//return console.info('['+file.name + '] is an epub ebook!');
	// Use FileReader API to load file to memory
	var flRdr = new FileReader();

	flRdr.readAsBinaryString(file);

	flRdr.onload = function(e){
		//Use jszip to get zip's content
		var zip = new JSZip();

		zip.loadAsync(e.target.result).then(function(zippedFiles) {
			// Go over each file in the zip avoiding non text files
			for(var zippedFile in zippedFiles.files){
				// If file has no data || file name matches any parementers(eg: .jpg, .png ..) then file is skipped
				if( (!zip.files[zippedFile]._data) || (zip.files[zippedFile].name.match(/(\.png|\.css|\.jp\w*g|\.xml)/gi) !== null) ) continue;

				console.log(zip.files[zippedFile]);
				//if(zip.files[zippedFile].name == "OEBPS/part19.xhtml") _translateText(zip.files[zippedFile].asText());

			}
		});
		
		
	}

	

	function _translateText(text){
		console.log(text);
	}

}

/*******************************************************************************************************************************************
 *
 *                                      [ END ]  SECONDARY BLOCK - EBOOK TYPES
 *
 * 
 ******************************************************************************************************************************************/