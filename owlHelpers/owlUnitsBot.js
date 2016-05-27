var bot = {};

/**
 * Get file data & units desired, do magic then .. profit??
 * @param  {[String]} data       -->     ebook text data 
 * @param  {[object]} user_units -->     user's desired units
 * @return {[String]}  data      -->     updated text data
 */
bot.converter = function(data,user_units) {
	//console.log(user_units);
	for(var unit in user_units){
		console.log('user unit: '+user_units[unit].alias);
		for(var item in user_units[unit].alias){
			var aliasX = user_units[unit].alias[item];
			var rgx = new RegExp('\\b'+aliasX+'\\b','gi');

			// if there's no sign of the aliasX in the data then continue
			if(data.match(rgx) === null) continue;
			
			// match number + unit + (previous conversion)
			var replace_rgx = new RegExp('(\\d+\\s*)('+aliasX+'\\b)(\\(.+\\))?','gi');

			data = data.replace(replace_rgx, function(match,p1,p2){
				console.log('match: '+match);
				var params = p1.trim()+" "+p2.trim();
				var query = params+" to "+user_units[unit].convertsTo;
				var q_result = convert(query);

				//debug info
				$owl.infos.debug.push(query+" : "+q_result);
				console.log('query: '+query);
				console.log('convert(query): '+convert(query));
				console.log('result: '+params+"("+convert(query)+")");
				
				
				return params+"("+q_result+")";
			});

		}
		
	}

	return data;
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