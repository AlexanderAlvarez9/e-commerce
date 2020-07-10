const API = '../src/data.json';
const $productCard = document.querySelector('.content--products--cards');
const $categoryList = document.querySelector('.panel--subitem');
const $reset = document.querySelector('.resetButton');
const $modal = document.querySelector('.modal');
const $modalDetails = document.querySelector('.modal--details-generated');
const $products = document.querySelector('.main');
const $closeModal = document.querySelector('.modal--close');
const $addButtonCart = document.querySelector('.objectValue')
const $cartCount = document.querySelector('.cart-count')
const $buttonCart = document.querySelector('.modal--details--product__addCart');
const $itemsTotal = document.querySelector('.itemsTotal');

const getData = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    cardConstructor(data);
    return data;
  } catch (error) {
    console.log('Fetch Error', error);
  }
}

//add to cart using localStorage
let addToCard = (results, item) => {
  localStorage.setItem(item, JSON.stringify(results[item]))
}

//clear filters
$reset.addEventListener('click', getData);

//close modal button
$closeModal.addEventListener("click", () => {
  $modal.style.display = "none";
  $products.style.display = "grid";
})

//build cards and categories, show each one
function cardConstructor(result) {
  result.forEach((result) => {
    // console.log(result.id);
    $productCard.innerHTML += `
                <div class="content--products--cards--card ">
                    <img class="product__img" src="${result.image}" alt="Imagen de Producto">
                    <h3 class="product__title">${result.product}</h3>
                    <p class="product__category">${result.category}</p>
                    <p class="product__price">Precio: $${result.price}</p>
                    <div class="product__details">Ver Mas</div>
                </div>
                `
  });
  //Build categories
  $categoryList.innerHTML = ""
  category(result);

  //EventListener for "ver mas"
  let $buttonDetails = document.querySelectorAll('.product__details');

  //Build Modal Details
  for (let i = 0; i < $buttonDetails.length; i++) {
    $buttonDetails[i].addEventListener("click", () => {
      $modalDetails.innerHTML = ""
      $modal.style.display = "grid";
      $products.style.display = "none";
      $modalDetails.innerHTML = `
                <img class="modal--details--product__img" src="${result[i].image}" alt="Imagen de Producto">
                <h3 class="modal--details--product__title">${result[i].product}</h3>
                <p class="modal--details--product__description">Descripcion: ${result[i].description}</p>
                <p class="modal--details--product__category">Categoria: ${result[i].category}</p>
                <p class="modal--details--product__price">Precio: $${result[i].price}</p>
                `
      $addButtonCart.setAttribute('value', result[i].id)
    });
  }

  $buttonCart.addEventListener('click', () => {
    getValueForCart(result)
  })
  //Update cart number
  $cartCount.textContent = localStorage.length

  //Set total of items
  $itemsTotal.textContent = result.length
}

//Get value for add to cart
function getValueForCart(result) {
  //Get value from button
  let value = $addButtonCart.getAttribute('value')
  //Update cart number and plus 1
  $cartCount.textContent = localStorage.length + 1
  $modal.style.display = "none";
  $products.style.display = "grid";
  addToCard(result, value)
}

//Get, build and show categories
function category(result) {
  //Get categories
  const cate = result.map(item => item.category)
  // Remove duplicates or more
  const diferentCategory = (valor, indice, self) => {
    return self.indexOf(valor) === indice;
  }
  let categories = cate.filter(diferentCategory);

  //Short categories
  let sortCategories = categories.sort(function (a, b) {
    return a - b;
  });

  //Build categories
  for (let i = 0; i < sortCategories.length; i++) {
    $categoryList.innerHTML += `
        <li class="catButton"><a class="panel--subitem-button">${sortCategories[i]}</a></li>
    `
  }
  getCatFilter(result);
}

//Filter categories
function getCatFilter(result) {
  const $catButton = document.querySelectorAll('.catButton');

  for (let i = 0; i < $catButton.length; i++) {
    $catButton[i].addEventListener("click", function () {
      var newFilter = result.filter(item => item.category == $catButton[i].textContent)
      $productCard.innerHTML = ""
      $categoryList.innerHTML = ""
      cardConstructor(newFilter);
    });
  }
}

//Clear filters
$reset.addEventListener('click', getData);

getData()