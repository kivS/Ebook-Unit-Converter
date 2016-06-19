module.exports = {

  	infos:{
  		error: new Array(),
  	  debug: new Array()
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
            alias:['kg','kilogram','kilogramme'],
  					convertsTo:'lbs',
  				},
  				{
            name:'Kilometer',
            alias:['km','kilometer','kilometers'],
            convertsTo:'miles',
  				}
  			]
  		}
  	},
  	user_options:{
      unit:null
    }
 }
  