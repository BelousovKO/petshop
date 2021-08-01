export class Box {
  constructor() {
  }

  sumTotalPrice = 0;
  boxCount = 0;
  itemInBox = [];
  inBoxLS = {};

  synchronizationBox(infoCards) {
    const rowItems = document.querySelectorAll('.row-items');
    const mainBox = document.querySelector('.main-box');
    const totalPrice = document.querySelector('.total-price');
    const boxInfo = document.querySelectorAll('.box-info');
    const sumIconBox = document.querySelector('.sum-icon-box');
    totalPrice.textContent = '';
    this.boxCount = 1;
    if (localStorage.getItem('inBox')) {
      rowItems.forEach((elem, idx) => {
        if (idx !== 0) mainBox.removeChild(mainBox.lastChild);
      });
      this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
      for (let item in this.inBoxLS) {
        this.sumTotalPrice = 0;
        const templateBox = document.querySelector('.row-items');
        const itemBox = templateBox.cloneNode(true);
        document.querySelector('.collections-row-items').style.display = 'block';
        templateBox.style.display = "none";
        itemBox.style.display = 'block';
        itemBox.dataset.idcards = item;
        itemBox.querySelector('.photo-pet-box').src = infoCards[+item].img;
        itemBox.querySelector('.breed-box').textContent = infoCards[+item].breed;
        itemBox.querySelector('.price-box').textContent = this.inBoxLS[item] * infoCards[+item].price;
        itemBox.querySelector('.del-item').dataset.idcards = infoCards[+item].id;
        itemBox.querySelector('.quantity-breed').dataset.idcards = infoCards[+item].id;
        itemBox.querySelector('.quantity-breed').textContent = this.inBoxLS[item];
        itemBox.querySelector('.invisible-price').dataset.idcards = infoCards[+item].id;
        itemBox.querySelector('.plus').dataset.idcards = infoCards[+item].id;
        itemBox.querySelector('.minus').dataset.idcards = infoCards[+item].id;
        totalPrice.textContent = +totalPrice.textContent + infoCards[+item].price * this.inBoxLS[item];
        this.boxCount = Object.values(this.inBoxLS).reduce((acc, elem) => acc + +elem, 0);
        boxInfo.forEach(elem => elem.textContent = `Корзина(${this.boxCount})`);
        document.querySelector('.main-box').appendChild(itemBox);
      }
      totalPrice.textContent += ` ₽`;
      sumIconBox.textContent = `на сумму ${totalPrice.textContent}`;
      sumIconBox.style.display = 'block';
      console.log(sumIconBox);
      document.querySelector('.h1-box').textContent = 'Ваша карзина';
    } else {
      document.querySelector('.h1-box').textContent = 'Ваша карзина пуста';
      rowItems.forEach((elem, idx) => {
        if (idx !== 0) mainBox.removeChild(mainBox.lastChild);
      });
      document.querySelector('.collections-row-items').style.display = 'none';
    }
    const delItem = document.querySelectorAll('.del-item');
    delItem.forEach(elem => {
      elem.addEventListener('click', () => {
        delete this.inBoxLS[elem.dataset.idcards];
        if (Object.keys(this.inBoxLS).length) {
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          localStorage.removeItem('inBox');
          boxInfo.forEach(elem => elem.textContent = `Корзина`);
          sumIconBox.style.display = 'none';
        }
        this.synchronizationBox(infoCards);
        this.boxCount = Object.values(this.inBoxLS).reduce((acc, elem) => acc + +elem, 0);
        if(this.boxCount === 0) {
          boxInfo.forEach(elem => elem.textContent = `Корзина`);
        } else {
          boxInfo.forEach(elem => elem.textContent = `Корзина(${this.boxCount})`);
        }
      })
    });
    const allPlus = document.querySelectorAll('.plus');
    allPlus.forEach(plus => {
      plus.addEventListener('click', () => {
        this.inBoxLS[plus.dataset.idcards] += 1;
        localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        this.synchronizationBox(infoCards);
      })
    });
    const allMinus = document.querySelectorAll('.minus');
    allMinus.forEach(minus => {
      minus.addEventListener('click', () => {
        this.inBoxLS[minus.dataset.idcards] -= 1;
        if (this.inBoxLS[minus.dataset.idcards] === 0) {
          delete this.inBoxLS[minus.dataset.idcards];
        }
        if (Object.keys(this.inBoxLS).length === 0) {
          localStorage.removeItem('inBox');
          sumIconBox.style.display = 'none';
          boxInfo.forEach(elem => elem.textContent = `Корзина`);
        } else {
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        }
        this.synchronizationBox(infoCards);
      });
    });
  }
}