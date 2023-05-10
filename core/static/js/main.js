let mic, recorder, soundFile;

//let state = 0; // mousePress will increment from Record, to Stop, to Play

function setup() {

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
}

function mousePressed(state) {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile
  } else if (state === 2) {
    saveSound(soundFile, "mySound.wav"); // save file

    setTimeout(() => {
      axios
        .get("/test")
        .then((res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
          });
          Toast.fire({
            icon: "success",
            title: "Le mot est: " + res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }
}
