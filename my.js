document.addEventListener("DOMContentLoaded", function(event) { 
  var DEBUG = true;
  if(DEBUG == false) console.log = function (){},console.error = function(){};
	console.log("Document ready");
  window.$debug = {}; 

	// Set start up event for input
	document.getElementById('files').addEventListener('change',startOwl);
	
  //Definition of program
  $owl = require('./owlHelpers/owlVars.js');

  // Load converter modules
  var epub = require('./owlHelpers/epub.js');

  // Load units bot
  owlUnitsBot = require('./owlHelpers/owlUnitsBot.js');

  /**
   * User inserts ebooks and chooses beetween imperic or metric system. Owl picks up his pen and starts cramming. Users gets his freshly converted ebooks 
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  function startOwl(e){

    try{
        //Get User's units (if user.unit is not empty and if user.unit equals metric or imperial then user.unit is valid)
        var isUserUnitSet = null;

        while(isUserUnitSet !== true){
          $owl.config.user_options.unit = prompt("Change ebook units to? [toMetric = 0 | toImperial = 1]");
          if($owl.config.user_options.unit === '0') $owl.config.user_options.unit = 'toMetric';
          if($owl.config.user_options.unit === '1') $owl.config.user_options.unit = 'toImperial';

          isUserUnitSet = ($owl.config.user_options.unit !== null && $owl.config.user_options.unit.match(/(toMetric|toImperial)$/gi) !== null) ? true:false;

        }

        console.log($debug.files = e.target.files);

        var files = e.target.files;

      //Goes over & filters files uploaded by the user and calls the apropriate block for decoding the supported file
        for (var i = 0; i < files.length; i++) {
          
          var fileExtension = files[i].name.split('.').pop();
          var fileType = files[i].type;

          var isEpub = fileExtension === 'epub' && fileType === 'application/epub+zip';

          switch(true){
            case isEpub :
              epub.start(files[i]);
            break;

            default:
              $owl.infos.error.push('['+files[i].name+'] is not supported by owl');
            
          }
        }
          

    }catch(e){
      $owl.infos.error.push(e.stack);
      console.error(e.stack)
    }

  }

 



  
/******************************************************************************************************************************************/
});

