const toggles = document.querySelectorAll('.toggle'),
  good = document.querySelector('#good'),
  cheap = document.querySelector('#cheap'),
  fast = document.querySelector('#fast');

toggles.forEach((toggle) => {
  toggle.addEventListener('change', (e) => qualityCheck(e.target));
});

function qualityCheck(clicked) {
  if (good.checked && cheap.checked && fast.checked) {
    if (good === clicked) {
      fast.checked = false;
    }
    if (cheap === clicked) {
      good.checked = false;
    }
    if (fast === clicked) {
      cheap.checked = false;
    }
  }
}
