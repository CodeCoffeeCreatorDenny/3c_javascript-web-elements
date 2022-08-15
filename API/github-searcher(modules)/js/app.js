// init Github
const github = new Github();

// init UI module
const ui = new UI();

// init search input
const searchInput = document.getElementById('searchUser');

// add event listener
searchInput.addEventListener('keyup', (e) => {
  // get input text
  const userText = e.target.value;

  if (userText !== '') {
    ui.showLoader();

    github
      .getUserAsync(userText)
      .then((info) => {
        if (info.userData.message === 'Not Found') {
          // Show alert
          ui.showAlert(`User: ${userText} not found`, 'alert alert-danger');
          // Clear profile
          ui.clearProfile();
          ui.hideLoader();
        } else {
          ui.showProfile(info.userData);
          ui.showRepos(info.reposData);
          ui.clearAlert();
        }
      })
      .then(() => ui.hideLoader());
  } else {
    // Clear profile
    ui.clearProfile();
  }
});
