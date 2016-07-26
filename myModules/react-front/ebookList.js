var React = require('react');
var $config = require('../../config.js');

module.exports  = React.createClass({
	displayName: 'ebookList',
	render: function(){
		return(
			<div className="row">
			  <div className="col-xs-12 text-xs-center">
			    <div className="card-deck">
			  	{this.props.converted_ebooks.reverse().map(ebook => {
			  		return <Ebook key={ebook.id} name={ebook.name} system={ebook.system} id={ebook.id} />
			  	})}
			    </div>
			  </div>
			</div>
		);
	}
});

var Ebook = React.createClass({
	handleDownload: function(e){
		console.log("Download button triggered! for book with id:%s and name:%s",this.props.id,this.props.name);

		setTimeout(() =>{
			// remove ebook from converted_ebooks
			var config = $config.open();
			config.converted_ebooks = config.converted_ebooks.filter(ebook => ebook.id !== this.props.id);
			$config.save(config);

			// Remove blob url reference
			URL.revokeObjectURL(this.href);

		},1000);

	},
	componentDidMount: function(){
		if(window.converted_ebooks_data[0]){
			//get ebook ref from window.converted_ebooks_data
			var selectedEbook = window.converted_ebooks_data.filter(ebook => ebook.id === this.props.id.toString());
			selectedEbook = selectedEbook[0];
			// Create Blob URL and feed it to the link
			this.href = URL.createObjectURL(selectedEbook.file_data);
		}
	},

	render: function(){
		return(
			<div className="card">
			  <div className="card-block">
			  	<span className="label label-pill label-info">{this.props.system}</span>
			  	<br/>
			  	<br/>
			    <h6 className="card-title">{this.props.name}</h6>
			    <a href={this.href} download={this.props.name} className="btn btn-primary-outline btn-block" onClick={this.handleDownload}>Download</a>
			  </div>
			</div>
		);
	}
});