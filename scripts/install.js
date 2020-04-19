  let promptIntercepted = false;
  let isStandalone = false;
  let deferredPrompt = '';
  let userInstalled = false;
  let whereIsShare = "bottom";

  // user agent
  let isChrome = false;
  let isExplorer = false;
  let isExplorer_11 = false;
  let isFirefox = false;
  let isSafari = false;
  let isOpera = false;
  let isEdgeDesktop = false;
  let isEdgeiOS = false;
  let isEdgeAndroid = false;
  let userAgent = "";

  let isIOS = false;
  let isMobile = false;

  // For testing debug display only
  let promptSaved = false;
  let customButtonClicked = false;
  let deferredPromptShown = false;
  let deferredPromptRejected = false;
  
  function checkUserAgent() {
     userAgent = navigator.userAgent.toLowerCase();
    const uaString =  userAgent;

     isChrome = /chrome/.test(uaString);
     isExplorer = /msie/.test(uaString);
     isExplorer_11 = /rv:11/.test(uaString);
     isFirefox = /firefox/.test(uaString);
     isSafari = /safari/.test(uaString);
     isOpera = /opr/.test(uaString);
     isEdgeDesktop = /edge/.test(uaString);
     isEdgeiOS = /edgios/.test(uaString);
     isEdgeAndroid = /edga/.test(uaString);

     isIOS = /ipad|iphone|ipod/.test(uaString);
     isMobile = /mobile/.test(uaString);
    if ( isChrome &&  isSafari) {
       isSafari = false;
    }
    if (
       isChrome &&
      ( isEdgeDesktop ||  isEdgeiOS ||  isEdgeAndroid)
    ) {
       isChrome = false;
    }
    if (
       isSafari &&
      ( isEdgeDesktop ||  isEdgeiOS ||  isEdgeAndroid)
    ) {
       isSafari = false;
    }
    if ( isChrome &&  isOpera) {
       isChrome = false;
    }

    if (/ipad/.test(uaString)) {
       whereIsShare = "top";
      }
      return isIOS;
  }
  // showUserAgent() {
  //    userAgent = navigator.userAgent.toLowerCase();
  // }

  function trackStandalone() {
    // called once from app.component
    if ( checkStandalone()) {
        document.getElementById('install_btn').style.display = "none";
        document.getElementById("new_feature").style.display = "none";
        document.getElementById('tab-space').style.marginBottom = "20px"
        return true;
      //  gas.emitEvent('A2HS', 'Standalone', '' , 0);
      }
    else {
        return false;
      }
  }

  function checkStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches;
  }

  function trackInstalled() {
    document.getElementById("install_btn").style.display = "none";
  }

  function addToHomeScreen() {

    if (!deferredPrompt) {
      showSnackbar('App Already Installed')
      return;
    }
    // Show the prompt
     deferredPrompt.prompt();
     deferredPromptShown = true;

    // Wait for the user to respond to the prompt
     deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        // no matter the outcome, the prompt cannot be reused ON MOBILE
        // for 3 months or until browser cache is cleared?
      } else {
         deferredPromptRejected = true;
      }
    });
  }

  

  function iOSSafariHow2() {
    if ( isSafari &&  isIOS && ! isStandalone) {
      return "block";
    } else {
      return "none";
    }
  }

 function showHideButton_iOS() {
    if ( isIOS && ! userInstalled) {
      return "block";
    } else {
      return "none";
    }
  }


// Main Script Starts 
 var is_IOS = checkUserAgent();
if (!trackStandalone()) {

    window.addEventListener("beforeinstallprompt", (e) => {
      // show the add button
    promptIntercepted = true;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();
      // Stash the event so it can be displayed when the user wants.
     deferredPrompt = e;
     promptSaved = true;
    });

    window.addEventListener("appinstalled", (evt) => {
        trackInstalled();
        showSnackbar("App Installed");
      // hide the add button
      // a2hs.promptIntercepted = false;
    });

    $(document).ready(() => {
      if (is_IOS) {
          document.getElementById("ios_disabled").style.display = "none";
            var elem = document.getElementById("instruc");
          elem.innerHTML = `
            <li>Click share button
                <img height="15" alt="Share Button Image" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy5
                        3My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMC44OCAyNy4yNSI+PGRlZnM+PHN0eWxlPi
                        5jbHMtMXtmaWxsOm5vbmU7c3Ryb2tlOiMyMzFmMjA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5TY
                        WZhcmlfU2hhcmU8L3RpdGxlPjxwb2x5bGluZSBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTMuMTMg
                        OCAyMC4zOCA4IDIwLjM4IDI2Ljc1IDAuNSAyNi43NSAwLjUgOCA3LjUgOCIvPjxsaW5lIGNsYXN
                        zPSJjbHMtMSIgeDE9IjEwLjQ0IiB5MT0iMTciIHgyPSIxMC40NCIvPjxsaW5lIGNsYXNzPSJjbH
                        MtMSIgeDE9IjEwLjQ4IiB5MT0iMC4zOCIgeDI9IjE1LjI4IiB5Mj0iNS4xOCIvPjxsaW5lIGNsY
                        XNzPSJjbHMtMSIgeDE9IjEwLjQ0IiB5MT0iMC4zOCIgeDI9IjUuNjQiIHkyPSI1LjE4Ii8+PC9z
                        dmc+">
                    at the ${whereIsShare} of the browser, Scroll left (if needed) to find the Add to Home Screen button
                    <img height="15" alt="Add to Home Screen button Image" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy5
                        3My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNSAzNSI+PHRpdGxlPlNhZmFyaV9BMkhTPC
                        90aXRsZT48cmVjdCB3aWR0aD0iMzUiIGhlaWdodD0iMzUiIHJ4PSI4IiByeT0iOCIgc3R5bGU9I
                        mZpbGw6IzhmOGY4ZiIvPjxsaW5lIHgxPSIyNC43NSIgeTE9IjE3LjUiIHgyPSIxMC4yNSIgeTI9
                        IjE3LjUiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjJweCIvPjx
                        saW5lIHgxPSIxNy41IiB5MT0iMTAuMjUiIHgyPSIxNy41IiB5Mj0iMjQuNzUiIHN0eWxlPSJmaW
                        xsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjJweCIvPjwvc3ZnPg=="></li>

        </div>
        `;
        }
    });
} 