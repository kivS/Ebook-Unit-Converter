var bot = {};

/**
 * Get file data & units desired, do magic then .. profit??
 * @param  {[String]} data       -->     ebook text data 
 * @param  {[object]} user_units -->     user's desired units
 * @return {[String]}  data      -->     updated text data
 */
bot.converter = function(data,user_units) {
	var data_length = data.length;
	//Go over each unit
	for(var unit in user_units){
		console.log('user unit: '+user_units[unit].alias);
		//Go over each unit's alias which is an array of aliases
		for(var item in user_units[unit].alias){
			//Get single alias
			var aliasX = user_units[unit].alias[item];
			var rgx = new RegExp('\\b'+aliasX+'\\b','gi');

			// if there's no sign of the aliasX in the data then continue
			if(data.match(rgx) === null) continue;		

			// match number(p1) + unit(p2) + (previous conversion)
			// TODO: p1 won't recognize 2,000
			var replace_rgx = new RegExp('(\\d+\\s*)('+aliasX+'\\b)(\\(.+\\))?','gi');

			data = data.replace(replace_rgx, function(match,p1,p2){
				console.log('Alias matched: '+p2);
				console.log('match: '+match);
				// Remove space from params: 
				var params = p1.trim()+" "+p2.trim();
				var query = params+" to "+user_units[unit].convertsTo;
				var q_result = convert(query);

				//debug info
				$owl.infos.debug.push(query+" : "+q_result);
				console.log('query: '+query);
				console.log('convert(query): '+convert(query));
				console.log('result: '+params+"("+convert(query)+")");
				
				// data.replace will replace the data with params+"("+q_result+")"
				return params+"("+q_result+")";
			});

		}
		
	}
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
	return math.format(math.eval(q),p);
}

module.exports = bot;