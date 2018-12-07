var topics=["Eating","Crying","Smiling","Angry","Sad","Hyper","Cooking"];
var s="";
var queryUrl;
function renderButton(){
    $("#buttonDisplayArea").empty();
    for(var i=0; i<topics.length ; i++){
        var bt=$("<button>");
        bt.addClass("buttonForActions");
        bt.attr("data-name",topics[i]);
        bt.text(topics[i]);
        $("#buttonDisplayArea").append(bt);
    }
}
function displayGif(){
    $("#gifDisplayArea").empty();  
    console.log(this);
s=$(this).attr("data-name");
queryUrl="https://api.giphy.com/v1/gifs/search?q=" + s + "&api_key=003zWj7bkLEFl3HLOs0VQCIZzsx6RKHL&limit=10";
console.log(s);
$.ajax({
    url:queryUrl,
    method:"GET"
}).then(function(response){
    console.log(response);
    console.log(queryUrl);
    for(var i=0; i<response.data.length;i++){
        var image=$("<img>");
        image.attr("src",response.data[i].images.downsized.url);
        image.addClass("imageSize");
        image.attr(response.data[i]);
        $("#gifDisplayArea").append(image);
    //    $("#gifDisplayArea").append("<img src ='"+response.data[i].images.downsized.url+"'>");
    }
});
}
$(document).on("click", ".buttonForActions", displayGif);

$(document).ready(function(){
    renderButton();
});