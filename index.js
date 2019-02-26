

document.addEventListener("DOMContentLoaded", init);

function init() {

  //variables

  let pageNum = 1;


  //functions

  function getData(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(json => renderMonsters(json));
  }

  function reloadPage() {
    pageNum = 1;
    getData(pageNum);
  }

  function postData(jsonData) {
    fetch('http://localhost:3000/monsters', {
    method: 'POST',
    body: JSON.stringify(jsonData),
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    }
    }).then(() => reloadPage());
  }

  function renderMonsters(data) {
    mainDiv.innerHTML = '';
    data.forEach(monster => {
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      h2.innerText = `${monster.name}`;
      const h4 = document.createElement('h4');
      h4.innerText = `Age: ${monster.age}`;
      const p = document.createElement('p');
      p.innerText = `Bio: ${monster.description}`;
      mainDiv.appendChild(div);
      div.appendChild(h2);
      div.appendChild(h4);
      div.appendChild(p);
    });
  }

  function clickBack() {
    if (pageNum !== 1) {
      --pageNum;
    }
    getData(pageNum);
  }

  function clickForward() {
    ++pageNum;
    getData(pageNum);
  }

  function submitForm(e) {
    e.preventDefault();
    data = {name: nameInput.value, age: parseInt(ageInput.value), description: descriptionInput.value};
    postData(data);
  }

  //selectors
  const backButton = document.getElementById('back');
  const forwardButton = document.getElementById('forward');
  const mainDiv = document.getElementById('monster-container');
  const monsterFormDiv = document.getElementById('create-monster');

  //define monster form
  function createMonsterForm() {
    const monsterForm = document.createElement('form');
    monsterForm.id = 'monster-form';
    const nameInput = document.createElement("input");
    nameInput.id = 'name';
    nameInput.placeholder = 'name...';
    const ageInput = document.createElement("input");
    ageInput.id = 'age';
    ageInput.placeholder = 'age...';
    const descriptionInput = document.createElement("input");
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'description...';
    const createButton = document.createElement("button");
    createButton.id = 'button';
    createButton.innerText = 'Create';
    monsterFormDiv.appendChild(monsterForm);
    monsterForm.appendChild(nameInput);
    monsterForm.appendChild(ageInput);
    monsterForm.appendChild(descriptionInput);
    monsterForm.appendChild(createButton);
  }
  //create monster form
  createMonsterForm();

  //form selectors
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const descriptionInput = document.getElementById('description');
  const createButton = document.getElementById('button');

  //listeners
  backButton.addEventListener('click', clickBack);
  forwardButton.addEventListener('click', clickForward);
  createButton.addEventListener('click', submitForm);


  //initial loading
  getData(pageNum);




}
