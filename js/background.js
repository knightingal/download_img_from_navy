var isAutoRun = false;

var totalRequest = [];
var index = 0;
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request === "checkIsAutoRun") {
        sendResponse(isAutoRun);
    } else if (request === "stop" ){
        isAutoRun = false;
        xmlhttp = new XMLHttpRequest()
        console.log(JSON.stringify(totalRequest));
        xmlhttp.open("POST", "http://127.0.0.1:8000/local1000/urls1000/", false)
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4) {
                if (xmlhttp.status==200) {
                    console.log("http://127.0.0.1:8081/ return " 
                        + xmlhttp.responseText)
                }
            }
        }
        xmlhttp.send(JSON.stringify(totalRequest));
        totalRequest = [];
        index = 0;
    } else {
        var pageInfo = request;
        isAutoRun = true;
        totalRequest[index] = JSON.parse(pageInfo);
        index += 1;
        
        sendResponse(null);
    }
    
});
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        code: "doTask()"
    }, function() {console.log("callback");}

    );
    
});
