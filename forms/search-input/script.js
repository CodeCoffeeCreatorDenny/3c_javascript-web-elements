const search = document.querySelector('.search'),
  btn = document.querySelector('.btn'),
  input = document.querySelector('.input');

btn.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
});

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    search.classList.remove('active');
  }
});
