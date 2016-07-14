var React = require('react');

module.exports  = React.createClass({
  displayName: 'unitSelect',
  render: function(){
    return(
      <div className="row">
        <div className="col-xs-12 text-xs-center">
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-primary-outline">
              <input type="radio" name="options" id="option1" autoComplete="off"/>
              Metric System
            </label>
            <label className="btn btn-primary-outline">
              <input type="radio" name="options" id="option2" autoComplete="off"/> 
              Imperial System
            </label>
          </div>
        </div>
      </div>
    );
  }
});