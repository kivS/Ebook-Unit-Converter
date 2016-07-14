var React = require('react');

module.exports = React.createClass({
	displayName: 'downAllEbooks',
	render: function(){
		return(
			<div className="row">
			  <div className="col-xs-12 text-xs-center">
			    <button className="btn btn-primary-outline" type="submit">Download  All</button>
			  </div>
			</div>
		);
	}
});
