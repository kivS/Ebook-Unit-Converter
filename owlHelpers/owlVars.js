module.exports = {

  	infos:{
  		error: new Array()
  	
  	},
  	config:{
  		unit:{
  			toMetric:[
  				{
  					name:'pounds',
            alias:['lbs','lb','lbm','pound','pounds'],
  					convertsTo:'kg'
  				},
  				{
  					name:'miles',
            alias:['miles','mile','mi'],
  					convertsTo:'km',
  				}
  			],
  			toImperial:[
  				{
  					name:'Kilograms',
            alias:['kilogram','kilogramme','kg'],
  					convertsTo:'lbs',
  				},
  				{
            name:'Kilometer',
            alias:['kilometer','kilometers','km'],
            convertsTo:'miles',
  				}
  			]
  		}
  	},
  	user_options:{
      unit:null
    }
 }
  