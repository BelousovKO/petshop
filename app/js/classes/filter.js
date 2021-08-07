export class Filter {
  constructor() {
  }

  filterForm = document.querySelector('.filter-form');
  catalogItemList = document.querySelector('.product-section');
  checkboxesFilter = this.filterForm.querySelectorAll('.checkbox');
  allCheckboxLabel = document.querySelectorAll('.label-container');
  modalFilter = document.createElement("div");
  buttonFilter = document.createElement("span");
  resultFiltrationCards = {}

  addListenerFilterCheckbox(infoCards) {
    this.checkboxesFilter.forEach((checkbox, idx) => {
      checkbox.addEventListener('change', () => {
        this.filtrationCards(infoCards);
        this.showFilteredCards();
        this.showFilteredButton(idx);
      })
    })
  }

  showFilteredButton(idx) {
    this.modalFilter.style.display = 'none';
    console.log(this.allCheckboxLabel[idx])
    this.allCheckboxLabel[idx].appendChild(this.modalFilter);
    setTimeout(() => {
      this.modalFilter.style.display = 'block';
    }, 600);
  };

  filtrationCards(infoCards) {
    this.resultFiltrationCards = JSON.parse(JSON.stringify(infoCards));
    this.checkboxesFilter.forEach(checkbox => {
      if (checkbox.checked) {
        this.resultFiltrationCards = this.resultFiltrationCards.filter(card => card[checkbox.id])
      }
    });
    this.resultFiltrationCards.sort(() => Math.random() - 0.5);
    console.log('resultFiltrationCards', this.resultFiltrationCards);
  }

  addCardsToCatalog() {
    this.catalogItemList.innerHTML = '';
    this.resultFiltrationCards.forEach(card => {
      const template = document.querySelector('.template-item-catalog').cloneNode(true);
      template.content.querySelector('a').href = `card.html?id=${card.id}`;
      template.content.querySelector('img').src = card.img;
      template.content.querySelector('.breed').textContent = card.breed;
      template.content.querySelector('.price').textContent = `${card.price}₽`;
      template.content.querySelector('.inBox').dataset.idcards = card.id;
      document.querySelector('.product-section').appendChild(template.content);
    })
  }

  showFilteredCards() {
    this.modalFilter.classList.add('menuFilter');
    this.buttonFilter.classList.add('buttonFilter');
    this.buttonFilter.textContent = 'Показать';
    this.modalFilter.textContent = `Найдено совпадений: ${this.resultFiltrationCards.length} `;
    this.modalFilter.appendChild(this.buttonFilter);
  }
}