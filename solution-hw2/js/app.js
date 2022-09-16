
const originalGlazing = 0;
const sugarGlazing = 0;
const vanillaGlazing = .5;
const chocolateGlazing = 1.5;
const onePack = 1;
const threePack = 3;
const sixPack = 5;
const twelvePack = 10;
const realRollPrice = 0;
const updatedRollPrice = 0;
const multiplier = 1;

let numberOfItems = 0;
let totalCost = 0;


class Roll {
    constructor(type, price, glazing, packSize, elementID) {
        this.rollType = type;
        this.rollPrice = price;
        this.rollGlazing = glazing;
        this.rollPackSize = packSize;

        this.realRollPrice = this.rollPrice;
        this.multiplier = 1;
        this.updatedRollPrice = this.rollPrice;


        this.element = document.querySelector(elementID);

        // populate dropdown
        this.selectGlazingDropdown();

        // remove gray from selected box
        const removePackSelect = this.element.querySelector('.card-size-squares');
        removePackSelect.onclick = this.selectPackSize.bind(this);

        // add gray to selected box
        const buttons = this.element.querySelector('.card-size-squares')
        buttons.addEventListener('click', function handleClick(event) {
            event.target.classList.add('selected');
        });

        // update price listed
        const updatePrice = this.element.querySelector('select');
        updatePrice.onchange = this.updateElement.bind(this);

        // add items to cart
        const addToCart = this.element.querySelector('.card-price-right > button');
        addToCart.onclick = this.addItemToCart.bind(this);

    }

    updateElement() {
        const currentPrice = this.element.querySelector('.card-price-left > p');
        this.findSelectedPrice();
        this.calculatePrice();
        // update listed price
        currentPrice.innerText = '$ ' + this.updatedRollPrice;

    }

    calculatePrice() {
        const glazingChoice = this.element.querySelector('select');
        const glazingPrice = glazingChoice.value;
        
        // calculate total price using glazing and pack size modifiers
        this.updatedRollPrice = +this.realRollPrice + +glazingPrice;
        this.updatedRollPrice = +this.updatedRollPrice * +this.multiplier;
        this.updatedRollPrice = this.updatedRollPrice.toFixed(2);
    }

    selectGlazingDropdown() {

        // referenced from https://www.geeksforgeeks.org/how-to-create-a-dropdown-list-with-array-values-using-javascript/

        const priceAdaptions = [originalGlazing, sugarGlazing, vanillaGlazing, chocolateGlazing];
        const glazeNames = ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"]

        // populate drop down
        for (var i = 0; i < glazeNames.length; i++) {
            let optn1 = glazeNames[i];
            let optn2 = priceAdaptions[i];
            let el = document.createElement("option");
            el.textContent = optn1;
            el.value = optn2;
            const dropdown = this.element.querySelector('select').appendChild(el);
        }
    }

    selectPackSize() {
        const selectedButton = this.element.querySelector('.selected');
        selectedButton.classList.remove('selected');
    }

    findSelectedPrice() {
        const selectedSize = this.element.querySelector('.selected');

        // determine pack size and price modifier
        if (selectedSize.classList.contains('button-1')) {
            this.multiplier = onePack;
            this.rollPackSize = 1;
        }
        else if (selectedSize.classList.contains('button-3')) {
            this.multiplier = threePack;
            this.rollPackSize = 3;
        }
        else if (selectedSize.classList.contains('button-6')) {
            this.multiplier = sixPack;
            this.rollPackSize = 6;
        }
        else if (selectedSize.classList.contains('button-12')) {
            this.multiplier = twelvePack;
            this.rollPackSize = 12;
        }
    }

    addItemToCart() {
        this.cartPopup();
        numberOfItems = +numberOfItems + 1;
        totalCost = +totalCost + +this.updatedRollPrice;
        totalCost = totalCost.toFixed(2);
        const cartDisplay = document.querySelector('.cart-items');
        cartDisplay.innerText = numberOfItems + ' ' + pluralize() + '\n' + "Total: $" + totalCost;
    }


    cartPopup() {

        // referenced from https://stackoverflow.com/questions/64357088/how-to-display-text-for-some-amount-of-time-in-javascript

        document.querySelector('.cart-popup').innerText = 'Added to cart: ' + '\n' + '\n' + this.rollType + '\n' + this.rollGlazing + ' glazing' + '\n' + 'Pack of ' + this.rollPackSize + '\n' + 'Price: $' + this.updatedRollPrice;

        setTimeout(function () {
            document.querySelector('.cart-popup').innerText = '';
        }, 3000);
    }
}

function pluralize() {
    if (numberOfItems === 1) {
        return "item";
    }
    else {
        return "items"
    }
}



const originalCinnamonRoll = new Roll(
    'Original Cinnamon Roll',
    2.49,
    'Keep original',
    1,
    '#original'
)


const appleCinnamonRoll = new Roll(
    'Apple Cinnamon Roll',
    3.49,
    'Keep original',
    1,
    '#apple'
)

const raisinCinnamonRoll = new Roll(
    'Raisin Cinnamon Roll',
    2.99,
    'Keep original',
    1,
    '#raisin'
)

const walnutCinnamonRoll = new Roll(
    'Walnut Cinnamon Roll',
    3.49,
    'Keep original',
    1,
    '#walnut'
)

const doubleChocolateCinnamonRoll = new Roll(
    'Double Chocolate Cinnamon Roll',
    3.99,
    'Keep original',
    1,
    '#chocolate'
)

const strawberryCinnamonRoll = new Roll(
    'Strawberry Cinnamon Roll',
    3.99,
    'Keep original',
    1,
    '#strawberry'
)

