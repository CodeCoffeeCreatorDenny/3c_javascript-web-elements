const header = document.getElementById('header'),
  title = document.getElementById('title'),
  excerpt = document.getElementById('excerpt'),
  profile_img = document.getElementById('profile_img'),
  username = document.getElementById('name'),
  date = document.getElementById('date'),
  animated_bgs = document.querySelectorAll('.animated-bg'),
  animated_bg_texts = document.querySelectorAll('.animated-bg-text'),
  unsplashURL = 'https://source.unsplash.com/random/';

function getRandomSize() {
  return `${getRandomNr()}x${getRandomNr()}`;
}

function getRandomNr() {
  return Math.floor(Math.random() * 10) + 300;
}

setTimeout(getData, 2500);

function getData() {
  header.innerHTML = `<img src="${unsplashURL}${getRandomSize()}" alt="" />`;
  title.innerHTML = 'Lorem ipsum dolor sit amet';
  excerpt.innerHTML =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis';
  profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/men/${
    getRandomNr() - 300
  }.jpg" alt="" />`;
  username.innerHTML = 'Denny Pearce';
  date.innerHTML = 'Apr 19, 2021';

  animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'));
  animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'));
}
