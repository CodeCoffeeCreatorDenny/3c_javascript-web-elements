const sounds = [
  'boom',
  'clap',
  'hihat',
  'kick',
  'openhat',
  'ride',
  'snare',
  'tink',
  'tom',
];

sounds.forEach((sound) => {
  const btn = document.createElement('button');
  btn.classList.add('btn');

  btn.innerText = sound;

  btn.addEventListener('click', () => {
    stopSounds();

    document.getElementById(sound).play();
  });

  document.getElementById('buttons').appendChild(btn);
});

function stopSounds() {
  sounds.forEach((sound) => {
    const song = document.getElementById(sound);

    song.pause();
    song.currentTime = 0;
  });
}

window.addEventListener('keyup', (e) => {
  try {
    keyupChecker(e.key);
  } catch (e) {
    console.log(e);
  }

  function keyupChecker(key) {
    stopSounds();
    document.getElementById(`${sounds[key - 1]}`).play();
  }
});
