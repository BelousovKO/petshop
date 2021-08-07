import {Box} from "../js/classes/box.js";

const xhr = new XMLHttpRequest();

xhr.onload = function () {
  initOnload();
};

xhr.open("GET", "http://localhost:3000/api/dataCards.json", true);
xhr.send();

export function initOnload() {

}












// export const box = new Box();
// const buttonBox = document.querySelector('.button-basket');
// const sectionBox = document.querySelector('.section-box');
// const shadowBox = document.querySelector('.shadow-box');
// const exitBox = document.querySelector('.exit-box');
// const buttonDelAll = document.querySelector('.button-del-all');
// const iconBox = document.querySelector('.iconBox');
// const boxInfo = document.querySelectorAll('.box-info');
// const sumIconBox = document.querySelector('.sum-icon-box');
// let inBoxLS;
//
// export function initOnload() {
//
//   const infoCards = JSON.parse(xhr.responseText);
//   const addEventsButtonInBox = () => {
//     const buttonInBox = document.querySelectorAll('.inBox');
//     buttonInBox.forEach(button => button.addEventListener('click', () => {
//       if(localStorage.getItem('inBox')) {
//         inBoxLS = JSON.parse(localStorage.getItem('inBox'));
//         if(button.dataset.idcards in inBoxLS) {
//           inBoxLS[button.dataset.idcards] += 1;
//         } else {
//           inBoxLS[button.dataset.idcards] = 1;
//         }
//         localStorage.setItem('inBox', JSON.stringify(inBoxLS));
//       } else {
//         inBoxLS = {[button.dataset.idcards]: 1}
//         localStorage.setItem('inBox', JSON.stringify(inBoxLS));
//       }
//       iconBox.style.transform = "scale(1.3)";
//       iconBox.style.borderRadius = '50%';
//       iconBox.style.backgroundColor = "#FBBA3C";
//       setTimeout(() => {
//         iconBox.style.transform = "scale(1)";
//         iconBox.style.backgroundColor = "white";
//         iconBox.style.borderRadius = '0';
//       }, 300);
//       boxInfo.forEach(elem => elem.textContent = `Корзина (${box.boxCount})`);
//       box.synchronizationBox(infoCards);
//     }));
//   }
//
//   setTimeout(addEventsButtonInBox, 1000);
//   box.synchronizationBox(infoCards);
// }
//
// buttonBox.addEventListener('click', () => {
//   closeAndOpenBox();
// });
//
// exitBox.addEventListener('click', () => {
//   closeAndOpenBox();
// });
//
// const closeAndOpenBox = () => {
//   if (sectionBox.style.display === "block") {
//     sectionBox.style.display = "none";
//     shadowBox.style.display = "none";
//   } else {
//     sectionBox.style.display = "block";
//     shadowBox.style.display = "block";
//   }
// };
//
// buttonDelAll.addEventListener('click', () => {
//   localStorage.removeItem('inBox');
//   box.boxCount = 0;
//   boxInfo.forEach(elem => elem.textContent = `Корзина`);
//   sumIconBox.style.display = 'none';
//   box.synchronizationBox();
// });


