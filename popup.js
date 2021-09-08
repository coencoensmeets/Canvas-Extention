let group_remove = document.getElementById("remove_group");
let activate_remove = document.getElementById("activate_remove")

activate_remove.addEventListener("click", async () => {
	let text = group_remove.value.replace(/\s+/g, '');
	if (text != ""){
	chrome.storage.sync.get(['list_groups'], function(result) {
  		var new_list = result.list_groups;
  		new_list.push(text);
  		console.log(new_list);
  		let list_groups = new_list
  		chrome.storage.sync.set({ list_groups });
		});
	group_remove.value = ""
	var element = document.getElementById("Removed_groups");
	p = document.createElement("button");
	p.setAttribute("class", "btn btn-info")
	p.setAttribute("id", text)
	p.addEventListener("click", function(){
		group = this.innerHTML
		if (list.indexOf(group) > -1) {
  			list_groups = list.filter(item => item !== group)
		}
		chrome.storage.sync.set({ list_groups });
		this.parentNode.removeChild(this)
	})
    p.innerHTML = text
    element.append(p)
    window.location.reload(false); 
}
});

chrome.storage.sync.get(['list_groups'], function(result) {
list = result.list_groups
var element = document.getElementById("Removed_groups")
for (let i = 0; i < list.length; i++){
	console.log(list[i])
	p = document.createElement("button");
	p.setAttribute("class", "btn btn-info")
	p.setAttribute("id", list[i])
	p.addEventListener("click", function(){
		group = this.innerHTML
		if (list.indexOf(group) > -1) {
  			list_groups = list.filter(item => item !== group)
		}
		chrome.storage.sync.set({ list_groups });
		this.parentNode.removeChild(this)
	})
    p.innerHTML = list[i]
    element.append(p)
}
})