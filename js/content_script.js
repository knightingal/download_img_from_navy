function doTask() {
    Task.init();
    var pageInfo = Task.getPageInfo().toJSONString();
    console.log(pageInfo);
    chrome.extension.sendMessage(
        pageInfo,
        function(response) {
            this.imgArrya = [];
        }
    );
}

var Task = {
    "trElementArray": [],
    "pElementArray": [],
    "pageInfoObjExample": {"imgArray":[
        {
          "imrSrc":"http://www.navsource.org/archives/01/0136005.jpg",
          "description":"<i>\"Proposed B.S. #36\".</i><br>\nPreliminary design plan prepared for the General Board during consideration of designs for Battleship # 36, which became the <b><i>Nevada </i>(BB-36 / 37)</b> class. This plan, dated 4 March 1911, provides eight 14-inch guns, twin-screw reciprocating machinery and a speed of 21 knots in a ship 605 feet long on the load water line (L.W.L.), 95 feet in beam, with a normal displacement of 27,000 tons.\nThe original plan is in the 1911-1925 \"Spring Styles Book\".\n",
          "copyright":"U.S. Naval Historical Center Photograph # S-584-001. "
        },
        {
          "imrSrc":"http://navsource.org/archives/01/pdf/013600p.pdf",
          "description":"<font size=\"3\"><b>Girl to Name New War Dog Will Be Sponsor for <b><i>Nevada </i>(BB-36)</b></b><br> Miss Eleanor Anne Siebert, a little miss of 10 years,has been named sponsor for the <b><i>Nevada</i></b>, the newest battleship of the United States navy, which will be launched in October. </font>",
          "copyright":"<font size=\"3\">Image and text provided by University of California, Riverside.<br>Photo from <i>The San Francisco Call.</i>(San Francisco [Calif.]) 1895-1913, 17 August  1913, Image 9, via chroniclingamerica.loc.gov.  </font>"
        },],
        "title":"BB-36 USS NEVADA",
      },
    "pageInfoObj": {},
    "imgArray": [],
    "init": function() {
        this.trElementArray = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        console.log(this.trElementArray);
        var j = 0;
        var notUseArray = [];
        for (var i = 0; i < this.trElementArray.length; i++) {

            var tds = this.trElementArray[i].getElementsByTagName("td");
            if (tds.length >= 4) {
                console.log(tds[0].childNodes[0].href + " " + j);
                // console.log(tds[2].innerHTML + " " + j);
                // console.log(tds[3].innerHTML + " " + j);
                this.imgArray.push({
                    "imrSrc": tds[0].childNodes[0].href,
                    // "description": tds[2].innerHTML,
                    // "copyright": tds[3].innerHTML
                  })
                j++;
            } else {
                notUseArray.push(this.trElementArray[i]);
            }

        }
        this.pageInfoObj.imgArray = this.imgArray;
        var h1 = document.getElementsByTagName("h1")[1];
        var title = h1.childNodes[0].childNodes[1].innerText
        this.pageInfoObj.title = title;
        console.log(notUseArray);
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
