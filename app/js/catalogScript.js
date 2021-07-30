let inCatalog = document.querySelector('.catalogOpen');
let outCatalog = document.querySelector('.catalogClose');
let catalogButton = document.querySelector('.container-catalog-button');
let dogsInCatalog = document.querySelector('.dogsInCatalog');
let breadcrumb = document.querySelector('.breadcrumb');
let breadcrumbCatalogOpen = document.querySelector('.breadcrumbCatalogOpen');
let breadcrumbCatalogClose = document.querySelector('.breadcrumbCatalogClose');

inCatalog.addEventListener('click', () => {
    console.log('хотят в каталог');
    inCatalog.style.display = "none";
    outCatalog.style.display = "block";
    catalogButton.style.display = "grid";
    dogsInCatalog.style.display = "none";
    breadcrumbCatalogOpen.style.display = 'block';
    breadcrumbCatalogClose.style.display = 'none';
});

breadcrumbCatalogClose.addEventListener('click', () => {
    console.log('хотят в каталог');
    inCatalog.style.display = "none";
    outCatalog.style.display = "block";
    catalogButton.style.display = "grid";
    dogsInCatalog.style.display = "none";
    breadcrumbCatalogOpen.style.display = 'block';
    breadcrumbCatalogClose.style.display = 'none';
});

outCatalog.addEventListener('click', () => {
    console.log('хотят на главную');
    inCatalog.style.display = "block";
    outCatalog.style.display = "none";
    catalogButton.style.display = "none";
    dogsInCatalog.style.display = "block";
    breadcrumb.textContent = 'Каталог товаров';
    breadcrumbCatalogOpen.style.display = 'none';
    breadcrumbCatalogClose.style.display = 'block';
});

breadcrumbCatalogOpen.addEventListener('click', () => {
    console.log('хотят на главную');
    inCatalog.style.display = "block";
    outCatalog.style.display = "none";
    catalogButton.style.display = "none";
    dogsInCatalog.style.display = "block";
    breadcrumb.textContent = 'Каталог товаров';
    breadcrumbCatalogOpen.style.display = 'none';
    breadcrumbCatalogClose.style.display = 'block';
});