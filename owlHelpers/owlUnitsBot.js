var bot = {};

/**
 * Get file data & units desired, do magic then .. profit??
 * @param  {[String]} data       -->     ebook text data 
 * @param  {[object]} user_units -->     user's desired units
 * @param  {[object]} epubFile -->     	 current epub file
 * @return {[String]}  data      -->     updated text data
 */
bot.converter = function(data,user_units,epubFile) {
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

			// match number(p1) + unit(p2) + (previous conversion)
			// TODO: p1 won't recognize 2,000
			var replace_rgx = new RegExp('(\\d+\\s*)('+aliasX+'\\b)(\\(.+\\))?','gi');

			data = data.replace(replace_rgx, function(match,p1,p2){
				console.log('Alias matched: '+p2);
				console.log('match: '+match);
				// Remove space from params | and get the first alias from the list(Default)
				var params = p1.trim()+" "+user_units[unit].alias[0];
				var query = params+" to "+user_units[unit].convertsTo;
				var q_result = convert(query);

				//debug info
				$owl.infos.debug.push('File: '+epubFile+' | '+query+" : "+q_result);
				console.log('query: '+query);
				console.log('convert(query): '+convert(query));
				console.log('result: '+params+"("+convert(query)+")");
				
				// data.replace will replace the data with params+"("+q_result+")"
				return params+"("+q_result+")";
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
		alert(e);
		exit();
	}
}

module.exports = bot;