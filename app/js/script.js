import { Filter } from '../js/classes/filter.js'

const filter = new Filter();
const xhr = new XMLHttpRequest();

xhr.onload = function () {
  initOnload();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

function initOnload() {

  const infoCards = JSON.parse(xhr.responseText);
  filter.filtrationCards(infoCards)
  filter.addListenerFilterCheckbox(infoCards);
  filter.addCardsToCatalog();
}


// import * as boxScript from './boxScript.js';
//
// const xhr = new XMLHttpRequest();
//
// xhr.onload = function () {
//     initOnload();
// };
//
// xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
// xhr.send();
//
// function initOnload() {
//
//     const infoCards = JSON.parse(xhr.responseText);
//     const parentItem = document.querySelector('.product-section');
//     const menuFilter = document.createElement("div");
//     const buttonFilter = document.createElement("span");
//     const allCheckboxLabel = document.querySelectorAll('.label');
//     const hunterCheckbox = document.querySelector("#hunter");
//     const companionCheckbox = document.querySelector("#companion");
//     const decorativeCheckbox = document.querySelector("#decorative");
//     const serviceCheckbox = document.querySelector("#service");
//     const noFearCheckbox = document.querySelector("#noFear");
//     const shedsLittleCheckbox = document.querySelector("#shedsLittle");
//     const excellentHealthCheckbox = document.querySelector("#excellentHealth");
//     const goodObedienceCheckbox = document.querySelector("#goodObedience");
//     const veryDevotedCheckbox = document.querySelector("#veryDevoted");
//     const template = document.querySelector('.product-list__item');
//     let filterCount = 0;
//     let filter = {};
//     let resultFilter = [];
//
//     menuFilter.classList.add('menuFilter');
//     buttonFilter.classList.add('buttonFilter');
//     buttonFilter.textContent = 'Показать';
//     filter.hunter = hunterCheckbox.checked;
//     filter.companion = companionCheckbox.checked;
//     filter.decorative = decorativeCheckbox.checked;
//     filter.service = serviceCheckbox.checked;
//     filter.noFear = noFearCheckbox.checked;
//     filter.shedsLittle = shedsLittleCheckbox.checked;
//     filter.excellentHealth = excellentHealthCheckbox.checked;
//     filter.goodObedience = goodObedienceCheckbox.checked;
//     filter.veryDevoted = veryDevotedCheckbox.checked;
//     filterCards();
//
//     parentItem.textContent = '';
//
//     const randomSortCards = resultFilter.sort(function () {
//         return Math.random() - 0.5;
//     });
//
//     const fragment = document.createDocumentFragment();
//     randomSortCards.forEach((resultFilter) => {
//         const item = template.cloneNode(true);
//         item.querySelector('a').href = `card.html?id=${resultFilter.id}`;
//         item.querySelector('img').src = resultFilter.img;
//         item.querySelector('.breed').textContent = resultFilter.breed;
//         item.querySelector('.price').textContent = `${resultFilter.price}₽`;
//         item.querySelector('.inBox').dataset.idcards = resultFilter.id;
//
//         fragment.appendChild(item);
//         item.style.display = "block";
//         document.querySelector('.product-section').appendChild(fragment);
//     });
//
//     template.style.display = "none";
//     menuFilter.style.display = "none";
//
//
//     function init() {
//
//         hunterCheckbox.addEventListener('change', (event) => {
//             filter.hunter = !!event.target.checked;
//             filterCards();
//         })
//
//         companionCheckbox.addEventListener('change', (event) => {
//             filter.companion = !!event.target.checked;
//             filterCards();
//         })
//
//         decorativeCheckbox.addEventListener('change', (event) => {
//             filter.decorative = !!event.target.checked;
//             filterCards();
//         })
//
//         serviceCheckbox.addEventListener('change', (event) => {
//             filter.service = !!event.target.checked;
//             filterCards();
//         })
//
//         noFearCheckbox.addEventListener('change', (event) => {
//             filter.noFear = !!event.target.checked;
//             filterCards();
//         })
//
//         shedsLittleCheckbox.addEventListener('change', (event) => {
//             filter.shedsLittle = !!event.target.checked;
//             filterCards();
//         })
//
//         excellentHealthCheckbox.addEventListener('change', (event) => {
//             filter.excellentHealth = !!event.target.checked;
//             filterCards();
//         })
//
//         goodObedienceCheckbox.addEventListener('change', (event) => {
//             filter.goodObedience = !!event.target.checked;
//             console.log("хорошее послушание ", filter.goodObedience);
//             filterCards();
//         })
//
//         veryDevotedCheckbox.addEventListener('change', (event) => {
//             filter.veryDevoted = !!event.target.checked;
//             filterCards();
//         })
//
//         const handler1 = (event) => {
//             menuFilter.style.display = 'none';
//             event.path[2].appendChild(menuFilter);
//             setTimeout(() => {
//                 menuFilter.style.display = 'block';
//             }, 600);
//         };
//         allCheckboxLabel.forEach(elem => {
//                 elem.addEventListener('click', handler1);
//             }
//         )
//     }
//
//     init();
//
//     function filterCards() {
//         resultFilter = [];
//         infoCards.forEach((card) => {
//             if (filter.hunter && !card.hunter) {
//                 return;
//             }
//             if (filter.companion && !card.companion) {
//                 return;
//             }
//             if (filter.decorative && !card.decorative) {
//                 return;
//             }
//             if (filter.service && !card.service) {
//                 return;
//             }
//             if (filter.noFear && !card.noFear) {
//                 return;
//             }
//             if (filter.shedsLittle && !card.shedsLittle) {
//                 return;
//             }
//             if (filter.excellentHealth && !card.excellentHealth) {
//                 return;
//             }
//             if (filter.goodObedience && !card.goodObedience) {
//                 return;
//             }
//             if (filter.veryDevoted && !card.veryDevoted) {
//                 return;
//             }
//             resultFilter.push(card);
//         })
//         filterCount = resultFilter.length;
//         menuFilter.textContent = `Найдено совпадений: ${filterCount} `;
//         menuFilter.appendChild(buttonFilter);
//     }
//
//     menuFilter.addEventListener('click', (event) => {
//         let template = document.querySelector('.product-list__item');
//         parentItem.textContent = '';
//
//         const randomSortCards = resultFilter.sort(function () {
//             return Math.random() - 0.5;
//         });
//
//         const fragment = document.createDocumentFragment();
//         randomSortCards.forEach((resultFilter) => {
//             const item = template.cloneNode(true);
//             item.querySelector('a').href = `card.html?id=${resultFilter.id}`;
//             item.querySelector('img').src = resultFilter.img;
//             item.querySelector('.breed').textContent = resultFilter.breed;
//             item.querySelector('.price').textContent = `${resultFilter.price}₽`;
//             item.querySelector('.inBox').dataset.idcards = resultFilter.id;
//             fragment.appendChild(item);
//             item.style.display = "block";
//             document.querySelector('.product-section').appendChild(fragment);
//         });
//         template.style.display = "none";
//         menuFilter.style.display = "none";
//         boxScript.initOnload();
//     })
// }
//
