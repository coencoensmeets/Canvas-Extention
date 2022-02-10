// let list_groups = [""]
let list_groups_unhighlighted  = ["Group001", "4WEU00Group13:Mob.T1", "Group007", "Group236", "GroupB(virtuallectureattendanceonly)16", "Group(project)70", "JetEngine84", "Mobility"];
let list_groups_highlighted = ["empty"]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({list_groups_unhighlighted: list_groups_unhighlighted }, function(data) {
  // data.links will be either the stored value, or defaultValue if nothing is set
  chrome.storage.sync.set({list_groups_unhighlighted: data.list_groups_unhighlighted}, function() {
    // The value is now stored, so you don't have to do this again
  });
});

  chrome.storage.sync.get({list_groups_highlighted: list_groups_highlighted }, function(data) {
  // data.links will be either the stored value, or defaultValue if nothing is set
  chrome.storage.sync.set({list_groups_highlighted: data.list_groups_highlighted}, function() {
    // The value is now stored, so you don't have to do this again
  });
});
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["delete.js"]
		})
});
