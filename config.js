var bot = {};

var initialConfig = {

  	infos:new Array(),
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
				},
        {
          name:'inches',
          alias:['inch','inches'],
          convertsTo:'cm',
        },
        {
          name:'foot',
          alias:['foot','feet','ft'],
          convertsTo:'m',
        },
        {
          name:'yard',
          alias:['yard','yards','yd'],
          convertsTo:'m',
        },
        {
          name:'gallon',
          alias:['gal','gallon','gallons'],
          convertsTo:'liters',
        },
        {
          name:'ounce',
          alias:['oz','ounce','ounces'],
          convertsTo:'g',
        },
        {
          name:'kelvin',
          alias:['K','kelvin','kelvins'],
          convertsTo:'celsius',
        },
        {
          name:'fahrenheit',
          alias:['fahrenheit','f'],
          convertsTo:'celsius',
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
				},
        {
          name:'Centimeter',
          alias:['cm','centimeters','centimeter'],
          convertsTo:'inch',
        },
        {
          name:'Meter',
          alias:['m','meters','meter'],
          convertsTo:'feet',
        },
        {
          name:'Liters',
          alias:['liters','l','liter'],
          convertsTo:'gal',
        },
        {
          name:'Gram',
          alias:['g','gram','grams'],
          convertsTo:'oz',
        },
        {
          name:'Kelvin',
          alias:['K','kelvin','kelvins'],
          convertsTo:'fahrenheit',
        },
        {
          name:'Celsius',
          alias:['celsius','C'],
          convertsTo:'fahrenheit',
        }

			]
		},
    user_options:{
      unit:null
    },
    converted_ebooks: new Array()
 }

bot.save = function(config_data){
    sessionStorage.setItem('config', JSON.stringify(config_data));
 }

bot.open = function(){
  if(sessionStorage.getItem('config') == null){
     sessionStorage.setItem('config', JSON.stringify(initialConfig));
  }
  return JSON.parse(sessionStorage.getItem('config'));
}

module.exports = bot;