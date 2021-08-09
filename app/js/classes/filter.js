import { Box } from '../../js/classes/box.js';

export class Filter {

  box = new Box();

  filterForm = document.querySelector('.filter-form');
  checkboxesFilter = this.filterForm.querySelectorAll('.filter-checkbox');
  allCheckboxLabel = document.querySelectorAll('.label-container');
  buttonShowMore = document.querySelector('.show-more');
  modalFilter = document.createElement("div");
  buttonFilter = document.createElement("span");
  inputFilterFastSearch = document.querySelector('.fast-search')
  fastSearchWrapper = document.querySelector('.fast-search-wrapper');
  petSizeInputs = document.querySelectorAll('.pet-size-input');
  labelInputMinSize = document.querySelector('.label-input-min-size');
  clearFilter = document.querySelector('.a-filter-all');
  buttonBlockType = document.querySelector('.block-type');
  buttonBlockFeatures = document.querySelector('.block-features');
  buttonBlockSize = document.querySelector('.block-size');
  sectionFilterType = document.querySelector('.section-type');
  sectionFilterMainFeatures = document.querySelector('.section-main-features');
  sectionFilterSize = document.querySelector('.section-size');
  resultFiltrationCards = {};
  countCardsInCatalog = 8;
  searchSizes;

  addListenersFilter(infoCards) {
    this.checkboxesFilter.forEach((checkbox, idx) => {
      checkbox.addEventListener('change', () => {
        this.filtrationCards(infoCards);
        this.showFilteredCards();
        this.showFilteredButton(idx, infoCards);
      })
    })
  }

  addListenerFastSearch(infoCards) {
    this.inputFilterFastSearch.addEventListener('keyup', () => {
      this.callbackListener(infoCards);
      this.fastSearchWrapper.appendChild(this.modalFilter);
    });
  }

  addListenerSizeInputs(infoCards) {
    this.petSizeInputs.forEach(input => {
      input.addEventListener('input', () => {
        this.callbackListener(infoCards);
        this.labelInputMinSize.appendChild(this.modalFilter);
      })
    })
  }

  addListenerClearFilter(infoCards) {
    this.clearFilter.addEventListener('click', () => {
      this.modalFilter.style.display = 'none';
      this.inputFilterFastSearch.value = '';
      this.petSizeInputs[0].value = 1;
      this.petSizeInputs[1].value = 100;
      this.checkboxesFilter.forEach(checkbox => checkbox.checked = false);
      this.resultFiltrationCards = infoCards.sort(() => Math.random() - 0.5);
      this.addCardsToCatalog();
    });
  }

  callbackListener(infoCards) {
    this.filtrationCards(infoCards);
    this.showFilteredCards();
    this.modalFilter.style.display = 'none';
    setTimeout(() => {
      this.modalFilter.style.display = 'block';
    }, 600);
    this.addListenerModalFilter(infoCards);
  }

  showFilteredButton(idx, infoCards) {
    this.modalFilter.style.display = 'none';
    this.allCheckboxLabel[idx].appendChild(this.modalFilter);
    setTimeout(() => {
      this.modalFilter.style.display = 'block';
    }, 600);
    this.addListenerModalFilter(infoCards);
  }

  addListenerModalFilter(infoCards) {
    this.modalFilter.addEventListener('click', () => {
      this.countCardsInCatalog = 8;
      this.addCardsToCatalog(infoCards);
      this.modalFilter.style.display = 'none';
    })
  }

  filtrationCards(infoCards) {
    this.resultFiltrationCards = JSON.parse(JSON.stringify(infoCards));
    this.defineSearchSizes();
    this.checkboxesFilter.forEach(checkbox => {
      if (checkbox.checked) {
        this.resultFiltrationCards = this.resultFiltrationCards.filter(card => card[checkbox.id]);
      }
      this.resultFiltrationCards = this.resultFiltrationCards.filter(card => {
        return card.size >= this.searchSizes[0] && card.size <= this.searchSizes[1];
      });
    });
    if (this.inputFilterFastSearch.value) {
      this.resultFiltrationCards = this.resultFiltrationCards.filter(card => {
        return card.breed.toLowerCase().includes(this.inputFilterFastSearch.value.toLowerCase())
      });
    }
    this.resultFiltrationCards.sort(() => Math.random() - 0.5);
  }

  addCardsToCatalog(infoCards) {
    this.buttonShowMore.disabled = false;
    document.querySelector('.product-section').innerHTML = '';
    for (let i = 0; i < this.countCardsInCatalog; i++) {
      if (!this.resultFiltrationCards[i]) {
        this.buttonShowMore.disabled = true;
        break;
      }
      const template = document.querySelector('.template-item-catalog').cloneNode(true);
      template.content.querySelector('a').href = `card.html?id=${this.resultFiltrationCards[i].id}`;
      template.content.querySelector('img').src = this.resultFiltrationCards[i].img;
      template.content.querySelector('.breed').textContent = this.resultFiltrationCards[i].breed;
      template.content.querySelector('.price').textContent = `${this.resultFiltrationCards[i].price}₽`;
      template.content.querySelector('.inBox').dataset.idcards = this.resultFiltrationCards[i].id;
      document.querySelector('.product-section').appendChild(template.content);
    }
    this.buttonShowMore.addEventListener('click', () => {
      this.countCardsInCatalog += 8;
      this.addCardsToCatalog(infoCards);
    });
    this.defineSearchSizes(infoCards);
    this.box.addListenerButtonsInBox(infoCards);
  }

  showFilteredCards() {
    this.modalFilter.classList.add('menuFilter');
    this.buttonFilter.classList.add('buttonFilter');
    if (this.resultFiltrationCards.length) {
      this.buttonFilter.textContent = 'Показать';
    } else {
      this.buttonFilter.textContent = '';
    }
    this.modalFilter.textContent = `Найдено совпадений: ${this.resultFiltrationCards.length} `;
    this.modalFilter.appendChild(this.buttonFilter);
  }

  defineSearchSizes() {
    this.searchSizes = [];
    this.petSizeInputs.forEach(elem => {
      this.searchSizes.push(Math.ceil(elem.value / 25));
    })
    this.searchSizes.sort();
  }

  resizeSectionsFilter() {
    this.buttonBlockType.addEventListener('click', () => {
      this.sectionFilterType.classList.toggle('small-section-form');
    });
    this.buttonBlockFeatures.addEventListener('click', () => {
      this.sectionFilterMainFeatures.classList.toggle('small-section-form');
    });
    this.buttonBlockSize.addEventListener('click', () => {
      this.sectionFilterSize.classList.toggle('small-section-form');
    });
  }
}