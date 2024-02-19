const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");
const play_piano_keys = ['g','g','l','l',';',';','l','k','k','j','j','h','h','g','l','l','k','k','j','j','h','l','l','k','k','j','j','h','g','g','l','l',';',';','l','k','k','j','j','h','h','g'];
var played_key = '';
var temp_class = '';

let allKeys = [],
audio = new Audio(`tunes/a.wav`); // by default, audio src is "a" tune

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; // passing audio src based on key pressed 
    audio.play(); // playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => { // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
    playTracker(key); // allows the user to click or press the keyboard to play
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // passing the range slider value as an audio volume
}

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
    if(allKeys.includes(e.key)) playTune(e.key);
}

// function for play tracker
const playTracker = (key) => {
    // if the pressed key is in the play_piano_keys array, only call the playTune function
    // console.log(play_piano_keys.length)

    if(play_piano_keys.length != 0) {
        played_key = play_piano_keys.shift(); // take the first note from the array
    }
    if(played_key.includes(key)) {
        temp_class = '.note_' + (play_piano_keys.length + 1);
        document.querySelector(temp_class).classList.add('note_played')
        if(play_piano_keys.length == 0) { // we reached the last note
            played_key='';
            //set pause for 200ms
            // setTimeout(function(){window.location.replace("./golden_ticket.jpg")}, 0);
            window.location.replace("./golden_ticket.jpg")
            
        }
        // console.log(played_key); // for debugging
    }
    else { // add the note back to the array
        play_piano_keys.unshift(played_key);
    }

}



keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
// document.addEventListener("keydown", playTracker);


