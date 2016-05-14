var bot = {};

/**
 * Get file data & units desired, do magic then .. profit??
 * @param  {[String]} data       -->     ebook text data 
 * @param  {[object]} user_units -->     user's desired units
 * @return {[String]}            -->     updated text data
 */
bot.converter = function(data,user_units) {
	return user_units;
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