$(document).ready(function(){
    var list  = ["Dog", "Cat", "Cat Feet", "Dog Paws"];
    $.getJSON("https://api.github.com/repositories/57434780/contents/collection", function(data){
        console.log("success");
    })
    .done(function(data) {
        
        console.log(data[0].name);
        
        
        
        
        
        
        
        
    })
    .fail(function() {
        console.log("we fucked it");
    })
    .always(function() {
        console.log("we outta here!");
    });
    $("button").click(function(){
        var check = $(".searcher").val();
        console.log(searchArray(check, list)[0]);
        console.log(searchArray(check, list)[1]);
        console.log("LENGHT IS" + searchArray(check, list).length);
        for(var i = 0; i < searchArray(check, list).length; i++) {
            $("p").append("Result: " + list[searchArray(check, list)[i]] + "<br>");
        }
        
    });
});

function getAuthor (theURL, theNum){
    var theData = [];
    var xhr = $.getJSON(theURL, function(data) {
        console.log("success");
        console.log(data[theNum].name);
        for(var i = 0; i < data.length; i++) {
            theData[i] = data[i].name;
        }
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
    console.log("WE Got HEre")
    return theData;
}
function theSetter (set) {
    nameList = set;
}
function searchArray (yoInput, theArray) {
    var counter = 0;
    var listOfIndexes = [];
    for(var count = 0; count < theArray.length; count++)
        {
            if(theArray[count].indexOf(yoInput) != -1) {
                console.log("The index: " + count);
                listOfIndexes[counter] = count;
                counter++;
            } 
        }
    return listOfIndexes;
}