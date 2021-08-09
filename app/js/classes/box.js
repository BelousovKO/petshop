export class Box {

  buttonsBox = document.querySelector('.button-basket');
  shadowModalBox = document.querySelector('.shadow-box');
  modalBox = document.querySelector('.section-box');
  buttonExitBox = document.querySelector('.exit-box');
  boxInfo = document.querySelectorAll('.box-info');
  modalTotalPrice = document.querySelector('.sum-icon-box');
  titleBox = document.querySelector('.title-box');
  boxContents = document.querySelector('.collections-row-items');
  buttonDellAllItemInBox = document.querySelector('.del-all-container');
  sumTotalPriceInBox = document.querySelector('.total-price-in-box');
  countInBox = document.querySelector('.count-in-box');
  checkAll = document.querySelector('.check-all');
  sumTotalPrice = 0;
  boxCount = 0;
  itemInBox = [];
  inBoxLS = {};


  addListenerModalBasket() {
    this.buttonsBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'block';
      this.modalBox.style.display = 'block';
    });
    this.shadowModalBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'none';
      this.modalBox.style.display = 'none';
    });
    this.buttonExitBox.addEventListener('click', () => {
      this.shadowModalBox.style.display = 'none';
      this.modalBox.style.display = 'none';
    })
  }

  addListenerButtonsInBox(infoCards) {
    const ButtonsInBox = document.querySelectorAll('.inBox');
    ButtonsInBox.forEach(button => {
      button.addEventListener('click', () => {
        if (localStorage.getItem('inBox')) {
          this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
          this.inBoxLS[button.dataset.idcards] ?
            this.inBoxLS[button.dataset.idcards] += 1 :
            this.inBoxLS[button.dataset.idcards] = 1;
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          this.inBoxLS = {};
          this.inBoxLS[button.dataset.idcards] = 1;
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        }
        this.calculatingBoxCounter(infoCards);
      })
    })
  }

  addListenerDelAllItemInBox() {
    this.buttonDellAllItemInBox.addEventListener('click', () => {
      localStorage.removeItem("inBox");
      this.calculatingBoxCounter();
    });
    this.checkAll.checked = false;
  }

  calculatingBoxCounter(infoCards) {
    this.boxCount = 0;
    if (localStorage.getItem('inBox')) {
      this.inBoxLS = JSON.parse(localStorage.getItem('inBox'));
      for (let elem in this.inBoxLS) {
        this.boxCount += this.inBoxLS[elem];
      }
      this.boxInfo.forEach(elem => elem.textContent = `Корзина(${this.boxCount})`)
    } else {
      this.boxCount = 0;
      this.boxInfo.forEach(elem => elem.textContent = 'Корзина')
    }
    this.calculatingTotalPrice(infoCards);
  }

  calculatingTotalPrice(infoCards) {
    this.sumTotalPrice = 0;
    if (localStorage.getItem('inBox')) {
      for (let elem in this.inBoxLS) {
        this.sumTotalPrice += infoCards[elem].price * this.inBoxLS[elem];
      }
      this.modalTotalPrice.textContent = `на сумму ${this.sumTotalPrice} ₽`
      this.modalTotalPrice.style.display = 'block';
    } else {
      this.modalTotalPrice.style.display = 'none';
    }
    this.fillingModalBasket(infoCards);
  }

  fillingModalBasket(infoCards) {
    document.querySelector('.container-items-in-box').innerHTML = '';
    if (localStorage.getItem('inBox')) {
      this.titleBox.textContent = 'Ваша корзина';
      this.boxContents.style.display = 'block';
      this.countInBox.textContent = `${this.boxCount} `;
      this.sumTotalPriceInBox.textContent = `${this.sumTotalPrice} ₽`;
      for (let elem in this.inBoxLS) {
        const template = document.querySelector('.template-item-in-box').cloneNode(true);
        template.content.querySelector('.photo-pet-box').src = infoCards[elem].img;
        template.content.querySelector('.quantity-breed').textContent = this.inBoxLS[elem];
        template.content.querySelector('.price-box').textContent =
          `${this.inBoxLS[elem] * infoCards[elem].price} ₽`;
        template.content.querySelector('.minus').dataset.idcards = infoCards[elem].id;
        template.content.querySelector('.plus').dataset.idcards = infoCards[elem].id;
        template.content.querySelector('.del-item').dataset.idcards = infoCards[elem].id;
        template.content.querySelector('.checkbox-item-in-box').dataset.idcards = infoCards[elem].id;
        document.querySelector('.container-items-in-box').appendChild(template.content);
      }
    } else {
      this.titleBox.textContent = 'Ваша корзина пуста';
      this.boxContents.style.display = 'none';
    }
    this.dellItemInBox(infoCards);
    this.plusCountItemInBox(infoCards);
    this.minusCountItemInBox(infoCards);
    this.checkedAllInBox();
  }

  dellItemInBox(infoCards) {
    const drlItemsInBox = document.querySelectorAll('.del-item');
    drlItemsInBox.forEach(delItem => {
      delItem.addEventListener('click', () => {
        delete this.inBoxLS[delItem.dataset.idcards];
        if (Object.keys(this.inBoxLS).length) {
          localStorage.removeItem('inBox');
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          localStorage.removeItem('inBox');
        }
        this.calculatingBoxCounter(infoCards);
      });
    });
    this.checkAll.checked = false;
  }

  plusCountItemInBox(infoCards) {
    const plusItems = document.querySelectorAll('.plus');
    plusItems.forEach(plus => {
      plus.addEventListener('click', () => {
        this.inBoxLS[plus.dataset.idcards] += 1;
        localStorage.removeItem('inBox');
        localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        this.calculatingBoxCounter(infoCards);
      });
    });
    this.checkAll.checked = false;
  }

  minusCountItemInBox(infoCards) {
    const minusItems = document.querySelectorAll('.minus');
    minusItems.forEach(minus => {
      minus.addEventListener('click', () => {
        this.inBoxLS[minus.dataset.idcards] -= 1;
        if (this.inBoxLS[minus.dataset.idcards]) {
          localStorage.removeItem('inBox');
          localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
        } else {
          delete this.inBoxLS[minus.dataset.idcards];
          if(Object.keys(this.inBoxLS).length) {
            localStorage.removeItem('inBox');
            localStorage.setItem('inBox', JSON.stringify(this.inBoxLS));
          } else {
            localStorage.removeItem('inBox');
          }
        }
        this.calculatingBoxCounter(infoCards);
      });
    });
    this.checkAll.checked = false;
  }

  checkedAllInBox() {
    const checkboxItems = document.querySelectorAll('.checkbox-item-in-box');
    this.checkAll.addEventListener('change', () => {
      console.log('this.checkAll.checked', this.checkAll.checked);
      if(this.checkAll.checked) {
        checkboxItems.forEach(checkbox => checkbox.checked = true)
      }
    });
    checkboxItems.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        if(!checkbox.checked) this.checkAll.checked = false;
      });
    });
  }
}
