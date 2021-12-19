var previous_result = "";

function preload(){
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelloaded);
}

function draw(){

image(video,0,0,300,300);
classifier.classify(video,gotresult);

}

function modelloaded(){

console.log('model is loaded');

}

function gotresult(error,result){

if(error){

console.error(error)

}

else{

if((result[0].confidence > 0.5)&&(previous_result != result[0].label)){

console.log(result);
previous_result = result[0].label;

synth = window.speechSynthesis;
speak_data = "Object detected is-" + result[0].label;
utterthis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterthis);



document.getElementById("result_object_name").innerHTML = result[0].label;
document.getElementById("result_object_accuracy").innerHTML =result[0].confidence.toFixed(3);

}

}

}