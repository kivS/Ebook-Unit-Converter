var React = require('react');
var $config = require('../../config.js');

module.exports  = React.createClass({
	displayName: 'dragAndDrop',

	handleUploadBtn: function(){
		if($config.open().user_options.unit == null){
			alert("Select a unit to convert to");
			return;
		}
		document.getElementById('uploadFiles').click();	

	},
	handleFileUpload: function(e){
		this.props.startBot(e.target.files);
		e.target.value = '';
	},
	render: function(){
		return(
			<div className="row">
			  <div className="col-xs-12 text-xs-center">
			    <button className="btn btn-primary-outline" onClick={this.handleUploadBtn} type="submit">Click here to upload</button>
			    <input type="file" name="uploadFiles[]" id="uploadFiles" onChange={this.handleFileUpload} style={{display:'none'}} multiple/>
			  </div>
			</div>
		);
	}
});