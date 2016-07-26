var React = require('react');

module.exports  = React.createClass({
	displayName: 'feeds',
	render: function(){
		return(
			<div className="row feed_area">
				{this.props.infos.reverse().map(info => {
					return	<Alert key={info.id} type={(info.type == 'error') ? 'danger':'success'} msg={info.msg} />;
				})}
			</div>
		);
	}
});

var Alert = React.createClass({
	render: function(){
		return(
			<div className="col-xs-12 text-xs-center">
			  <div className={"alert alert-"+this.props.type} role="alert">
			   		{this.props.msg}
			  </div>
			</div>
		);
	}
});