/*\
title: $:/plugins/tobibeer/value/filter.js
type: application/javascript
module-type: filteroperator

Filter operator for testing input titles for a fiven value

@preserve
\*/
(function(){"use strict";exports.value=function(e,i,f){var n=[],s=i.operand;if(i.prefix==="!"){e(function(e,i){if(i!==s){n.push(i)}})}else{e(function(e,i){if(i===s){n.push(i)}})}console.log("RESULTS: "+n);if(n.length){if(i.suffix==="is"){n=n.length?["yes"]:["no"]}}else{if(i.operand===""){n=i.prefix==="!"?["no"]:["yes"]}else if(i.suffix==="is"){n=i.prefix==="!"?["yes"]:["no"]}}return n}})();