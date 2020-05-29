const API = './src/data.json';
const $productCard = document.querySelector('.content--products--cards');
const $categoryList = document.querySelector('.panel--subitem');
const $reset = document.querySelector('.resetButton');



const getData = async () => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        cardContructor(data);
        return data;
    } catch (error) {
        console.log('Fetch Error', error);
    }
}

function cardContructor(result) {
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
    //Construye nuevas categorias
    category(result);
}

function category(result) {
    //Obtener solo valores de categoria
    const cate = result.map(item => item.category)
    // Obtener valores Unicos de categoria
    const distinto = (valor, indice, self) => {
        return self.indexOf(valor) === indice;
    }
    let categories = cate.filter(distinto);

    //Ordenar Categorias de menor a mayor
    let sortCategories = categories.sort(function (a, b) {
        return a - b;
    });

    //Crear Categorias
    for (let i = 0; i < sortCategories.length; i++) {
        $categoryList.innerHTML += `
        <li class="catButton"><a class="panel--subitem-button">${sortCategories[i]}</a></li>
    `
    }
    getCatFilter(result);
}

function getCatFilter(result) {
    const $catButton = document.querySelectorAll('.catButton');

    for (let i = 0; i < $catButton.length; i++) {
        $catButton[i].addEventListener("click", function () {
            console.log(`mi valor es ${$catButton[i].textContent}`);
            var newFilter = result.filter(item => item.category == $catButton[i].textContent)
            $productCard.innerHTML = ""
            $categoryList.innerHTML = ""
            cardContructor(newFilter);
        });
    }

}

$reset.addEventListener('click', getData)

getData()