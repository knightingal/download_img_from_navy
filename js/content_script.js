//document.body.style.backgroundColor="green"; 
//document.getElementById("lst-ib").value="test";
function doTask() {
//console.log(x[2])
    console.log(window.location.href)
    var jsonObj = {};
    jsonObj.href = window.location.href
    var t=document.getElementsByTagName("font");
    //console.log(t);
    //console.log(t[8].innerHTML);
    var next_a = t[8].parentNode;
    //console.log(next_a.href);
    var title=t[4].innerHTML;
    var titleString = new String(title);
    //var titleShort = new String(titleString.slice(0, -4));
    var titleShort = getTitleShort(titleString);

    var next_title = getTitleShort(t[8].innerHTML);
    jsonObj.title = titleShort;
    var jsonArray = [];
    var x=document.getElementsByTagName("p")
    console.log(x)
    for (i=2; i<x.length; i++) {
        console.log(x[i].firstChild.src)
        //jsonArray[i-2]=x[i].firstChild.src
        jsonArray[i-2]=x[i].firstChild.src
    }
    jsonObj.list=jsonArray;
    //console.log(x[4].innerHTML)
    console.log(titleShort);
    console.log(jsonObj)
    console.log(jsonObj.toJSONString())

    console.log(next_title.localeCompare(titleShort));
    

    chrome.extension
        .sendMessage(jsonObj.toJSONString(), 
        function(response) {
            if (next_title.localeCompare(titleShort) == 0) {
                window.location.href = next_a;
            }
            else {
                chrome.extension.sendMessage("stop",
                    function(response) {
                    }
                );
            }
        }
    );
        
}


console.log("enter sendMessage");
chrome.extension.sendMessage(false, function(response) {
    if (response == true) {
        doTask();
    }
});

function getTitleShort(titleString) {
    return new String(titleString.slice(0, -4));
}
