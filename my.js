// React init
var React = require('react');
var ReactDOM = require('react-dom');

// Front-end react modules
var DragAndDrop = require('./myModules/react-front/dragAndDrop.js');
var EbookList = require("./myModules/react-front/ebookList.js");
var Feeds = require("./myModules/react-front/feeds.js");
var UnitSelect = require("./myModules/react-front/unitSelect.js");
var DownAllEbooks = require("./myModules/react-front/downAllEbooks.js");

// Load config file
var $config = require('./config.js');

// Load converter modules
var $epub = require('./myModules/epub.js');

var App = React.createClass({
/*	getInitialState: function(){
		return {
			
		}	
	},*/
	startBot: function(files){
		
		try{

			// Local $config
			var config = $config.open();

		    console.log(files);

		   
		  //Goes over & filters files uploaded by the user and calls the apropriate block for decoding the supported file
		    for (var i = 0; i < files.length; i++) {
		      
		      var fileExtension = files[i].name.split('.').pop();
		      var fileType = files[i].type;

		      var isEpub = fileExtension === 'epub' && fileType === 'application/epub+zip';

		      switch(true){
		        case isEpub :
		          $epub.start(files[i]);
		        break;

		        default:
		          config.infos.error.push('['+files[i].name+'] is not supported by owl');
		          $config.save(config);
		        	
		      }
		    }
		      

		}catch(e){
		  //config.infos.error.push(e.stack);
		  console.error(e.stack)
		}
	},
	render: function(){
		return(
			<div className="container-fluid">
				{/*Select unit*/}
				<UnitSelect  />

			 	{/*Drag & drop Area - file upload*/}
			 	<DragAndDrop startBot={this.startBot}/>
			  
			  	{/*Download all ebooks */}
			  	<DownAllEbooks />
			  
			  	{/* Ebook list area*/}
			  	<EbookList /> 
			  
			 	{/*info & error Feed area*/}
			 	<Feeds />  
			</div>
		);
	}
});


ReactDOM.render(<App/>, document.getElementById('app'));

console.log('All systems go!');