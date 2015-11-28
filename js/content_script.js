function doTask() {
    Task.init();
    var pageInfo = Task.getPageInfo();
    chrome.extension.sendMessage(
        pageInfo.toJSONString(), 
        function(response) {
            // if (Task.isLastPage()) {
            //     window.location.href = Task.getNextUrl();
            // } else {
            //     chrome.extension.sendMessage("stop", function(response) {});
            // }
            
        }
    );
}

var Task = {
    "trElementArray": [],
    "pElementArray": [],
    "pageInfoObj": {},
    "imgArray": [],
    "init": function() {
        this.trElementArray = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        console.log(this.trElementArray);
        for (var i = 0; i < this.trElementArray.length; i++) {
            var tds = this.trElementArray[i].getElementsByTagName("td");
            if (tds.length >= 4) {
                console.log(tds[0].childNodes[0].href + " " + i);
                console.log(tds[2].innerHTML + " " + i);
                console.log(tds[3].innerHTML + " " + i);
                this.imgArray.push({
                    "imrSrc": tds[0].childNodes[0].href, 
                    "description": tds[2].innerHTML, 
                    "copyright": tds[3].innerHTML})
            }
        }
        this.pageInfoObj.imgArray = this.imgArray;
        var h1 = document.getElementsByTagName("h1")[1];
        var title = h1.childNodes[0].childNodes[1].innerText
        this.pageInfoObj.title = title;
        // this.pElementArray = document.getElementsByTagName("p");
    },
    "getCurrentTitle": function() {
        return this.getTitleShort(
                new String(this.fontElementArray[4].innerHTML)
        );
    },
    "getNextTitle": function() {
        return this.getTitleShort(
                new String(this.fontElementArray[this.fontElementArray.length - 16].innerHTML)
        );
    },
    "getNextUrl": function() {
        var nextUrl = this.fontElementArray[this.fontElementArray.length - 16].parentNode.href;
        return nextUrl;
    },
    "getTitleShort": function(titleString) {
        return new String(titleString.slice(0, -4));
    },
    "getPageInfo": function() {
        // var imgSrcArray = [];
        // var pageInfoObj = {};
        // for (var i = 2; i < this.pElementArray.length; i++) {
        //     imgSrcArray[i-2] = this.pElementArray[i].firstChild.src;
        // }
        // pageInfoObj.imgSrcArray = imgSrcArray;
        // pageInfoObj.title = this.getCurrentTitle();
        return this.pageInfoObj;
    },
    "isLastPage": function() {
        var nextTitle = this.getNextTitle();
        var currentTitle = this.getCurrentTitle();
        return nextTitle.localeCompare(currentTitle) == 0;
    }
    // ,
    // "doTask": function() {
    //     var getInfo = this.getPageInfo();
    //     console.log(getInfo);
    //     self.port.emit("sendPageInfo", getInfo);
    //     if (this.isLastPage() == 0) {
    //         self.port.emit("goToNextPage", this.getNextUrl());
    //     }
    //     else {
    //         self.port.emit("stopAndSendPageInfosToServer");
    //     }
    // }
}

console.log("enter content_script.js");
function checkIsAutoRun(autoRunCallback) {
    chrome.extension.sendMessage("checkIsAutoRun", function(response) {
        var isAutoRun = response;
        if (isAutoRun === true) {
            autoRunCallback();
        }
    });
}

checkIsAutoRun(doTask);

function getTitleShort(titleString) {
    return new String(titleString.slice(0, -4));
}
