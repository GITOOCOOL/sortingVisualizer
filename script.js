const n = 10;
let array = [];
let container = document.getElementById("container");

// var a = new buckets.Set();
// var b = new buckets.Set();
// a.add(1);
// a.add(2);
// b.add(2);
// a.union(b); // {1,2}
// console.log(a);
// console.log(b);

const getNoteName = (interval) => {
  let intervalOnly = interval % 12;
  switch (intervalOnly) {
    case 0:
      return "A";
    case 1:
      return "A#";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "C#";
    case 5:
      return "D";
    case 6:
      return "D#";
    case 7:
      return "E";
    case 8:
      return "F";
    case 9:
      return "F#";
    case 10:
      return "G";
    case 11:
      return "G#";

    case 12:
      return "A";

    default:
      return "";
  }
};
function convertToPianoNote(i) {
  // convert i to the note interval by dividing it by 10
  let pianoNote = 2 * 440 * Math.pow(2, (i - 24) / 12);
  return pianoNote;
}

function playNote(i) {
  const osc = new Tone.Oscillator({
    type: "sine", // Set the waveform type to sine
    // frequency: 440, // Set the frequency to 440 hertz
    // modulationType: "square", // Set the modulation type to square
    // modulationIndex: 10, // Set the modulation index to 10
    // detune: 0, // Set the detune to 0
    volume: 1, // Set the volume to -10 dB
    oscillator: { type: "sine" },
    envelope: { attack: 0.1, decay: 0.1, sustain: 1.0, release: 0.5 },
  }).toDestination();
  let pianoNote = convertToPianoNote(i);
  osc.frequency.value = pianoNote;
  osc.start();
  osc.stop("+0.1");
}
const init = () => {
  const generateRandomArray = (array) => {
    for (let i = 0; i < n; i++) {
      array[i] = Math.floor(Math.random() * n);
    }
    return array;
  };
  //random order of the array
  array = generateRandomArray(array);
  showBars();
};
const showBars = (move) => {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = (array[i] + 1) * 30 + "px";
    // bar.textContent = convertToPianoNote(array[i]).toString()

    bar.textContent = getNoteName(array[i]).toString();
    if (move && move.indices.includes(i)) {
      let color = move.type === "compare" ? "blue" : "red";
      bar.style.backgroundColor = color;
    } else {
      bar.style.backgroundColor = "white";
    }
    container.appendChild(bar);
  }
};

const play = () => {
  const copy = [...array];
  const moves = bubbleSort(copy);
  animate(moves);
};

const animate = (moves) => {
  if (moves.length == 0) {
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  console.log(i);
  const type = move.type;
  if (type == "swap") {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    playNote(-1);
  }
  playNote(i);
  showBars(move);
  setTimeout(() => {
    animate(moves);
  }, 100);
};

const bubbleSort = (array) => {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i, i - 1], type: "compare" });
      if (array[i - 1] > array[i]) {
        var temp = array[i - 1];
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        array[i - 1] = array[i];
        array[i] = temp;
      }
    }
  } while (swapped);
  return moves;
};

const quickSort = (array) => {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i, i - 1], type: "compare" });
      if (array[i - 1] > array[i]) {
        var temp = array[i - 1];
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        array[i - 1] = array[i];
        array[i] = temp;
      }
    }
  } while (swapped);
  return moves;
};

init();
