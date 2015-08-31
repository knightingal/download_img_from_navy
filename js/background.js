var isAutoRun = false;

var totalRequest = [];
var index = 0;
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    
    if (request == false) {
        sendResponse(isAutoRun);
    } else if (request === "stop" ){
        console.log(totalRequest.toJSONString());
        isAutoRun = false;
        xmlhttp = new XMLHttpRequest()
        console.log(totalRequest);
        // xmlhttp.open("POST", "http://127.0.0.1:8081/", false)
        // xmlhttp.onreadystatechange = function() {
        //     if (xmlhttp.readyState==4) {
        //         if (xmlhttp.status==200) {
        //             console.log("http://127.0.0.1:8081/ return " 
        //                 + xmlhttp.responseText)
        //         }
        //     }
        // }
        // xmlhttp.send(totalRequest.toJSONString());
        totalRequest = [];
        index = 0;
    } else {
        
        // isAutoRun = true;
        // totalRequest[index] = request;
        // index += 1;
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.open("POST", "http://127.0.0.1:8000/local1000/urls1000/", false)
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                
                console.log("http://127.0.0.1:8000/ return " + xmlhttp.responseText);
                
            }
        }
        xmlhttp.send(request);
        sendResponse(0);
    }
    
});
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        code: "doTask()"
    }, function() {console.log("callback");}

    );
    /*
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8081/", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resp = xhr.responseText;
            console.log('response', resp);
        }
    }
    xhr.send();
    */
});
