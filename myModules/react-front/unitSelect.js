var React = require('react');
var $config = require('../../config.js');

module.exports  = React.createClass({
  displayName: 'unitSelect',

  handleSelect: function(sel,e){
    var config = $config.open();
    config.user_options.unit = sel;
    $config.save(config);

    document.querySelectorAll('.btn-group label').forEach(el => {el.classList.remove('active')});

    if(sel === 'toMetric'){
     document.querySelectorAll('.btn-group label')[0].classList.add('active');
    }else{
      document.querySelectorAll('.btn-group label')[1].classList.add('active');
    }
  
  },
  render: function(){
    return(
      <div className="row">
        <div className="col-xs-12 text-xs-center">
          <h4><span className="label label-default">Convert Ebook to:</span></h4>
          <br/>
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-primary-outline" onClick={this.handleSelect.bind(null,'toMetric')}>
              <input type="radio" name="toMetric" id="option1" autoComplete="off"/>
              Metric System
            </label>
            <label className="btn btn-primary-outline" onClick={this.handleSelect.bind(null,'toImperial')}>
              <input type="radio" name="toImperial" id="option2" autoComplete="off"/> 
              Imperial System
            </label>
          </div>
        </div>
      </div>
    );
  }
});