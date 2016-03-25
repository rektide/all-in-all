"use strict"

let
  allInAll= require(".."),
  tape= require( "blue-tape")

function defer(){
	var resolve,
	  promise= new Promise(function( r){ resolve= r })
	return { resolve, promise }
}

tape("normal all", function(t){
	t.plan(2)
	var
	  p1= defer(),
	  p2= defer()
	Promise.all([p1.promise]).then(t.ok)
	allInAll([p2.promise]).then(t.ok)
	p1.resolve()
	p2.resolve()
})

tape("add an element", function(t){
	var
	  p1= defer(),
	  p2= defer(),
	  arr= [p1.promise],
	  a= allInAll(arr).then(function(v){
		t.equal(v[0], 1)
		t.equal(v[1], 2)
	  })
	p1.resolve(1)
	p2.resolve(2)
	arr.push(p2.promise)
	return a
})

tape("add an element, resolve it latter", function(t){
	var
	  p1= defer(),
	  p2= defer(),
	  arr= [p1.promise],
	  a= allInAll(arr).then(function(v){
		t.equal(v[0], 3)
		t.equal(v[1], 4)
	  })
	p1.resolve(3)
	arr.push(p2.promise)
	setTimeout(function(){
		p2.resolve(4)
	}, 15)
	return a
})
