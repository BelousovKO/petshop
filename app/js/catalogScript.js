const inCatalog = document.querySelector('.catalogOpen');
const outCatalog = document.querySelector('.catalogClose');
const catalogButton = document.querySelector('.container-catalog-button');
const dogsInCatalog = document.querySelector('.dogsInCatalog');
const breadcrumb = document.querySelector('.breadcrumb');
const breadcrumbCatalogOpen = document.querySelector('.breadcrumbCatalogOpen');
const breadcrumbCatalogClose = document.querySelector('.breadcrumbCatalogClose');
const filterButton = document.querySelector('.p-filter');
const filter = document.querySelector('.filter');
const items = document.querySelector('.div-items');
const showMore = document.querySelector('.div-show-more');
const closeFilter = document.querySelector('.filter-img');

inCatalog.addEventListener('click', () => {
  catalogIn();
});

breadcrumbCatalogClose.addEventListener('click', () => {
  catalogIn();
});

outCatalog.addEventListener('click', () => {
  catalogOut();
});

breadcrumbCatalogOpen.addEventListener('click', () => {
  catalogOut();
});

const catalogIn = () => {
  inCatalog.style.display = "none";
  outCatalog.style.display = "block";
  catalogButton.style.display = "grid";
  dogsInCatalog.style.display = "none";
  breadcrumbCatalogOpen.style.display = 'block';
  breadcrumbCatalogClose.style.display = 'none';
};

const catalogOut = () => {
  inCatalog.style.display = "block";
  outCatalog.style.display = "none";
  catalogButton.style.display = "none";
  dogsInCatalog.style.display = "block";
  breadcrumb.textContent = 'Каталог товаров';
  breadcrumbCatalogOpen.style.display = 'none';
  breadcrumbCatalogClose.style.display = 'block';
}

filterButton.addEventListener('click', () => {
  filter.style.display = 'block';
  items.style.display = 'none';
  filterButton.style.display = 'none';
  // showMore.style.display =
});

closeFilter.addEventListener('click', () => {
  filter.style.display = 'none';
  items.style.display = 'block';
  filterButton.style.display = 'block';
})