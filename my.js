// React init
var React = require('react');
var ReactDOM = require('react-dom');

// Front-end react modules
var DragAndDrop = require('./myModules/react-front/dragAndDrop.js');
var EbookList = require("./myModules/react-front/ebookList.js");
var Feeds = require("./myModules/react-front/feeds.js");
var UnitSelect = require("./myModules/react-front/unitSelect.js");
var DownAllEbooks = require("./myModules/react-front/downAllEbooks.js");

var App = React.createClass({
	render: function(){
		return(
			<div className="container-fluid">
				{/*Select unit*/}
				<UnitSelect />

			 	{/*Drag & drop Area*/}
			 	<DragAndDrop />
			  
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