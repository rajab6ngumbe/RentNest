const searchFrom = document.querySelector('.search-form');
const locationSelect = document.getElementById('location');
const propertyTypeSelect = document.getElementById('property-type');
const priceSelect = document.getElementById('price');
const houseCards = document.querySelectorAll('.house-card');

const firstHouse = houseCards[0];
console.log(firstHouse);
const firstHouseLocation = firstHouse.querySelector('.house-location');
console.log(firstHouseLocation);
console.log(firstHouseLocation.textContent);
const cleanedLocation = firstHouseLocation.textContent.trim();
console.log(cleanedLocation);

const firstHousePrice = firstHouse.querySelector('.house-price');

console.log(firstHousePrice.textContent.trim());
const priceText = firstHousePrice.textContent.trim();

const priceWithoutCurrency = priceText
.replace('TZS ', '')
.replaceAll(',', '');

console.log(priceWithoutCurrency);

const priceAmountText = priceWithoutCurrency.replace('/ month', '');
console.log(priceAmountText);
// lesson 13: Converting price text into a number with Number()
const priceAmount = Number(priceAmountText);
console.log(priceAmount);
console.log(typeof priceAmount);

// lesson 14: Comparing house prices with JavaScript
console.log(priceAmount < 1000000);

// lesson 15: Checking every house card with forEach()
houseCards.forEach(function(houseCard) {
    const housePriceElement = 
    houseCard.querySelector('.house-price');

    const housePriceText = 
    housePriceElement.textContent.trim();
    console.log(housePriceText)
});

// Lesson 16: Convert every house price into a number
houseCards.forEach(function(houseCard) {
    const priceElement = houseCard.querySelector('.house-price');

    const priceText1 = priceElement.textContent
    .replace('TZS ', '')
    .replaceAll(',', '')
    .split('/')[0]
    .trim();

    const price = Number(priceText1);
    if (price < 1000000) {
        houseCard.style.display = '';
    } else {
        houseCard.style.display = '';
    }
})

// Lesson 21:  Read the selected price filter

console.log(houseCards);
console.log("Number of houses:", houseCards.length);


searchFrom.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedLocation = locationSelect.value;
    const selectedType = propertyTypeSelect.value;
    const selectedPrice = priceSelect.value;

    conssole.log('Selected price:', selectedPrice);
})