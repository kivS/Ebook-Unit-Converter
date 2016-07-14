var React = require('react');

module.exports  = React.createClass({
	displayName: 'feeds',
	render: function(){
		return(
			<div className="row">
			  <div className="col-xs-12 text-xs-center">
			    <div className="alert alert-success" role="alert">
			      <strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message</a>.
			    </div>
			  </div>
			  <div className="col-xs-12 text-xs-center">
			    <div className="alert alert-danger" role="alert">
			      <strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message</a>.
			    </div>
			  </div>
			  <div className="col-xs-12 text-xs-center">
			    <div className="alert alert-success" role="alert">
			      <strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message</a>.
			    </div>
			  </div>
			</div>
		);
	}
});