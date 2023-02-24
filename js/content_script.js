chrome.storage.sync.get(["switch","user","pass", "app"]).then((result) => {
  if(result.switch=='ON'){
    if(result.app ==='facebook'){
      document.querySelector("#email").value=result.user;
      document.querySelector("#pass").value =result.pass;
      if(document.querySelector("button[name='login']")){
        document.querySelector("button[name='login']").click();
      }else if(document.querySelector("input[value='Log In']")){
        document.querySelector("input[value='Log In']").click();
      }
    }
  }
});