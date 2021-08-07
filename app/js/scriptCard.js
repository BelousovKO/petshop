









// const DiseasesRequest = new XMLHttpRequest();
//
// let diseases
//
// DiseasesRequest.onload = function (e) {
//   diseases = JSON.parse(DiseasesRequest.responseText);
// };
//
// DiseasesRequest.open("GET", "http://localhost:3000/api/directoryDiseases.json", true);
// DiseasesRequest.send();
//
// const xhr = new XMLHttpRequest();
//
// xhr.onload = function (e) {
//   setTimeout(init, 0);
// };
//
// xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
// xhr.send();
//
// function init() {
//
//   const infoCards = JSON.parse(xhr.responseText);
//   const id = new URL(window.location.href).searchParams.get('id');
//   const parentItem = document.querySelector('.main');
//   const typePet = parentItem.querySelector('#typePet');
//   const sizePet = parentItem.querySelector('#sizePet');
//   const subtypes = parentItem.querySelector('#subtypes');
//   const intelligence = parentItem.querySelector('#intelligence');
//   const price = document.querySelector('.price');
//   const illness = parentItem.querySelector('#illness');
//   const inMobileMenu = document.querySelector('.inCatalog-mobile');
//   const mobileMenu = document.querySelector('.mobile-menu');
//   const closeMobileMenu = document.querySelector('.out-mobile-menu');
//   const buttonInBox = document.querySelector('.button-in-box');
//   const boxModal = document.querySelector('.section-box');
//
//   infoCards.forEach(itemCard => {
//     if (Number(id) === Number(itemCard.id)) {
//       parentItem.querySelector('h1').textContent = itemCard.breed;
//       parentItem.querySelector('img').src = `../${itemCard.img}`;
//       parentItem.querySelector('h2').textContent = `Характеристика ${itemCard.breed}`;
//       parentItem.querySelector('.inBox').dataset.idcards = id;
//
//       if (itemCard.hunter) {
//         typePet.textContent = `Охотничьи`;
//       } else {
//         typePet.textContent = ''
//       }
//       if (itemCard.companion) {
//         typePet.textContent = `${typePet.textContent} Компаньоны`
//       }
//       if (itemCard.decorative) {
//         typePet.textContent = `${typePet.textContent} Декоративные`
//       }
//       if (itemCard.service) {
//         typePet.textContent = `${typePet.textContent} Служебные`
//       }
//
//       if (itemCard.size === 1) {
//         sizePet.textContent = `Маленькая (меньше 11кг)`
//       }
//       if (itemCard.size === 2) {
//         sizePet.textContent = 'Средняя (11-25кг)';
//       }
//       if (itemCard.size === 3) {
//         sizePet.textContent = 'Большая (25-100кг)';
//       }
//       if (itemCard.size === 4) {
//         sizePet.textContent = "Огромная (больше 100кг)";
//       }
//
//       if (itemCard.noFear) {
//         subtypes.textContent = `Отсутствует чуство страха`
//       }
//       if (itemCard.shedsLittle) {
//         subtypes.textContent = `${subtypes.textContent} Мало линяет`
//       }
//       if (itemCard.goodObedience) {
//         subtypes.textContent = `${subtypes.textContent} Хорошее послушание`
//       }
//       if (itemCard.veryDevoted) {
//         subtypes.textContent = `${subtypes.textContent} Очень преданная`
//       }
//
//       intelligence.textContent = itemCard.intelligence;
//
//       price.textContent = itemCard.price;
//
//       illness.textContent = '';
//       for (let i = 0; i < infoCards[id].frequentIllnesses.length; i++) {
//         illness.textContent = illness.textContent + " " + diseases[infoCards[id].frequentIllnesses[i]];
//       }
//     }
//   });
//
//   inMobileMenu.addEventListener('click', () => {
//     mobileMenu.style.display = 'block';
//     inMobileMenu.style.display = 'none';
//     closeMobileMenu.style.display = 'block';
//   });
//
//   closeMobileMenu.addEventListener('click', () => {
//     mobileMenu.style.display = 'none';
//     inMobileMenu.style.display = 'block';
//     closeMobileMenu.style.display = 'none';
//   })
//
//   buttonInBox.addEventListener('click', () => {
//     boxModal.style.display = 'block';
//     mobileMenu.style.display = 'none';
//     inMobileMenu.style.display = 'block';
//     closeMobileMenu.style.display = 'none';
//   })
// }