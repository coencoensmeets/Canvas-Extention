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

Dashboard_detector()


async function Dashboard_detector(event){
	if (String(window.location.hostname).includes("canvas")==true){
		current_page = window.location.pathname;
		if (current_page === '/' || current_page === '') {
			let dashboardready = setInterval(function() {
        Footer = document.getElementById("footer-links")
        Footer.insertAdjacentHTML('afterbegin', `
          <a  class="terms_link" href="https://github.com/coencoensmeets/Canvas-Extention">Canvas Extension by Coen Smeets</a>
          `);
        	if (document.querySelectorAll('.ic-DashboardCard__header')[0]) {
            	insert_menu_function()
	            clearInterval(dashboardready);

       	 }
         else{

          insert_card_reminder()
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
	 	<button class="button-1" role="button" onclick=" window.open('https://tue.osiris-student.nl/','_blank')">Osiris</button>
	 	<button class="button-1" role="button" onclick=" window.open('https://outlook.office.com/calendar/view/week')">Calendar</button>
	 	<button class="button-1" role="button" onclick=" window.open('https://outlook.office.com/mail/')">Mail</button>
	 	<button class="button-1" role="button" onclick=" window.open('https://mytue.tue.nl/dashboard/home')">MyTUe</button>
		<button class="button-1" role="button" onclick=" window.open('https://osirisplanapp.tue.nl/#/')">PlanApp</button>
		<button class="button-1" role="button" onclick=" window.open('https://ans.app/')">Ans Delft</button>
    <button class="button-1" role="button" onclick=" window.open('https://tueindhoven.cirrusplatform.com/#saml')">Cirrus</button>
    </div>
		<style>
.button-1 {
  background-color: transparent;
    background-repeat: no-repeat;
    border: 2px solid #c81919;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  line-height: 0px;
  list-style: none;
  margin: 0px 10px 10px 0px;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  color: #c81919;
  transition: color 100ms;
}

.button-1:hover,
.button-1:focus {
  background-color: rgba(255,0,0, 0.1);
  box-shadow: 0 2px 7px 0 rgba(0,0,0, 0.4);
  text-decoration: underline;
  padding-bottom: 6px;

}

/* Add some padding inside the card container */
.shortcut_menu {
  padding: 12px 0px;
}
		</style>
	 	`);
}


async function insert_card_reminder(){
  let bod = document.getElementById("DashboardOptionsMenu_Container")
  bod.childNodes[0].insertAdjacentHTML('afterend', `
    <span class="ic-DashboardCard__action-badge" style="position: relative; top: -17px; left: -20px;">
    <span class="unread_count">!</span>
    <span class="screenreader-only">Unread</span>
    </span>
    `);
  console.log(bod)

  // bod.insertAdjacentHTML('afterend', `
  // <div class="fOyUs_bGBk eMdva_bgqc eMdva_pypk eMdva_MrVJ eJkkQ_bEpV" style="margin: 0.5rem 0px;">
  // <div class="eMdva_dnnz">
  // <svg name="IconInfoBorderless" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="dUOHu_bGBk dUOHu_drOs dUOHu_eXrk cGqzL_bGBk" style="width: 1em; height: 1em;">
  // <g role="presentation"><path d="M1229.92952,594.767261 C1266.57399,632.742052 1279.94501,686.094808 1273.65049,737.675873 C1264.52227,812.553116 1242.91341,882.659228 1217.55726,953.332591 C1190.42812,1028.95581 1162.89637,1104.42362 1135.22526,1179.8448 C1090.96233,1300.52957 1046.35099,1421.08225 1002.57582,1541.94574 C991.697835,1571.96347 983.940014,1604.01708 980.84308,1635.72879 C977.467421,1670.26122 1002.30484,1687.25546 1033.49097,1671.93189 C1058.46774,1659.65439 1082.77868,1642.93988 1102.33582,1623.16377 C1134.28844,1590.85373 1166.1017,1558.38828 1197.14072,1525.18462 C1212.65637,1508.5789 1228.00168,1491.78669 1243.05278,1474.74583 C1255.04566,1461.16286 1267.37145,1440.72626 1283.83166,1432.46614 C1315.00231,1416.82397 1339.05774,1455.31162 1333.41358,1482.25997 C1328.02492,1508.03312 1310.27937,1530.64327 1293.95246,1551.21735 L1292.82888,1552.63303 C1291.33423,1554.51635 1289.85424,1556.38267 1288.39964,1558.23286 C1233.5297,1628.02815 1173.35627,1695.32132 1105.09209,1752.20968 C1037.98926,1807.97909 963.484762,1855.42621 881.663754,1886.18991 C855.014634,1896.20618 827.707414,1904.44298 799.951139,1910.75269 C746.366431,1922.94472 687.153045,1922.03556 632.391501,1914.08626 C592.239746,1908.25833 556.144975,1882.64653 539.127321,1845.37886 C509.582566,1780.68106 530.146211,1700.78403 545.42184,1634.92842 C564.133896,1554.30375 592.221166,1477.54121 620.915497,1400.30998 L623.095838,1394.44335 C623.459375,1393.4654 623.822974,1392.48736 624.186617,1391.50922 L626.36886,1385.63909 C627.096355,1383.68193 627.823883,1381.72429 628.551303,1379.76611 C661.804636,1290.24911 695.98705,1201.08955 730.277857,1111.96884 C761.572379,1030.67311 792.998521,949.431764 823.967866,868.019468 C826.332034,861.803009 828.971786,855.629982 831.636822,849.461178 L832.636907,847.147998 C839.47224,831.341572 846.268156,815.530695 848.813022,799.055631 C854.921726,759.518954 826.406702,724.318257 786.82788,747.109349 C718.408236,786.509885 667.17211,845.101219 616.390988,904.053391 L610.216035,911.223775 C594.435635,929.546222 578.633674,947.829782 562.307875,965.50908 C546.2193,982.938475 527.064761,1004.54844 499.401394,984.578066 C469.879866,963.271155 478.636449,935.942048 495.414091,912.793511 C588.593106,784.213836 700.469863,663.933133 846.273536,596.010552 C907.205721,567.624648 992.386903,538.725887 1072.15619,537.777877 C1131.958,537.070754 1188.71706,552.067961 1229.92952,594.767261 Z M1321.96809,14.8260694 C1398.67141,44.6728411 1440.00774,111.359901 1440,205.243966 C1439.99226,374.432657 1257.24216,490.152033 1104.47038,417.699209 C1025.51404,380.252816 987.11205,291.497329 1006.2511,190.697453 C1032.74538,51.0991052 1190.03094,-36.5063373 1321.96809,14.8260694 Z" fill-rule="evenodd" stroke="none" stroke-width="1"></path></g></svg>
  // </div>
  // <div class="eMdva_caGd">
  // <div data-testid="globalAnnouncementsAlert">You can view dismissed announcements by going to Account and selecting Global Announcements from the menu.</div>
  // <a data-testid="globalAnnouncementsButton" href="/account_notifications" cursor="pointer" class="fOyUs_bGBk eHiXd_bGBk eHiXd_bXiG eHiXd_ycrn eHiXd_bNlk eHiXd_cuTS" style="margin: 0.75rem 0px 0px; cursor: pointer;">
  // <span class="eHiXd_caGd">View</span></a>
  // </div>
  // <div class="eMdva_fsGh"><span class="ejhDx_bGBk ejhDx_doBn ejhDx_coHh">
  // <button cursor="pointer" type="button" tabindex="0" class="fOyUs_bGBk fOyUs_fKyb fOyUs_cuDs fOyUs_cBHs fOyUs_eWbJ fOyUs_fmDy fOyUs_eeJl fOyUs_cBtr fOyUs_fuTR fOyUs_cnfU fQfxa_bGBk" style="margin: 0px; padding: 0px; border-radius: 0.25rem; border-width: 0px; width: auto; cursor: pointer;">
  // <span class="fQfxa_caGd fQfxa_VCXp fQfxa_buuG fQfxa_EMjX fQfxa_bCUx fQfxa_bVmg fQfxa_bIHL"><span direction="row" wrap="no-wrap" class="fOyUs_bGBk fOyUs_desw bDzpk_bGBk bDzpk_eRIA bDzpk_fZWR bDzpk_qOas" style="width: 100%; height: 100%;"><span class="fOyUs_bGBk dJCgj_bGBk">
  // <span class="fQfxa_eoCh"><svg name="IconX" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="dUOHu_bGBk dUOHu_drOs dUOHu_eXrk cGqzL_bGBk" style="width: 1em; height: 1em;"><g role="presentation"><path d="M797.319865 985.881673L344.771525 1438.43001 533.333333 1626.99182 985.881673 1174.44348 1438.43001 1626.99182 1626.99182 1438.43001 1174.44348 985.881673 1626.99182 533.333333 1438.43001 344.771525 985.881673 797.319865 533.333333 344.771525 344.771525 533.333333z" fill-rule="nonzero" stroke="none" stroke-width="1"></path></g></svg></span><span class="ergWt_bGBk">Close</span></span></span></span></button></span></div>
  // </div>
  // `);
}