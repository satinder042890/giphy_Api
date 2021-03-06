var topics=["Eating","Crying","Smiling","Angry","Sad","Hyper","Cooking","Driving","Sleeping","Chating","Travelling","Thinking","Reading"];
var s="";
var queryUrl;
var l=10;
//function to display buttons on screen
function renderButton(){
    console.log(topics);
    $("#buttonDisplayArea").empty();
    for(var i=0; i<topics.length ; i++){
        var bt=$("<button>").addClass("buttonForActions").attr("data-name",topics[i]).text(topics[i]);
        $("#buttonDisplayArea").append(bt);
    }
}
//function to call giphy api
function apiCall(){
    $("#gifDisplayArea").empty();  
    console.log(this);
    s=$(this).attr("data-name");
    queryUrl="https://api.giphy.com/v1/gifs/search?q=" + s + "&api_key=003zWj7bkLEFl3HLOs0VQCIZzsx6RKHL&limit=" +l;
    console.log(s);
    $.ajax({
       url:queryUrl,
       method:"GET"
    }).then(function(response){
        console.log(response);
        displayGif(response)
    });
}
//function to display gifs on screen when button is clicked
function displayGif(response){
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
}
//function to add new buttons on screen by user
function addNewValues(){
    event.preventDefault();
    var textValue=$("#textBox").val();
    console.log(textValue);
    topics.push(textValue);
    $("#textBox").val("");
    renderButton();

}
//function to add more gifs 
function addNumberForGifs(){
    l=10;
    event.preventDefault();
    l+=parseInt($("#textBoxForNumber").val());
    console.log(l);
    $("#textBoxForNumber").val("");
    // displayGif();
}
//function to reset the value of gifs to 10
function resetGifValues(){
    event.preventDefault();
    l=10;
    console.log(l);
    // displayGif();
}
//click different functions according to different click events
$(document).on("click", ".buttonForActions", apiCall);
$(document).on("click", "#submitButton", addNewValues);
$(document).on("click", "#submitButtonForNumber", addNumberForGifs);
$(document).on("click", "#resetButtonForNumber", resetGifValues);


$(document).ready(function(){
    renderButton();
   
});