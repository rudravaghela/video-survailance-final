objects = [];
video = "";
status = "";
function setup(){
canvas = createCanvas(480,380);
canvas.center()

}

function draw(){
image(video,0,0,480,380);
if (status != ""){
    objectDetector.detect(video,gotResult);
 for(i=0;i<objects.length;i++){
     document.getElementById("status").innerHTML = "status object detected";
     document.getElementById("objects_no").innerHTML = objects.length;
     fill("#ff0000");
     percent = floor(objects[i].confidence*100);
     text(objects[i].label+" "+percent+"%",objects[i].x + 15 , objects[i].y +15);
noFill();
stroke("#ff0000");
rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
 }
}


}

function preload(){
video = createVideo('video.mp4');
video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("modelLoaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error,results)
{
if (error){
    console.error(error);
    
}
console.log(results);
objects = results;

}