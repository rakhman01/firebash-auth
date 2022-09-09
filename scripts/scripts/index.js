const loginLink = document.querySelectorAll(".logged-in");
const logoutLink = document.querySelectorAll(".logged-out");
const accountDetails = document.querySelector(".account-details");

// consition navbar menu
const setupUi = (user) => {
  if (user) {
    loginLink.forEach((val) => (val.style.display = "block"));

    logoutLink.forEach((val) => (val.style.display = "none"));
  } else {
    loginLink.forEach((val) => (val.style.display = "none"));

    logoutLink.forEach((val) => (val.style.display = "block"));
  }
};

// modal

document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");

  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

// guideslist

const guidesList = document.querySelector(".guides");

const setUpGuides = (data) => {
  if (data.length) {
    let html = "";

    data.forEach((val) => {
      const guide = val.data();
      const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${guide.title}</div>
    <div class="collapsible-body white">${guide.descriptions}</div>
    </li>
    `;
      html += li;
    });

    guidesList.innerHTML = html;
  } else {
    guidesList.innerHTML = `<h5 class="center-align" >SignIn to view Guides</h5>`;
  }
};
