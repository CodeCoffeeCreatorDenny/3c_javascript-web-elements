const jokeEl = document.getElementById('joke'),
  jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke);

// generateJoke();

async function generateJoke() {
  const res = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await res.json();

  jokeEl.innerHTML = data.joke;
}
