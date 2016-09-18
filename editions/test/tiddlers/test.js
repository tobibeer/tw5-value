/*\
title: test-tobibeer/value-filter.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the value filter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

describe("test value filter", function() {

	// Create a wiki
	var wiki = new $tw.Wiki({
		shadowTiddlers: {
			"$:/shadow": {
				tiddler: new $tw.Tiddler({title: "$:/shadow"}),
			}
		}
	});

	// Add a few  tiddlers
	wiki.addTiddler({
		title: "foo",
		modified:"20151218",
		text:"foo: bar\nfoo 1: baz"
	});
	wiki.addTiddler({title: "bar",key:"val"});
	wiki.addTiddler({title: "baz"});
	var fakeWidget = {getVariable: function() {return "foo";}};

	// Tests

	it("foo has value foo", function() {
		expect(wiki.filterTiddlers(
			"[[foo]value[foo]]"
		,fakeWidget).join(",")).toBe("foo");
	});

	it("foo does not have value foo", function() {
		expect(wiki.filterTiddlers(
			"[[foo]!value[foo]]"
		,fakeWidget).join(",")).toBe("");
	});

	it("bar does not have value foo", function() {
		expect(wiki.filterTiddlers(
			"[[bar]!value[foo]]"
		,fakeWidget).join(",")).toBe("bar");
	});

	it("foo AND bar do not have value foo", function() {
		expect(wiki.filterTiddlers(
			"foo bar +[value[foo]]"
		,fakeWidget).join(",")).toBe("foo");
	});

	it("foo AND bar do have value bar", function() {
		expect(wiki.filterTiddlers(
			"foo bar +[value[bar]]"
		,fakeWidget).join(",")).toBe("bar");
	});

	it("empty list doesn't exist", function() {
		expect(wiki.filterTiddlers(
			"[has[doesntexist]value[]]"
		,fakeWidget).join(",")).toBe("yes");
	});

	it("foo if it does not have an empty value", function() {
		expect(wiki.filterTiddlers(
			"[[foo]!value[]]"
		,fakeWidget).join(",")).toBe("foo");
	});

	it("foo AND bar if they do not have an empty value", function() {
		expect(wiki.filterTiddlers(
			"foo bar +[!value[]]"
		,fakeWidget).join(",")).toBe("foo,bar");
	});

	it("foo is value foo", function() {
		expect(wiki.filterTiddlers(
			"[[foo]value:is[foo]]"
		,fakeWidget).join(",")).toBe("yes");
	});

	it("foo is not value foo", function() {
		expect(wiki.filterTiddlers(
			"[[foo]!value:is[foo]]"
		,fakeWidget).join(",")).toBe("no");
	});

	it("bar is not value foo", function() {
		expect(wiki.filterTiddlers(
			"[[bar]!value:is[foo]]"
		,fakeWidget).join(",")).toBe("yes");
	});

	it("foo AND bar are not value foo", function() {
		expect(wiki.filterTiddlers(
			"foo bar +[value:is[foo]]"
		,fakeWidget).join(",")).toBe("yes");
	});

	it("foo AND bar do have value bar", function() {
		expect(wiki.filterTiddlers(
			"foo bar +[value:is[bar]]"
		,fakeWidget).join(",")).toBe("yes");
	});

	it("empty list doesn't exist", function() {
		expect(wiki.filterTiddlers(
			"[has[doesntexist]value:is[]]"
		,fakeWidget).join(",")).toBe("yes");
	});

	it("foo if it does not have an empty value", function() {
		expect(wiki.filterTiddlers(
			"[[foo]!value:is[]]"
		,fakeWidget).join(",")).toBe("yes");
	});

	it("foo AND bar if they do not have an empty value", function() {
		expect(wiki.filterTiddlers(
			"foo bar +[!value:is[]]"
		,fakeWidget).join(",")).toBe("yes");
	});
});

})();
