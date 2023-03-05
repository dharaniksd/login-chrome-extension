document.addEventListener('DOMContentLoaded', function() {
    reset();

    loadData(dataList.userList);
    loadApp(dataList.appList);
    loadEnv(dataList.envList);

  

  }, false);

  $(document).on("keyup","#filterInputId", function() {
    var value = $(this).val().toLowerCase();
    $("#userTableId tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  function loadData(userList){
    console.log(userList);
    var html='';
    $( userList).each(function(k,v) {
      html+='<tr>';
      html+='<td>'+k+'</td>';
      html+='<td>'+v.user+'</td>';
      html+='<td>'+v.pass+'</td>';
      html+='<td><button class="btn btn-primary" user="'+v.user+'" pass="'+v.pass+'" id="loginBtnId">Login</button></td>';
      html+='</tr>';
    });
    $('#tbodyId').html(html);
  }

  function loadApp(arr){
    var html='';
    $(arr).each(function(k,v) {
      html+='<option value="'+v+'">'+v+'</option>';
    });
    $('#appDropDownId').html(html);
  }

  function loadEnv(arr){
    var html='';
    $(arr).each(function(k,v) {
      html+='<option value="'+v+'">'+v+'</option>';
    });
    $('#envDropDownId').html(html);
  }
  
  $(document).on('click', '#loginBtnId' ,function(){
    var user=$(this).attr('user');
    var pass=$(this).attr('pass');
    var app=$('#appDropDownId').val();
    var env=$('#envDropDownId').val();
    var url=dataList.envUrlList[app+'_'+env];
    clearBrowserAndLogin(url, user, pass);

  });

  $(document).on('click', '#envDropDownId, #appDropDownId' ,function(){
    var app=$('#appDropDownId').val();
    var env=$('#envDropDownId').val();
    chrome.storage.sync.set({ selectedEnv: env, selectedApp: app}).then(() => {
      console.log("switch is set to " + $(this).is(':checked') ? 'ON': 'OFF');
      initialTable(app, env);
    });
  });

  // $(document).on('click', '#appDropDownId' ,function(){
  //   var app=$('#appDropDownId').val();
  //   var env=$('#envDropDownId').val();
  // }); 
  
function clearBrowserAndLogin(url, user, pass){
  var app=$('#appDropDownId').val();
  chrome.browsingData.remove({
    "origins": [url]
  }, {
    "cacheStorage": true,
    "cookies": true,
    "fileSystems": true,
    "indexedDB": true,
    "localStorage": true,
    "serviceWorkers": true,
    "webSQL": true
  }, function(){
    chrome.runtime.sendMessage({data: {url: url, user: user, pass: pass, app: app, type: 'login'}}, function(response){
      console.log('response back from sendMessage');
      console.log(response);
    })
  });
}

$(document).on('click', '#switchId' ,function(){
  $('#switchForId').html($(this).prop('checked') ? 'ON': 'OFF');
  chrome.storage.sync.set({ switch: $(this).prop('checked') ? 'ON': 'OFF' }).then(() => {
    console.log("switch is set to " + $(this).prop('checked') ? 'ON': 'OFF');
    reset();
  });
}); 

function initialTable(app){
  var filteredList=[];
  $(dataList.userList).each(function(k,v){
    if(v.app && (v.app.includes(app) || v.app.length ==0)){
      filteredList.push(v);
    }
  });
  loadData(filteredList);
} 

function reset(){
  chrome.storage.sync.get(["switch","selectedEnv","selectedApp"]).then((result) => {
    console.log("switch currently is " + result);
    $('#appDropDownId').val(result.selectedApp);
    $('#envDropDownId').val(result.selectedEnv);
    initialTable(result.selectedApp);
    if(result.switch=="ON"){
      $('#switchId').prop('checked', true);
      $('.container *').prop('disabled',false);
    }else{
      $('#switchId').prop('checked', false);
      $('.container *').prop('disabled',true);
    }
  });
}
