// 
   // Owls global properties
var $owl = {
	'error': new Array(),
	'warning': new Array(),
	'Sucess': new Array()
}


//



/**
		 * Filters files uploaded by the users and calls the apropriate block for decoding the supported file
		 * @param  {[type]} file [description]
		 * @return {[object]}       [description]
		 */
		function owlSupports(file){
			
			var fileExtension = file.name.split('.').pop();
			var fileType = file.type;

			var isEpub = fileExtension === 'epub' && fileType === 'application/epub+zip';

			switch(file){
				case isEpub :
					console.info('['+file.name + '] is an epub ebook!');
				break;

				default:
					$owl.error.push('['+file.name+'] is not supported by owl');
					console.info($owl.error.pop());
			}

		}
