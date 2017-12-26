$(document).ready(function() {
    console.log("This works?");
    
    $(".arrow").click(function() {
        console.log("We here");
        makeDisappear();
        setTimeout(function() {
            makeAppear();
        }, 2000);
    });
    $(".searcher").click(function(){
        makeDisappear()
        console.log("Searching");
        var check = $(".bar").val();
        search("https://api.github.com/repositories/57434780/contents/collection", check);
        makeSearchAppear();
    })
});

function makeDisappear () {
    console.log("We doin it");
    $("button").fadeOut(200);
    $("p").slideUp(1000, function() {
        $("h2").removeClass("exposed");
        $("h2").addClass("hidden");
    });
    setTimeout(function() {
        $("h1").fadeOut(600);     
    }, 1500);
    return true;
    
}
function makeSearchAppear() {
        setTimeout(function() {
         $("h1").fadeIn(1500, function() {

        $("h2").removeClass("hidden");
        $("h2").addClass("exposed");
        setTimeout( function() {
            $("p").slideDown(1000); 
                    $("button").fadeIn(200);

        }, 800);
        });
    }, 700);
}
function makeAppear() {
    console.log("makeAppear");
    
    var source = "https://api.github.com/repositories/57434780/contents/collection";
    var randNum = Math.floor(Math.random()*1000);
    getAuthor(source, randNum);
    setTimeout(function() {
         $("h1").fadeIn(1500, function() {

        $("h2").removeClass("hidden");
        $("h2").addClass("exposed");
        setTimeout( function() {
            $("p").slideDown(1000); 
                    $("button").fadeIn(200);

        }, 800);
        });
    }, 700);
   
    
    
}

function getAuthor (theURL, theNum){
    var xhr = $.getJSON(theURL, function(data) {
        console.log("success");
        console.log(data[theNum].name);
        $("h2").html("By: " + data[theNum].name);
    })
    .done(function(data){
        console.log("second success");
        getTitle(theURL + "/" + data[theNum].name, data[theNum].name);
        
    })
    .fail(function(){
        console.log("error");
    })
    .always(function(){
        console.log("complete");
    });
    
}
function getTitle (theURL, theName) {
    var randNum;
    var xhr = $.getJSON(theURL, function(data) {
        console.log("success2");
        console.log("LENGHT: " + data.length);
        randNum = Math.floor(Math.random()*data.length);
        console.log(data[randNum].name);
        var title = data[randNum].name;
        title = title.replace("_", " ");
        $("h1").html(title.substring(0, title.length - 5));
    })
    .done(function(data){
        console.log("second success");
        
        var theOtherURL = "https://raw.githubusercontent.com/jesterswilde/poetry-api/master/collection/";
        getText(theOtherURL + theName + "/" + data[randNum].name);

    })
    .fail(function(){
        console.log("error");
    })
    .always(function(){
        console.log("complete");
    });
         
}

function getText (theURL){
    var xhr = $.getJSON(theURL, function(data) {
        console.log("success");
        console.log(data.text);
        var allWords = data.text.join('<br>');
        $("p").html(allWords);
    })
    .done(function(data){
        console.log("second success");
    })
    .fail(function(){
        console.log("error");
    })
    .always(function(){
        console.log("complete");
    });
}
function search (theURL, keyword) {
    var xhr = $.getJSON(theURL, function(data) {
        console.log("success");
    })
    .done(function(data){
        console.log("second success");
        $("h1").html("Results:");
        $("p").html("");
        var indexList = searchArray(keyword, data);
        for(var i = 0; i < indexList.length; i++) {
            console.log(data[indexList[i]].name);
            $("p").append(data[indexList[i]].name);
        }

    })
    .fail(function(){
        console.log("error");
    })
    .always(function(){
        console.log("complete");
    });
}

//SEARCH ARRAY
function searchArray (yoInput, theArray) {
    var counter = 0;
    var listOfIndexes = [];
    for(var count = 0; count < theArray.length; count++)
        {
            if(theArray[count].name.indexOf(yoInput) != -1) {
                console.log("The index: " + count);
                listOfIndexes[counter] = count;
                counter++;
            } 
        }
    return listOfIndexes;
}
