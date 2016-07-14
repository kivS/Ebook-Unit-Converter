// React init
var React = require('react');
var ReactDOM = require('react-dom');


var App = React.createClass({
	render: function(){
		return(
			<div className="container-fluid">

			  {/*Select system*/}
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
			  
			  {/*Drag & drop Area*/}
			  <div className="row">
			    <div className="col-xs-12 text-xs-center">
			      <button className="btn btn-primary-outline" type="submit">Drag &amp; Drop files or Click here</button>
			    </div>
			  </div>
			  
			  {/*Download all ebooks */}
			  <div className="row">
			    <div className="col-xs-12 text-xs-center">
			      <button className="btn btn-primary-outline" type="submit">Download  All</button>
			    </div>
			  </div>
			  
			 {/* Ebook list area*/}
			  <div className="row">
			    <div className="col-xs-12 text-xs-center">
			      <div className="card-deck">

			       <div className="card">
			         <div className="card-block">
			           <h6 className="card-title">Ebook title</h6>
			           <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			         </div>
			       </div>

			       <div className="card">
			         <div className="card-block">
			           <h6 className="card-title">Ebook title</h6>
			           <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			         </div>
			       </div>

			       <div className="card">
			         <div className="card-block">
			           <h6 className="card-title">Ebook title</h6>
			           <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			         </div>
			       </div>

			       <div className="card">
			         <div className="card-block">
			           <h6 className="card-title">Ebook title</h6>
			           <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			         </div>
			       </div>

			        <div className="card">
			         <div className="card-block">
			           <h6 className="card-title">Ebook title</h6>
			           <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			         </div>
			       </div>

			        <div className="card">
			         <div className="card-block">
			           <h6 className="card-title">Ebook title</h6>
			           <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			         </div>
			       </div>

			        <div className="card">
			         <div className="card-block">
			           <h6 className="card-title">Ebook title</h6>
			           <a href="#" className="btn btn-primary-outline btn-block">Download</a>
			         </div>
			       </div>

			      </div>
			    </div>
			  </div>
			  
			   {/*info & error Feed area*/}
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
			  
			</div>
		);
	}
});


ReactDOM.render(<App/>, document.getElementById('app'));

console.log('All systems go!');