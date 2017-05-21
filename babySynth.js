// Create the audio context
var context = new AudioContext(),
oscillator = context.createOscillator();
// Connect the oscillator to our speakers
oscillator.start(context.currentTime);


var startButton = document.querySelector(".start")
var stopButton = document.querySelector(".stop")

var biquadFilter = context.createBiquadFilter()
var filterFreq = $(".filterFreqSlider")[0]
startButton.onclick = start;
stopButton.onclick = stop;

    function start(){
        oscillator.connect(biquadFilter)
        biquadFilter.connect(context.destination);
    }

    function stop(){
        biquadFilter.disconnect(context.destination);
    }

    function ping(){
        start()
        setTimeout(stop, 1000);
    }

    function makeNoteBox(i){
        var box = document.createElement('div')
        box.className = "noteBox"
        box.id = `note-${i}`
        $(".noteBoxHolder")[0].appendChild(box)
    }

    for (var i = 0; i < 12; i++){
        makeNoteBox(i)
    }

    let notes = $(".noteBoxHolder")[0].children
    let accidentals = []


    for (var i = 0; i < notes.length; i++){
        notes.on = false
        notes[i].onclick = ping;
    }

    accidentals.push(notes[1], notes[3], notes[6], notes[8], notes[10])

    for(var note in accidentals){
        accidentals[note].className = "accidental"
    }

    let freq = document.querySelector(".filterFreqSlider")
    let detune = document.querySelector(".filterDetuneSlider")
    let qSlide = document.querySelector(".freqQSlider")

    freq.oninput = () => {
        biquadFilter.frequency.value = freq.value
    }

    detune.oninput = () => {
        biquadFilter.detune.value = detune.value
    }

    qSlide.oninput = () => {
        biquadFilter.Q.value = qSlide.value
    }




    //create note labels (maybe get rid of these?)
    notes[0].innerHTML = "C"
    notes[1].innerHTML = "C#"
    notes[2].innerHTML = "D"
    notes[3].innerHTML = "D#"
    notes[4].innerHTML = "E"
    notes[5].innerHTML = "F"
    notes[6].innerHTML = "F#"
    notes[7].innerHTML = "G"
    notes[8].innerHTML = "G#"
    notes[9].innerHTML = "A"
    notes[10].innerHTML = "A#"
    notes[11].innerHTML = "B"


    //assing chromatic values to keys based on frequency
    notes[0].onclick = () => {oscillator.frequency.value = 	261.63; ping()}
    notes[1].onclick = () => {oscillator.frequency.value =  277.18; ping()}
    notes[2].onclick = () => {oscillator.frequency.value =  293.66; ping()}
    notes[3].onclick = () => {oscillator.frequency.value =  311.13; ping()}
    notes[4].onclick = () => {oscillator.frequency.value =  329.63; ping()}
    notes[5].onclick = () => {oscillator.frequency.value =  349.23; ping()}
    notes[6].onclick = () => {oscillator.frequency.value =  369.99; ping()}
    notes[7].onclick = () => {oscillator.frequency.value =  392.00; ping()}
    notes[8].onclick = () => {oscillator.frequency.value =  415.30; ping()}
    notes[9].onclick = () => {oscillator.frequency.value =  440.00; ping()}
    notes[10].onclick = () => {oscillator.frequency.value = 466.16; ping()}
    notes[11].onclick = () => {oscillator.frequency.value = 493.88; ping()}
