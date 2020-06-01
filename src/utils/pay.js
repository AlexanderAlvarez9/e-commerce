const $payButton = document.querySelector('.pay');
const $cards = document.querySelector('.cart--cards');

const $subtotal = document.querySelector('.subtotal');
const $shipping = document.querySelector('.shipping');
const $fee = document.querySelector('.fee');
const $total = document.querySelector('.total');

const fee = 1600;
const shipping = 8000;
let total = 0;


$payButton.addEventListener("click", () => {
    clearLocal();
    printLocal()
})


function clearLocal() {
    localStorage.clear()
    return 'done'
}

function printLocal() {
    var sub = 0;
    for (var i = 0; i < localStorage.length; i++) {
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
        sub = sub + JSON.parse(localStorage.getItem(localStorage.key(i))).price;

        $cards.innerHTML += `
                <div class="cart--cards--product">
                    <h3 class="cart--product__title">${JSON.parse(localStorage.getItem(localStorage.key(i))).product}</h3>
                    <img class="cart--product__img" src="${JSON.parse(localStorage.getItem(localStorage.key(i))).image}" alt="Imagen Producto">
                    <p class="cart--product__description"><strong>Descripcion:</strong> ${JSON.parse(localStorage.getItem(localStorage.key(i))).description}</p>
                    <p class="cart--product__category"><strong>Categoria:</strong> ${JSON.parse(localStorage.getItem(localStorage.key(i))).category}</p>
                    <p class="cart--product__price"><strong>Precio:</strong> ${JSON.parse(localStorage.getItem(localStorage.key(i))).price}</p>
                </div>
        `
        // console.log(sub);
    }
    $subtotal.innerHTML = '$' + sub;
    $shipping.innerHTML = '$' + shipping;
    $fee.innerHTML = '$' + fee;
    total = fee + shipping + sub;
    $total.innerHTML = '$' + total;
    console.log(sub);

}

printLocal()