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

Dashboard_detector()

function Dashboard_detector(event){
	if (String(window.location.hostname).includes("canvas")==true){
		current_page = window.location.pathname;
		if (current_page === '/' || current_page === '') {
			let dashboardready = setInterval(function() {
        	if (document.querySelectorAll('.ic-DashboardCard__header')[0]) {
            	insert_cards_groups()
	            clearInterval(dashboardready);
       	 }
    		}, 50);
			
		}
}
}

async function insert_cards_groups(){
	container = document.getElementById("DashboardCard_Container")

	domain = window.location.origin
	Data = await getData(domain + '/api/v1/users/self/groups?per_page=50')
	list = await getLocalStorageValue("list_groups_highlighted");
	list_groups_highlighted = list.list_groups_highlighted

	if(list_groups_highlighted.length>0){
		await container.insertAdjacentHTML('afterEnd', `
		<style>
		.Container_groups{
			margin-top: 36px;
			padding-left:2px;
		}
		</style>
		<div style="border-top: 1px solid #c7cdd1; margin-top: 30px;"/>
		<div class="Container_groups" style="margin-top: 30px">
		<div class="ic-DashboardCard__box__container" id="container_groups">
			</div>
			</div>
			`)
	}

	for (var i = 0; i < Data.length; i++) {
		if(list_groups_highlighted.includes(String(Data[i].id))==true){
			Insert_card(Data[i])
		}
	}
}

