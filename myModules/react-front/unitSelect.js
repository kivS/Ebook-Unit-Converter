var React = require('react');
var $config = require('../../config.js');

module.exports  = React.createClass({
  displayName: 'unitSelect',

  handleSelect: function(sel,e){
    //TODO: events is exec twice
    var config = $config.open();
    config.user_options.unit = sel;
    $config.save(config);
  },
  render: function(){
    return(
      <div className="row">
        <div className="col-xs-12 text-xs-center">
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-primary-outline" onClick={this.handleSelect.bind(this,'toMetric')}>
              <input type="radio" name="toMetric" id="option1" autoComplete="off"/>
              Metric System
            </label>
            <label className="btn btn-primary-outline" onClick={this.handleSelect.bind(this,'toImperial')}>
              <input type="radio" name="toImperial" id="option2" autoComplete="off"/> 
              Imperial System
            </label>
          </div>
        </div>
      </div>
    );
  }
});