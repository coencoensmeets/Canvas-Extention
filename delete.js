function nodeInsertedCallback(event) {
	if (String(window.location.hostname).includes("canvas")==true){
    var items = document.getElementsByClassName("fOyUs_bGBk fbyHH_bGBk fbyHH_bSMN")
    if (items.length != 0){
    Test(items)
}
	}};



document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

async function Test(items){
  result = await getLocalStorageValue("list_groups");
  list = result.list_groups
    for (let i = 0; i < items.length; i++){
      Text_test = items[i].text.replace(/\s+/g, '')
      if (list.includes(Text_test)==true){
        items[i].text = ""
      }
      }
}

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
