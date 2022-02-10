Dashboard_detector()

function Dashboard_detector(event){
	if (String(window.location.hostname).includes("canvas")==true){
		current_page = window.location.pathname;
		if (current_page === '/' || current_page === '') {
			let dashboardready = setInterval(function() {
        	if (document.querySelectorAll('.ic-DashboardCard__header')[0]) {
            	insert_menu_function()
	            clearInterval(dashboardready);
       	 }
    		}, 50);
			
		}
}
}
function insert_menu_function(){
	let bod = document.getElementById("DashboardCard_Container")
	 bod.insertAdjacentHTML('afterbegin', `
	 	<div class="shortcut_menu">
	 	<b style="padding-right: 10px;">Shortcuts: </b>
	 	<button class="button-1" style="background-color: #ED2626;" role="button" onclick=" window.open('https://tue.osiris-student.nl/','_blank')">Osiris</button>
	 	<button class="button-1" style="background-color: #7C9AF8;" role="button" onclick=" window.open('https://outlook.office.com/calendar/view/week')">Calendar</button>
	 	<button class="button-1" style="background-color: #1845D0;" role="button" onclick=" window.open('https://outlook.office.com/mail/')">Mail</button>
	 	<button class="button-1" style="background-color: #C624A5;" role="button" onclick=" window.open(https://mytue.tue.nl/dashboard/home')">MyTUe</button>
		<button class="button-1" style="background-color: #33C624;" role="button" onclick=" window.open('https://osirisplanapp.tue.nl/#/')">PlanApp</button>
		<button class="button-1" style="background-color: #F1AE32;" role="button" onclick=" window.open(https://tue.aattendance.nl/student/colloquia')">MyAttendance</button>
		</div>
		<style>
.button-1 {
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
  margin: 0px 15px 0px 0px;
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
  background-color: #ED2626;
  box-shadow: 0 4px 10px 0 rgba(0,0,0, 0.4);
  text-decoration: underline;

}

/* Add some padding inside the card container */
.shortcut_menu {
  padding: 10px 10px;
}
		</style>
	 	`);
}
