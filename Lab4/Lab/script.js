///////////////////////////////////////////////////////

// Selecting Element
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const country = document.querySelector(".country");
const options = document.querySelectorAll(".selector option");
const groupForm = document.querySelectorAll(".group-form");
const btn = document.querySelector(".btn");

///////////////////////////////////////////////////////

// Data Translate
const eng = ["Firstname : ", "Lastname : ", "Country : ", "change To Thai"];
const thai = [
  firstName.firstChild.nodeValue,
  lastName.firstChild.nodeValue,
  country.firstChild.nodeValue,
  btn.firstChild.nodeValue,
];
const elements = [firstName, lastName, country, btn];
const thaiOption = [];
const engOption = [];
let state = "thai";

///////////////////////////////////////////////////////

// Process Translate
const addLanguageTOList = function () {
  options.forEach((o, index) => {
    thaiOption[index] = o.firstChild.nodeValue;
    engOption[index] = o.value;
  });
};

const replaceNewNode = function (elements, language) {
  elements.forEach((e, index) => {
    const oldNode = e.firstChild;
    const newNode = document.createTextNode(language[index]);
    e.replaceChild(newNode, oldNode);
  });
};

const translate = function () {
  if (state === "thai") {
    // translate all (except options)
    replaceNewNode(elements, eng);

    // translate options
    replaceNewNode(options, engOption);

    // Change State
    state = "eng";
    return;
  }

  if (state === "eng") {
    // translate all (except options)
    replaceNewNode(elements, thai);

    // translate options
    replaceNewNode(options, thaiOption);

    // Change State
    state = "thai";
    return;
  }
};

///////////////////////////////////////////////////////

// Intitial

const intitial = function () {
  addLanguageTOList();
};

intitial();

///////////////////////////////////////////////////////

// addeventlisner
btn.addEventListener("click", translate);

///////////////////////////////////////////////////////
