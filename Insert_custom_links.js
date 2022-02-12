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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Course_detector();

async function Course_detector(event){
	if (String(window.location.hostname).includes("canvas")==true){
		current_page = window.location.pathname;
		if (current_page.includes("courses")||current_page.includes("groups")) {
			let siteready = setInterval(async function() {
        		result = await getLocalStorageValue("list_links_course");
        		List_link_add = result.list_links_course
        		for (let i = 0; i < List_link_add.length; i++){
        			insert_link_html(List_link_add[i])
        		}
        		insert_link_menu()
	            clearInterval(siteready);
    		}, 500);
			
		}
}
}

async function add_link(){
	title_add = document.getElementById('add_title').value
	link_add = document.getElementById('add_link').value
	course_number = window.location.pathname.split('/')[2];

	Add_this_chrome = [course_number, title_add, link_add]

	result = await getLocalStorageValue("list_links_course");
    List_link_add = result.list_links_course
    List_link_add_json = JSON.stringify(List_link_add)
    Add_this_chrome_json = JSON.stringify(Add_this_chrome)
	if (List_link_add_json.includes(Add_this_chrome_json)==false){
    	List_link_add.push(Add_this_chrome)
    }
    list_links_course = List_link_add
    await chrome.storage.sync.set({ list_links_course });

    insert_link_html(Add_this_chrome)
    var crosses = document.getElementsByClassName("menu_hidden")
    for (let i = 0; i < crosses.length; i++){
        	crosses[i].style.visibility = "visible"
        }

    document.getElementById('add_title').value =""
	document.getElementById('add_link').value =""

}

async function remove_link(event){
	id_of_element = event.target.id
	Title_remove = id_of_element.split("!__!")[0]
	Link_remove = id_of_element.split("!__!")[1]
	course_number = window.location.pathname.split('/')[2];
	Remove_list = [course_number, Title_remove, Link_remove]

	result = await getLocalStorageValue("list_links_course");
    List_extra_links = result.list_links_course
    list_links_course = List_extra_links.filter(item => JSON.stringify(item) !== JSON.stringify(Remove_list))
    await chrome.storage.sync.set({ list_links_course })

    event_parent = event.target.parentElement
    event_parent.parentElement.removeChild(event_parent)
}

function show_menu_link() {
	var dropdown = document.getElementById("myDropdown");
	var crosses = document.getElementsByClassName("menu_hidden")
  	if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        for (let i = 0; i < crosses.length; i++){
        	crosses[i].style.visibility = "hidden"
        }
      }
    else{
    	document.getElementById("myDropdown").classList.toggle("show");
    	for (let i = 0; i < crosses.length; i++){
        	crosses[i].style.visibility = "visible"
        }
    }
}

async function insert_link_menu(){
	current_page = window.location.pathname;
		navigation =  document.getElementById('section-tabs');
		if (navigation.getElementsByClassName("Link_menu").length==0){
		await navigation.parentElement.insertAdjacentHTML('afterend', `
			<style>
				.ic-sticky-frame{
					padding-bottom: 500px;
				}

				.dropdown {
				  position: relative;
				  display: inline-block;
				}

				/* Dropdown Content (Hidden by Default) */
				.dropdown-content {
					 cursor: pointer;
					display: none;
					min-width: 50px;
				  position: absolute;
				  background-color: #f1f1f1;
				  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
				  z-index: 1;
				  max-width: 100px;
				}

				/* Links inside the dropdown */
				.dropdown-content li {
				  color: black;
				  padding: 12px 16px;
				  text-decoration: none;
				  display: block;
				}

				/* Change color of dropdown links on hover */
				.dropdown-content a:hover {background-color: #ddd}

				/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
				.show {display:block;}

				.menu_input {
				  font-family: inherit;
				  width: 100%;
				  border: 0;
				  border-bottom: 2px solid $gray;
				  outline: 0;
				  font-size: 16;
				  color: black;
				  padding: 7px 0;
				  background: transparent;
				  transition: border-color 0.2s;
				   margin: 0px 3px 0px 3px;

				  &::placeholder {
				    color: transparent;
				  }

				  &:placeholder-shown ~ .form__label {
				    font-size: 1.3rem;
				    cursor: text;
				    top: 20px;
				  }
				}

			.button-1 {
				color:green
			  border-radius: 10px;
			  border-style: none;
			  box-sizing: border-box;
			  color: #FFFFFF;
			  cursor: pointer;
			  display: inline-block;
			  font-size: 16px;
			  font-weight: 500;
			  height: 40px;
			  line-height: 20px;
			  list-style: none;
			  margin: 0px 15px 5px 15px;
			  outline: none;

			  padding: 10px 16px;
			  position: relative;
			  text-align: center;
			  text-decoration: none;
			  transition: color 100ms;
			  vertical-align: baseline;
			  user-select: none;
			  -webkit-user-select: none;
			  touch-action: manipulation;
			  box-sizing: border-box;
			  box-shadow: 0 2px 5px rgb(0 0 0 / 30%);
			  border-radius: 4px;
			  text-decoration: none;
			}

			.button-1:hover,
			.button-1:focus {
			  background-color:#30EB43
			  box-shadow: 0 4px 10px 0 rgba(0,0,0, 0.4);
			  text-decoration: underline;

			}
			.center {
			  margin: 0;
			  position: absolute;
			  left: 50%;
			  -ms-transform: translate(-50%, -50%);
			  transform: translate(-50%, -50%);
			}

			</style>
			<div class="link_menu">
			<li class="section" style="cursor: pointer;margin-top:8px;list-style-type: none;"><a id="open_menu" class="settings" tabindex="0" style="cursor: pointer; display:inline-block; padding:8px 0 8px 6px; color:green">Add link</a></li>
			</div>
			<div id="myDropdown" class="dropdown-content">
			    <input class="menu_input" id="add_title" placeholder="Title"/>
			    <input class="menu_input" id="add_link" placeholder="Link"/>
			    <button class="button-1" id="add_link_button" style="background-color: green;"  role="button">Add</button>
			  </div>
			`)

		element = document.getElementById("open_menu");
		element.addEventListener('click', show_menu_link)
		element = document.getElementById("add_link_button");
		element.addEventListener('click', add_link)

	}
}


async function insert_link_html(data){
	current_page = window.location.pathname;
	if (current_page.includes(data[0])){
		navigation =  document.getElementById('section-tabs');
		if (navigation.getElementsByClassName("style_for_cross").length==0){
		await navigation.insertAdjacentHTML('beforeend', `
			<style class="style_for_cross">
				.menu_hidden{
					visibility:hidden;
				}
			</style>
			`)
	}
		if (data[2].includes("https://") == false && data[2].includes("http://")==false){
			data[2] = "https://"+data[2]
		}
		await navigation.insertAdjacentHTML('beforeend', `
			<li class="section"><a href="${data[2]}" class="settings" tabindex="0" style="display:inline-block">${data[1]}</a><a id="${data[1]}!__!${data[2]}!__!Remove" tabindex="0" class="menu_hidden" style="display:inline-block; color:red;">  X</a></li>
		`)
		elementX = document.getElementById(data[1]+"!__!"+data[2]+"!__!Remove")
		elementX.addEventListener('click', remove_link, {once : true})
	
	}
}