async function Insert_card(Data){
	course = await getData(domain + "/api/v1/courses/"+Data.course_id)
	container = document.getElementById("container_groups")
	if (course.hasOwnProperty("original_name")==true){
		course_name = course.original_name
	}
	else{
		course_name = course.name
	}
	course_info = course_name.split(')')[0]+")"

	await container.insertAdjacentHTML('beforeEnd', `
			<div class="ic-DashboardCard" draggable="true" style="opacity: 1;">
			<div class="ic-DashboardCard__header">
			<div class="ic-DashboardCard__header_hero" aria-hidden="true" style="background-color: rgb(11, 155, 227);"></div>
			<div><div class="ic-DashboardCard__header-button-bg" style="background-color: rgb(131, 102, 180); opacity: 0;"></div><span data-position="upkPH7CKku3j"><button type="button" class="Button Button--icon-action-rev ic-DashboardCard__header-button" aria-expanded="false" data-popover-trigger="true" data-position-target="upkPH7CKku3j"><i class="icon-more" aria-hidden="true"></i><span class="screenreader-only">Choose a colour or course nickname or move course card for Info 2021-2022</span></button></span></div>
			<a href="/groups/${Data.id}" class="ic-DashboardCard__link">
			<div class="ic-DashboardCard__header_content">
			<h3 class="ic-DashboardCard__header-title ellipsis" title="${Data.name}">
			<span style="color: rgb(11, 155, 227);">${Data.name}</span>
			</h3>
			<div class="ic-DashboardCard__header-subtitle ellipsis" title="${course_info}${Data.name}">${course_info} ${Data.name}</div>
			<div class="ic-DashboardCard__header-term ellipsis" title="${course.name}">Course: ${course.name}</div>
			</div></a>
			</div>

			<nav class="ic-DashboardCard__action-container" id="${Data.id}${Data.name}" aria-label="Actions for ${Data.name}">
			
			<a href="/groups/${Data.id}/announcements" class="ic-DashboardCard__action announcements" title="Announcements - ${Data.name}">
			<span class="screenreader-only">Announcements - ${Data.name}</span>
			<div class="ic-DashboardCard__action-layout" id="${Data.id}${Data.name}Announcements">
			<svg name="IconAnnouncement" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="dUOHu_bGBk dUOHu_drOs dUOHu_eXrk cGqzL_bGBk cGqzL_dIzR cGqzL_owrh" style="width: 1em; height: 1em;"><g role="presentation"><path d="M1587.16235,31.2784941 C1598.68235,7.78672942 1624.43294,-4.41091764 1650.63529,1.46202354 C1676.16,7.56084707 1694.11765,30.2620235 1694.11765,56.4643765 L1694.11765,56.4643765 L1694.11765,570.459671 C1822.87059,596.662024 1920,710.732612 1920,847.052612 C1920,983.372612 1822.87059,1097.55614 1694.11765,1123.75849 L1694.11765,1123.75849 L1694.11765,1637.64085 C1694.11765,1663.8432 1676.16,1686.65732 1650.63529,1692.6432 C1646.23059,1693.65967 1641.93882,1694.11144 1637.64706,1694.11144 C1616.52706,1694.11144 1596.87529,1682.36555 1587.16235,1662.93967 C1379.23765,1247.2032 964.178824,1242.34673 960,1242.34673 L960,1242.34673 L564.705882,1242.34673 L564.705882,1807.05261 L652.461176,1807.05261 C640.602353,1716.92555 634.955294,1560.05026 715.934118,1456.37026 C768.338824,1389.2832 845.590588,1355.28791 945.882353,1355.28791 L945.882353,1355.28791 L945.882353,1468.22908 C881.392941,1468.22908 835.312941,1487.09026 805.044706,1525.71614 C736.263529,1613.58438 759.981176,1789.54673 774.776471,1849.97026 C778.955294,1866.79849 775.115294,1884.6432 764.498824,1898.30908 C753.769412,1911.97496 737.28,1919.99379 720,1919.99379 L720,1919.99379 L508.235294,1919.99379 C477.063529,1919.99379 451.764706,1894.80791 451.764706,1863.5232 L451.764706,1863.5232 L451.764706,1242.34673 L395.294118,1242.34673 C239.548235,1242.34673 112.941176,1115.73967 112.941176,959.993788 L112.941176,959.993788 L112.941176,903.5232 L56.4705882,903.5232 C25.2988235,903.5232 0,878.337318 0,847.052612 C0,815.880847 25.2988235,790.582024 56.4705882,790.582024 L56.4705882,790.582024 L112.941176,790.582024 L112.941176,734.111435 C112.941176,578.478494 239.548235,451.758494 395.294118,451.758494 L395.294118,451.758494 L959.887059,451.758494 C976.828235,451.645553 1380.36706,444.756141 1587.16235,31.2784941 Z M1581.17647,249.706729 C1386.46588,492.078494 1128.96,547.871435 1016.47059,560.746729 L1016.47059,560.746729 L1016.47059,1133.47144 C1128.96,1146.34673 1386.46588,1202.02673 1581.17647,1444.51144 L1581.17647,1444.51144 Z M903.529412,564.699671 L395.294118,564.699671 C301.891765,564.699671 225.882353,640.709082 225.882353,734.111435 L225.882353,734.111435 L225.882353,959.993788 C225.882353,1053.39614 301.891765,1129.40555 395.294118,1129.40555 L395.294118,1129.40555 L903.529412,1129.40555 L903.529412,564.699671 Z M1694.11765,688.144376 L1694.11765,1006.07379 C1759.73647,982.694965 1807.05882,920.577318 1807.05882,847.052612 C1807.05882,773.527906 1759.73647,711.5232 1694.11765,688.144376 L1694.11765,688.144376 Z" fill-rule="evenodd" stroke="none" stroke-width="1"></path></g></svg>
			</div>
			</a>

			<a href="/groups/${Data.id}/files" class="ic-DashboardCard__action announcements" title="Announcements - ${Data.name}">
			<span class="screenreader-only">Folder - ${Data.name}</span>
			<div class="ic-DashboardCard__action-layout" id="${Data.id}${Data.name}Folder">
			<svg name="IconFolder" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="dUOHu_bGBk dUOHu_drOs dUOHu_eXrk cGqzL_bGBk cGqzL_dIzR cGqzL_owrh" style="width: 1em; height: 1em;"><g role="presentation"><path d="M1807.05882,1637.70588 C1807.05882,1668.87765 1781.64706,1694.17647 1750.58824,1694.17647 L169.411765,1694.17647 C138.352941,1694.17647 112.941176,1668.87765 112.941176,1637.70588 L112.941176,225.941176 L703.849412,225.941176 L854.4,451.823529 L225.882353,451.823529 L225.882353,564.764706 L1807.05882,564.764706 L1807.05882,1637.70588 Z M990.268235,451.823529 L764.385882,113 L-5.68434189e-14,113 L-5.68434189e-14,1637.70588 C-5.68434189e-14,1731.10824 76.0094118,1807.11765 169.411765,1807.11765 L1750.58824,1807.11765 C1843.99059,1807.11765 1920,1731.10824 1920,1637.70588 L1920,451.823529 L990.268235,451.823529 Z" fill-rule="evenodd" stroke="none" stroke-width="1"></path></g></svg>
			</div>
			</a>

			</nav>
			</div>`)
	Info = await getData(domain + `/api/v1/groups/${Data.id}/activity_stream/summary`)

	if (Info.length >0){
		unread_annouchements = Info[0].unread_count
		if(unread_annouchements >0){
		div_element = document.getElementById(`${Data.id}${Data.name}Announcements`)
		await div_element.insertAdjacentHTML('beforeEnd', `
			<span class="ic-DashboardCard__action-badge"><span class="unread_count">${unread_annouchements}</span><span class="screenreader-only">Unread</span></span>
			`)
		nav_element = document.getElementById(`${Data.id}${Data.name}`)
		nav_element.style.marginTop = "17px"
	}
	}
}

async function getData(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    let data = await response.json();
    return data
}