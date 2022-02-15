async function getLocalStorageValue(key) {
	return new Promise((resolve, reject) => {
		try {
			chrome.storage.sync.get(key, function (value) {
				resolve(value);
			})
		}
		catch (ex) {
			reject(ex);
		}
	});
}


function nodeInsertedCallback(event) {
	if (String(window.location.hostname).includes("canvas")==true){
	var items = document.getElementsByClassName("fOyUs_bGBk fbyHH_bGBk fbyHH_bSMN")
	if (items.length != 0){
	Remove_groups(items)
}
	}};

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

async function Remove_groups(items){
  result = await getLocalStorageValue("list_groups_unhighlighted");
  list = result.list_groups_unhighlighted
	for (let i = 0; i < items.length; i++){
		item_url_split = items[i].href.split("/")
		item_url = item_url_split[item_url_split.length-1]
	  if (list.includes(item_url)==true){
		items[i].text = ""
	  }
	  }
}


async function add_unhighlighted(item){
	url_add = item.getElementsByTagName("a")[0].href.split("/")
	group = url_add[url_add.length-1]
	console.log(url_add)

	result = await getLocalStorageValue("list_groups_unhighlighted");
  	let list = result.list_groups_unhighlighted
	if (list.indexOf(group) == -1) {
  		list.push(group)
	}
	list_groups_unhighlighted = list
	console.log(list_groups_unhighlighted)
	await chrome.storage.sync.set({ list_groups_unhighlighted });

	result = await getLocalStorageValue("list_groups_highlighted");
  	let list_high = result.list_groups_highlighted
	if (list_high.indexOf(group) > -1) {
  			list_groups_highlighted = list_high.filter(item => item !== group)
		}
	else {
		list_groups_highlighted = list_high
	}
	chrome.storage.sync.set({ list_groups_highlighted });
	
	result = await getLocalStorageValue("list_groups_highlighted");
}

async function add_highlighted(item){
	url_add = item.getElementsByTagName("a")[0].href.split("/")
	group = url_add[url_add.length-1]
	result = await getLocalStorageValue("list_groups_highlighted");
  	let list = result.list_groups_highlighted
	if (list.indexOf(group) == -1) {
  		list.push(group)
	}
	list_groups_highlighted = list
	await chrome.storage.sync.set({ list_groups_highlighted });

	result = await getLocalStorageValue("list_groups_unhighlighted");
  	let list_un = result.list_groups_unhighlighted
	if (list_un.indexOf(group) > -1) {
  			list_groups_unhighlighted = list_un.filter(item => item !== group)
		}
	else {
		list_groups_unhighlighted = list_un
	}
	chrome.storage.sync.set({ list_groups_unhighlighted });
}

document.addEventListener('DOMNodeInserted', Group_site_detected, {once : true});

async function Group_site_detected(event){
	if (String(window.location.hostname).includes("canvas")==true){
		current_page = window.location.pathname;
		if (current_page ==="/groups"){
			add_stars()
	}
}
}

async function add_stars(){
	let head = document.head;
	if (head.getElementsByClassName("style_for_stars").length==0){
	head.insertAdjacentHTML('afterbegin', `
		<style class="style_for_stars">
		
			</style>
		`)
	}
	let table = document.getElementsByTagName("tr")[0]
	if (table.getElementsByClassName("course-list-star-column").length==0){
	await table.insertAdjacentHTML('afterbegin', `
		<th scope="col" class="course-list-star-column"><span class="screenreader-only">Favourites</span></th>	
		`)
	}

	result = await getLocalStorageValue("list_groups_unhighlighted");
	list_unhighlighted_groups = result.list_groups_unhighlighted;

	let all_groups = document.getElementById("current_groups_table")
	all_groups_items = all_groups.getElementsByTagName("tr")
	for (let i = 1; i < all_groups_items.length; i++){
		group_i = all_groups_items[i];
		if (group_i.getElementsByClassName("course-list-star-column").length==0){
		
		await group_i.insertAdjacentHTML('afterbegin', `
			<td class="course-list-star-column">
          <span class=" course-list-favorite-course  course-list-favoritable" role="button" tabindex="0" data-course-id="17700" data-favorite-url="https://canvas.tue.nl/api/v1/users/self/favorites/courses/17700" title="Click to add to the courses menu.">
            <i class="course-list-favorite-icon icon-star"></i>
            <span id="course_list_screenreader_message_17700" class="screenreader-only">
              Click to add to the courses menu.
            </span>
          </span>
      </td>
		`)
	result = await getLocalStorageValue("list_groups_unhighlighted");
	list_unhighlighted_groups = result.list_groups_unhighlighted;
	group_i = all_groups_items[i];
	let all_groups = document.getElementById("current_groups_table")
	all_groups_items = all_groups.getElementsByTagName("tr")
	url_add = group_i.getElementsByTagName("a")[0].href.split("/")
	url_group_i = url_add[url_add.length-1] 
	element = group_i.getElementsByClassName("course-list-favorite-icon icon-star")[0]

	if (list_unhighlighted_groups.indexOf(url_group_i) > -1){
		element.parentElement.className = "  course-list-favoritable";
		element.className="course-list-favorite-icon icon-star-light";
		element.addEventListener('click', empty_star_clicked, {once : true})
	}
	else{
		element.addEventListener('click', full_star_clicked, {once : true})
		
		await add_highlighted (group_i)
	}
	}
	// await change_stars(all_groups_items[all_groups_items.length-i])
	}
	result = await getLocalStorageValue("list_groups_unhighlighted");

	}


function full_star_clicked(event){
	event.target.parentElement.className = "  course-list-favoritable";
	event.target.className="course-list-favorite-icon icon-star-light";
	event.target.addEventListener('click', empty_star_clicked, {once : true})
	full_row = event.target.parentElement.parentElement.parentElement
	add_unhighlighted(full_row)
}	
function empty_star_clicked(event){
	event.target.parentElement.className = " course-list-favorite-course  course-list-favoritable";
	event.target.className="course-list-favorite-icon icon-star";
	event.target.addEventListener('click', full_star_clicked, {once : true})
	full_row = event.target.parentElement.parentElement.parentElement
	console.log(full_row)
	add_highlighted(full_row)
}