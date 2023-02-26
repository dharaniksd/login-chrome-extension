chrome.storage.sync.get(["switch","user","pass", "app", 'type']).then((result) => {
  if(result.switch=='ON' && result.type=='login'){
    if(result.app ==='facebook'){
      document.querySelector("#email").value=result.user;
      document.querySelector("#pass").value =result.pass;
      if(document.querySelector("button[name='login']")){
        document.querySelector("button[name='login']").click();
      }else if(document.querySelector("input[value='Log In']")){
        document.querySelector("input[value='Log In']").click();
      }
      chrome.storage.sync.set({type: null});
    }else if(result.app ==='instagram'){
      logininstagram(result.user, result.pass);
    }else if(result.app ==='nttdata'){
      document.querySelector('input[name="loginfmt"]').value=result.user;
      document.querySelector('input[type="submit"]').click();
      
    }
  }
});


function logininstagram(user,pass){
  if(document.querySelector("input[name='username']")){
    document.querySelector("input[name='username']").focus();
    document.querySelector("input[name='username']").value=user;
    document.querySelector("input[name='password']").focus();
    document.querySelector("input[name='password']").value =pass;
    document.querySelector("button[type='submit']").focus();
    document.querySelector("button[type='submit']").click();
  }else{
    setTimeout(logininstagram, 1000, user,pass);
  }
}


// function logininstagram(k){
//   console.log('k',k);
//   k+=1;
//   if(k >10){
//     console.log('if->k',k);
//   }else{
//     console.log('else->k',k);
//     setTimeout(logininstagram, 5000, k);
//   }
  
// }
