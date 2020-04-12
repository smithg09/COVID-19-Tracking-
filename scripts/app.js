
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
        .then((reg) => {
        console.log("Service worker registerred", reg)
        }).catch((err ) => {
        console.log("sw not registered" ,err )
    })
}

collapsed = false;
function toggle_collapse() {
    if (!collapsed)
    {
        $("#new_feature").addClass("feature_collapse");
        $("#collapse_feature").html("&#11183;");
        collapsed = true;
    }
    else {
        $("#new_feature").removeClass("feature_collapse");
        $("#collapse_feature").html("&times;");
        collapsed = false
    }
}


window.addEventListener("online", showOnline);
window.addEventListener("offline", showOffline);

function showOnline() {    
    document.getElementById("cloud_icon").innerHTML = "cloud_queue";
    document.getElementById("cloud_off").style.color = "rgb(46, 60, 82)";
    showSnackbar("You are Online");
}

function showOffline() {
    
    document.getElementById("cloud_icon").innerHTML = "cloud_off";
  document.getElementById("cloud_off").style.color = "crimson";
  showSnackbar("You are Offline");
}

setInterval(() => {
    if (!navigator.onLine) {
        
    document.getElementById("cloud_icon").innerHTML = "cloud_off";
        document.getElementById("cloud_off").style.color = "crimson";
        showSnackbar("You are Offline");  
    }
}, 30000);


function showSnackbar(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 10000);
}

$(document).ready(() => {
    if (!navigator.onLine) {
        showSnackbar("You are Offline");              
    document.getElementById("cloud_icon").innerHTML = "cloud_off";
    document.getElementById("cloud_off").style.color = "crimson";
 
    }
})

function getUpdatedTime() {
    var today = new Date()
    today_S = today.toString()
    index_date = today_S.indexOf('GMT')
    latest_updated =  today_S.slice(0, index_date)
    return latest_updated;
}