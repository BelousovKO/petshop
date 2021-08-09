import {Box} from "../js/classes/box.js";

const box = new Box();

const DiseasesRequest = new XMLHttpRequest();

let diagnosesList

DiseasesRequest.onload = function (e) {
  init();
};

DiseasesRequest.open("GET", "http://localhost:3000/api/directoryDiseases.json", true);
DiseasesRequest.send();


function init() {


  const xhr = new XMLHttpRequest();

  xhr.onload = function (e) {
    init1();
  };

  xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
  xhr.send();

  function init1() {

    diagnosesList = JSON.parse(DiseasesRequest.responseText);

    const infoCards = JSON.parse(xhr.responseText);
    const id = new URL(window.location.href).searchParams.get('id');
    const buttonMobileMenu = document.querySelector('.inCatalog-mobile');
    const exitMobileMenu = document.querySelector('.out-mobile-menu');
    const buttonMobileBox = document.querySelector('.button-in-box');
    const mobileMenu = document.querySelector('.mobile-menu');
    const sectionBox = document.querySelector('.section-box');
    const shadowBox = document.querySelector('.shadow-box');

    document.querySelector('h2').textContent = infoCards[id].breed;
    document.querySelector('.img-pet').src = infoCards[id].img;
    document.querySelector('#typePet').textContent = addTypesPet();
    document.querySelector('#sizePet').textContent = addSizePet();
    document.querySelector('#subtypes').textContent = addSubtypes();
    document.querySelector('#illness').textContent = addDiagnoses();
    document.querySelector('#intelligence').textContent = infoCards[id].intelligence;
    document.querySelector('.price').textContent = `${infoCards[id].price} ₽`;
    document.querySelector('.inBox').dataset.idcards = id;

    box.addListenerModalBasket();
    box.addListenerButtonsInBox(infoCards)
    box.calculatingBoxCounter(infoCards);
    box.addListenerDelAllItemInBox();

    function addTypesPet() {
      let res = '';
      infoCards[id].hunter ? res = res.concat('охотничьи, ') : '';
      infoCards[id].companion ? res = res.concat('компаньёны, ') : '';
      infoCards[id].decorative ? res = res.concat('декоративные, ') : '';
      infoCards[id].service ? res = res.concat('служебные, ') : '';
      res = res.slice(0, 1).toUpperCase() + res.slice(1, res.length - 2);
      return res;
    }

    function addSizePet() {
      let res = '';
      infoCards[id].size === 1 ? res = 'Маленькая (до 11кг)' : '';
      infoCards[id].size === 2 ? res = 'Средняя (11-25кг)' : '';
      infoCards[id].size === 3 ? res = 'Большая (25-50кг)' : '';
      infoCards[id].size === 4 ? res = 'Огромная (больше 50кг)' : '';
      return res;
    }

    function addSubtypes() {
      let res = '';
      infoCards[id].noFear ? res = res.concat('отсутствует чувство страха, ') : '';
      infoCards[id].barksALittle ? res = res.concat('мало лают, ') : '';
      infoCards[id].excellentHealth ? res = res.concat('отличное здоровье, ') : '';
      infoCards[id].goodObedience ? res = res.concat('хорошее послушание, ') : '';
      infoCards[id].veryDevoted ? res = res.concat('очень преданные, ') : '';
      res = res.slice(0, 1).toUpperCase() + res.slice(1, res.length - 2);
      return res;
    }

    function addDiagnoses() {
      let res = '';
      infoCards[id].frequentIllnesses.forEach(Illness => {
        res = res.concat(`${diagnosesList[Illness]}, `)
      });
      res = res.slice(0, 1).toUpperCase() + res.slice(1, res.length - 2);
      return res;
    }

    buttonMobileMenu.addEventListener('click', () => {
      mobileMenu.style.display = 'block';
      buttonMobileMenu.style.display = 'none';
      exitMobileMenu.style.display = 'block';
    });

    exitMobileMenu.addEventListener('click', () => {
      exitMobileMenu.style.display = 'none';
      buttonMobileMenu.style.display = 'block';
      mobileMenu.style.display = 'none';
    });

    buttonMobileBox.addEventListener('click', () => {
      exitMobileMenu.style.display = 'none';
      buttonMobileMenu.style.display = 'block';
      mobileMenu.style.display = 'none';
      sectionBox.style.display = "block";
      shadowBox.style.display = "block";
    })
  }
}
