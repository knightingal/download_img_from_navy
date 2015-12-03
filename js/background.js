var isAutoRun = false;

var totalRequest = {};
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

    if (request === "checkIsAutoRun") {
        sendResponse(isAutoRun);
    } else {
        var xmlhttp = new XMLHttpRequest()
        // console.log(totalRequest);
        // xmlhttp.open("POST", "http://127.0.0.1:8000/local1000/navy/", true)
        xmlhttp.open("POST", "http://127.0.0.1:8081/startDownload/donwLoadNavy/", true)
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4) {
                if (xmlhttp.status==200) {
                    console.log("http://127.0.0.1:8000/local1000/navy/ return "
                        + xmlhttp.responseText)
                }
            }
        }
        xmlhttp.send(request);
        totalRequest = {};
        sendResponse(null);
    }

});
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
            code: "doTask()"
        },
        function() {
            console.log("callback");
        }

    );

});
