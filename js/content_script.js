function doTask() {
    Task.init();
    var pageInfo = Task.getPageInfo();
    chrome.extension.sendMessage(
        pageInfo.toJSONString(), 
        function(response) {
            chrome.extension.sendMessage("stop", function(response) {});
        }
    );
}

var Task = {
    "fontElementArray": [],
    "pElementArray": [],
    "init": function() {
        this.fontElementArray = document.getElementsByTagName("font");
        this.pElementArray = document.getElementsByTagName("p");
    },
    "getCurrentTitle": function() {
        return this.getTitleShort(
                new String(this.fontElementArray[4].innerHTML)
        );
    },
    "getNextTitle": function() {
        return this.getTitleShort(
                new String(this.fontElementArray[this.fontElementArray.length - 13].innerHTML)
        );
    },
    "getNextUrl": function() {
        return this.fontElementArray[this.fontElementArray.length - 13].parentNode.href;
    },
    "getTitleShort": function(titleString) {
        return new String(titleString.slice(0, -4));
    },
    "getPageInfo": function() {
        var imgSrcArray = [];
        var pageInfoObj = {};
        for (var i = 2; i < this.pElementArray.length; i++) {
            imgSrcArray[i-2] = this.pElementArray[i].firstChild.src;
        }
        pageInfoObj.imgSrcArray = imgSrcArray;
        pageInfoObj.title = this.getCurrentTitle();
        return pageInfoObj;
    },
    "isLastPage": function() {
        return this.getNextTitle().localeCompare(this.getCurrentTitle());
    },
    "doTask": function() {
        var getInfo = this.getPageInfo();
        console.log(getInfo);
        self.port.emit("sendPageInfo", getInfo);
        if (this.isLastPage() == 0) {
            self.port.emit("goToNextPage", this.getNextUrl());
        }
        else {
            self.port.emit("stopAndSendPageInfosToServer");
        }
    }
}

console.log("enter content_script.js");
function checkIsAutoRun(autoRunCallback) {
    chrome.extension.sendMessage(false, function(response) {
        var isAutoRun = response;
        if (isAutoRun === true) {
            autoRunCallback();
        }
    });
}

checkIsAutoRun(doTask);

// chrome.extension.sendMessage(false, function(response) {
//     if (response == true) {
//         doTask();
//     }
// });

function getTitleShort(titleString) {
    return new String(titleString.slice(0, -4));
}
