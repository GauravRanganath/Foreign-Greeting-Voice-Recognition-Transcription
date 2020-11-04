const btn = document.querySelector('.talk');
const transcription = document.querySelector('.transcription')
const language = document.querySelector('.language')
const numSpeakers = document.querySelector('.numSpeakers')
const placeOfOrigin = document.querySelector('.placeOfOrigin')

let greetings = [

    {
        greeting: "bonjour",
        language: "French",
        numSpeakers: "130 Million",
        placeOfOrigin: "Gaul (Northern France and Southern Belgium)"
    },

    {
        greeting: "hello",
        language: "English",
        numSpeakers: "510 Million",
        placeOfOrigin: "Britain"
    },

    {
        greeting: "konnichiwa",
        language: "Japanese",
        numSpeakers: "127 Million",
        placeOfOrigin: "Southeast Asia"
    },

    {
        greeting: "hola",
        language: "Spanish",
        numSpeakers: "420 Million",
        placeOfOrigin: "Iberian Peninsula"
    },

    {
        greeting: "namaste",
        language: "Hindi",
        numSpeakers: "490 Million",
        placeOfOrigin: "India"
    },

]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition

recognition.onstart = function() {
    console.log('voice is activated')
};

recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    transcription.textContent = transcript;
    readOutLoud(transcript)
};

btn.addEventListener('click', () => {
    recognition.start();
});

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = 'Sorry. I do not know that one.'
    language.textContent = 'Pardon'
    numSpeakers.textContent = 'Lo Siento'
    placeOfOrigin.textContent = 'Gomennasai'

    for (let i = 0; i < greetings.length; i++){
        if(greetings[i].greeting == message) {
            speech.text = "Your greeting is " + message + ". It is a" + greetings[i].language + " greeting. " + "It is spoken by " + greetings[i].numSpeakers + " people worldwide and orginated in" + greetings[i].placeOfOrigin;
            language.textContent =  "It is a " + greetings[i].language + " greeting.";
            numSpeakers.textContent = "It is spoken by " + greetings[i].numSpeakers + " people worldwide.";
            placeOfOrigin.textContent = "It originated in " + greetings[i].placeOfOrigin + "."; 
        }
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}