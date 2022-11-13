Prediction_1 = "";
Prediction_2 = "";
 
Webcam.set(
{
    width: 350,
    height:300,
    image_Format: 'png',
    png_quality : 90
}
);

camera = document.getElementById("camera");

Webcam.attach('#camera');

function TakeSnapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = ' <img id="captured_image" src=" '+ data_uri + ' "/>'

    });

}

console.log('ml5 version', ml5.version);

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FX-4Ho24g/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function speak()
{
    var Synth = window.speechSynthesis;
    Speak_Data_1 = "The First Prediction is" + Prediction_1;
    Speak_Data_2 = "And The Second Prediction is" + Prediction_2 ;

    var UtterThis = new SpeechSynthesisUtterance(Speak_Data_1 + Speak_Data_2);
    Synth.speak(UtterThis);

}

function Check()
{
    img = document.getElementById('captured_image');

    Classifier.classify(img, gotresult);

}

function gotresult(error, results)
{
    if (error)
    {
        console.error(error);
    }

    else{

        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;

        speak();

        if (results[0].label == "Amazing")

        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
            
        }

        if (results[0].label == "Victory")

        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
            
        }


        if (results[0].label == "Best")

        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
            
        }

        


        if (results[1].label == "Amazing")

        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
            
        }

        if (results[1].label == "Victory")

        {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
            
        }


        if (results[1].label == "Best")

        {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
            
        }

        



    }


}