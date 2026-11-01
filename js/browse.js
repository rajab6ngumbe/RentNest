const searchFrom = document.querySelector('.search-form');
const locationSelect = document.getElementById('location');
const propertyTypeSelect = document.getElementById('property-type');
const priceSelect = document.getElementById('price');
const houseCards = document.querySelectorAll('.house-card');
const noResultsMessage = document.getElementById('no-results');
const clearFiltersButton = document.getElementById('clear-filters');
const houseCount = document.getElementById('house-count');
const sortPriceSelect = document.getElementById('sort-price');
const houseGrid = document.querySelector('.house-grid');
const originalHouseCards = Array.from(houseCards);
const houseSearchInput = document.getElementById('house-search');


function getHousePrice(houseCard) {
    const priceElement = houseCard.querySelector('.house-price');

    const priceText = priceElement.textContent
        .replace('TZS', '')
        .replaceAll(',', '')
        .split('/')[0]
        .trim();

    return Number(priceText);
}

function sortHouses() {
    const selectedSort = sortPriceSelect.value;
    const houseCardsArray = Array.from(houseCards);

    if (selectedSort === 'default') {
        originalHouseCards.forEach(function(houseCard) {
            houseGrid.appendChild(houseCard);
        });

        return;
    }

    houseCardsArray.sort(function(a, b) {
        const priceA = getHousePrice(a);
        const priceB = getHousePrice(b);

        if (selectedSort === 'low-to-high') {
            return priceA - priceB;
        }

        if (selectedSort === 'high-to-low') {
            return priceB - priceA;
        }

        return 0;
    });

    houseCardsArray.forEach(function(houseCard) {
        houseGrid.appendChild(houseCard);
    });
}

function filterHouses() {

    const selectedPrice = priceSelect.value;
    const selectedLocation = locationSelect.value;
    const selectedPropertyType = propertyTypeSelect.value;
    const searchText = houseSearchInput.value.toLowerCase().trim();
    let visibleHouseCount = 0;

    houseCards.forEach(function(houseCard) {
        const priceElement = houseCard.querySelector('.house-price');
        const locationElement = houseCard.querySelector('.house-location');
        const houseLocation = locationElement.textContent.trim();
        const typeElement = houseCard.querySelector('.house-type');
        const houseType = typeElement.textContent.trim();
        const houseName = houseCard.querySelector('.house-title').textContent.toLocaleLowerCase();
        const matchesSearch = houseName.includes(searchText);

        const matchesPropertyType =
        selectedPropertyType === '' ||
        houseType.toLowerCase() === selectedPropertyType.toLowerCase();


        const normalizedHouseLocation = houseLocation
        .toLowerCase()
        .replaceAll('-', ' ')
        .trim();

        const normalizedSelectedLocation = selectedLocation
        .toLowerCase()
        .replaceAll('-', ' ')
        .trim();

        const matchesLocation =
        selectedLocation === '' ||
        normalizedHouseLocation.toLowerCase().includes(normalizedSelectedLocation);

        const priceText = priceElement.textContent
        .replace('TZS', '')
        .replaceAll(',', '')
        .split('/')[0]
        .trim();

        const price = Number(priceText);

        let matchesPrice = true;

        if (selectedPrice === 'under-500k') {
            matchesPrice = price < 500000;
        } else if (selectedPrice === '500k-1m') {
            matchesPrice = price >= 500000 && price <= 1000000;
        } else if (selectedPrice === '1m-2m') {
            matchesPrice = price > 1000000 && price <= 2000000;
        } else if (selectedPrice === 'above-2m') {
            matchesPrice = price > 2000000;
        }

        if (matchesSearch && matchesPrice && matchesLocation && matchesPropertyType) {
            houseCard.style.display = '';
            visibleHouseCount++;
        } else {
            houseCard.style.display = 'none';
        }
    });
    if(visibleHouseCount === 0) {
        noResultsMessage.hidden = false;
    } else {
        noResultsMessage.hidden = true;
    }

    if(visibleHouseCount === 1) {
        houseCount.textContent = '1 property found';
    } else {
        houseCount.textContent = visibleHouseCount + ' properties found';
    }

    console.log('Selected price;', selectedPrice);
    console.log('Selected location:', selectedLocation);
    console.log('Selected property type:', selectedPropertyType);
}

searchFrom.addEventListener('submit', function(event) {
    event.preventDefault();
    filterHouses();
})

clearFiltersButton.addEventListener('click', function() {
    locationSelect.value = '';
    propertyTypeSelect.value = '';
    priceSelect.value = '';
    houseSearchInput.value = '';
    sortPriceSelect.value = 'default';

    filterHouses();
    sortHouses();
    
})

/* Filter automatically when a dropdown changes */
locationSelect.addEventListener('change', filterHouses);
priceSelect.addEventListener('change', filterHouses);
propertyTypeSelect.addEventListener('change', filterHouses);
sortPriceSelect.addEventListener('change', sortHouses);
houseSearchInput.addEventListener('input', filterHouses);
