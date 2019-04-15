


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
	chrome.windows.getCurrent({"populate":true},function(windows){
		var arr=[];
		for (var i in windows.tabs){
			arr.push(windows.tabs[i].url);
			console.log(windows.tabs[i]);
			chrome.tabs.remove(windows.tabs[i].id);
		}
		chrome.tabs.create({});
		var label=document.getElementById('label').value;
		console.log(label);
		dic[label]=arr;
		console.log(dic);
		chrome.storage.sync.set({"dic": dic}, function() {});
	})
};

function restore(key) {
	return function(){
		chrome.storage.sync.get("dic",function(items){
			chrome.windows.create({"url":items["dic"][key]});
			delete dic[key];
			chrome.storage.sync.set({"dic": dic}, function() {});
	});
	}
};