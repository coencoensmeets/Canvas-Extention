// let list_groups = [""]
let list_groups_unhighlighted  = ["Group001", "4WEU00Group13:Mob.T1", "Group007", "Group236", "GroupB(virtuallectureattendanceonly)16", "Group(project)70", "JetEngine84", "Mobility"];
let list_groups_highlighted = ["empty"]
let list_links_course = [["17706", "Studeersnel", "https://www.studeersnel.nl/nl"]]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({list_groups_unhighlighted: list_groups_unhighlighted }, function(data) {
  chrome.storage.sync.set({list_groups_unhighlighted: data.list_groups_unhighlighted}, function() {
  });
});

  chrome.storage.sync.get({list_groups_highlighted: list_groups_highlighted }, function(data) {
  chrome.storage.sync.set({list_groups_highlighted: data.list_groups_highlighted}, function() {});
});
  
  chrome.storage.sync.get({list_links_course: list_links_course }, function(data) {
  chrome.storage.sync.set({list_links_course: data.list_links_course}, function() {
  });
});
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["delete.js"]
		})
});
