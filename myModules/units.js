var $config = require('../config.js');

var bot = {};
//var nlp = window.nlp_compromise;


/**
 * Get file data & units desired, do magic then .. profit??
 * @param  {[String]} data       -->     ebook text data 
 * @param  {[object]} user_units -->     user's desired units
 * @param  {[String]} epubFile -->     	 current epub file
 * @return {[String]}  data      -->     updated text data
 */
bot.converter = function(data,user_units,epubFile) {
	// Local $config
	var config = $config.open();

	var data_length = data.length;
	//Go over each unit
	Object.keys(user_units).forEach(unit=>{
		console.log('user unit: '+user_units[unit].alias);
		//Go over each unit's alias which is an array of aliases
		Object.keys(user_units[unit].alias).forEach(item=>{
			//Get single alias
			var aliasX = user_units[unit].alias[item];
			var rgx = new RegExp('\\b'+aliasX+'\\b','gi');

			// if there's no sign of the aliasX in the data then continue
			if(data.match(rgx) === null) return;		

			// match number (written or integer)
			// TODO: add written numbers eg: |(?:\\b\\w+\\s\\b){1,3}
			var reg1 = '(\\d+\,?\\d+\\s*)';

			// unit
			var reg2 = '(\\b'+aliasX+'\\b)';

			//  previous conversion
			var reg3 = '(\\(.+\\))?';

			var replace_rgx = new RegExp(reg1+reg2+reg3,'gi');
			//console.log('Converter replacer regExp: '+replace_rgx);
			//console.log(data.match(replace_rgx));

			data = data.replace(replace_rgx, function(match,p1,p2){
				console.log('Alias matched: '+p2);
				console.log('match: '+match);
					
				// Remove ',' from number, ex: 2,000 => 2000
				var matched_number = p1.replace(',',"");
				// Remove space from params | and get the first alias from the list(Default)
				var params = matched_number.trim()+" "+user_units[unit].alias[0];
				var query = params+" to "+user_units[unit].convertsTo;
				var q_result = convert(query);

				//debug info
				config.infos.push({
					id: Date.now()+Math.random(),
					type: 'debug',
					msg: 'File: '+epubFile+' | '+query+" : "+q_result
				});
				$config.save(config);
				
				console.log('query: '+query);
				console.log('convert(query): '+convert(query));
				console.log('result: '+params+"("+convert(query)+")");
				
				// data.replace will replace the data with params+"("+q_result+")"
				return p1+p2+"("+q_result+")";
			});
			
		});
	});

	//Return data only if it's been modified
	return (data_length == data.length)? null:data;

}




/**
 * Get query, do the unit conversion & return the result with precision p 
 * @param  {[String]} q --> query
 * @param  {Number}   p --> precision(default is 3)
 * @return {[String]}  
 */
function convert(q,p=3){
	try{
		return math.format(math.eval(q),p);
	}catch(e){
		console.error(e.stack);
	}
}

/**
 * Get text & return number equivalent
 * @param  {String} txt       -> query
 * @return {Number OR Null}   -> converted data
 */
/*function getNumberFromText(txt){

	// remove unwanted characters from txt[, .]
	text = txt.replace(',.','');

	return nlp.value(text).number
}*/


module.exports = bot;