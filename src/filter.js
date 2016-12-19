/*\
title: $:/plugins/tobibeer/value/filter.js
type: application/javascript
module-type: filteroperator

Filter operator for testing input titles for a given value

@preserve
\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
The value filter function...
*/
exports.value = function(source,operator,options) {
	var results = [],
		value = operator.operand;
	if(operator.prefix === "!") {
		source(function(tiddler,title) {
			if(title !== value) {
				results.push(title);
			}
		});
	} else {
		source(function(tiddler,title) {
			if(title === value) {
				results.push(title);
			}
		});
	}
	if(results.length){
		if (operator.suffix === "is") {
			results = results.length ? ["yes"] : ["no"];
		}
	} else {
		if(operator.operand === "") {
			results = operator.prefix === "!" ? ["no"] : ["yes"];
		} else if (operator.suffix === "is") {
			results = operator.prefix === "!" ? ["yes"] : ["no"];
		}
	}
	return results;
};

})();