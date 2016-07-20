var React = require('react');

module.exports  = React.createClass({
	displayName: 'ebookList',
	render: function(){
		return(
			<div className="row">
			  <div className="col-xs-12 text-xs-center">
			    <div className="card-deck">
			  	{this.props.converted_ebooks.reverse().map(ebook => {
			  		return <Ebook key={ebook.id} name={ebook.name} system={ebook.system} />
			  	})}
			    </div>
			  </div>
			</div>
		);
	}
});

var Ebook = React.createClass({
	render: function(){
		return(
			<div className="card">
			  <div className="card-block">
			  	<h6 className="card-title"><strong>{this.props.system}</strong></h6>
			    <h6 className="card-title">{this.props.name}</h6>
			    <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			  </div>
			</div>
		);
	}
});