"use strict"

var slice= Array.prototype.slice

function allInAll(arr){
	var was= slice.call(arr, 0)
	function changed(){
		if(was.length !== arr.length){
			return true
		}else{
			for(var i in arr){
				if(arr[i] !== was[i]){
					return true
				}
			}
		}
		return false
	}

	function loop(val){
		if(changed()){
			was= slice.call(arr, 0)
			return dispatch()
		}
		return val
	}

	function dispatch(){
		return Promise.all(arr).then(loop)
	}
	return dispatch()
}

module.exports= allInAll
