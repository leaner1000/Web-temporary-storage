


'use strict';
let dic={}
let store = document.getElementById('store');

window.onload = function(){
	chrome.storage.sync.get("dic",function(items){
		if(items["dic"]==undefined){return;}
		var tmp=0;
		for(var i in items["dic"]){
			dic=items["dic"]
			var button = document.getElementById(tmp+"");
			button.innerHTML=i;
			tmp=tmp+1;
			console.log(dic);
			console.log(restore(i));
			console.log(button);
			console.log(i);
			button.onclick = restore(i);
		}
	})
}


store.onclick = function(element) {
	var all_tabs=chrome.tabs.query({},function(tabs){
		var arr = [];
		for(var i in tabs){
			arr.push(tabs[i].url);
			console.log(tabs[i]);
			chrome.tabs.remove(tabs[i].id);
		}
		chrome.tabs.create({});
		var label=document.getElementById('label').value;
		console.log(label);
		dic[label]=arr;
		console.log(dic);
		chrome.storage.sync.set({"dic": dic}, function() {});
	});
};

function restore(key) {
	return function(){
		console.log(2345)
		chrome.storage.sync.get("dic",function(items){
		for(var i in items["dic"][key]){
			chrome.tabs.create({url:items["dic"][key][i]});
		}
		delete dic[key];
		chrome.storage.sync.set({"dic": dic}, function() {});
	});
	}
};