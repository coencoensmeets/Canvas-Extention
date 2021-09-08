let list_groups = ["Group001"];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ list_groups });
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["delete.js"]
        })
});