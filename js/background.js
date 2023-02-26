chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
    chrome.storage.sync.get(["switch"]).then((result) => {
      if(result.switch=='ON'){
        chrome.storage.sync.set(request.data).then(() => {
          console.log("switch is set to "+ request);
          chrome.tabs.create({url: request.data.url, active: true}, function(){
          
          });
        });
        
      }
    });
    sendResponse({result: true, me: 'dharani'})
});
