var topics=["Eating","Crying","Smiling","Angry","Sad","Hyper","Cooking","Driving","Sleeping","Chating","Travelling","Thinking","Reading"];
var s="";
var queryUrl;
function renderButton(){
    console.log(topics);
    $("#buttonDisplayArea").empty();
    for(var i=0; i<topics.length ; i++){
        var bt=$("<button>").addClass("buttonForActions").attr("data-name",topics[i]).text(topics[i]);
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
    for(var i=0; i<response.data.length;i++){
        var box=$("<div>").addClass("mainBox");
        var image=$("<img>").attr("src",response.data[i].images.downsized_still.url).addClass("imageSize").attr("data-name-still",response.data[i].images.downsized_still.url).attr("data-name-moving",response.data[i].images.downsized.url).attr("image-state","still");
        console.log(i+response.data[i].rating);
        var rating=$("<b>").text("Rating : "+response.data[i].rating).addClass("imageBox");
        box.append(rating);
        box.append(image);
        $("#gifDisplayArea").prepend(box);
    }
    $(".imageSize").on("click",function(){
        var state=$(this).attr("image-state");
        if(state === "still"){
            $(this).attr("src",$(this).attr("data-name-moving"));
            state= $(this).attr("image-state","moving");
        }
        else{
            $(this).attr("src",$(this).attr("data-name-still"));
            state= $(this).attr("image-state","still");
        }
    });
});
}
function addNewValues(){
    var textValue=$("#textBox").val();
    console.log(textValue);
    topics.push(textValue);
    $("#textBox").val("");
    renderButton();

}

$(document).on("click", ".buttonForActions", displayGif);
$(document).on("click", "#submitButton", addNewValues);

$(document).ready(function(){
    renderButton();
   
});