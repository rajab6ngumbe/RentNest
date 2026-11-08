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
const itemsPerPage = 2;
let currentPage = 1;
let filteredHouseCards = [...originalHouseCards];
const houseSearchInput = document.getElementById('house-search');
const previousPageButton = document.getElementById('previous-page');
const nextPageButton = document.getElementById('next-page');
const pageNumbersContainer = document.getElementById('page-numbers');


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

    if (selectedSort === 'default') {
        filteredHouseCards.sort(function(a, b) {
            return originalHouseCards.indexOf(a) -
                   originalHouseCards.indexOf(b);
        });
    }

    if (selectedSort === 'low-to-high') {
        filteredHouseCards.sort(function(a, b) {
            return getHousePrice(a) - getHousePrice(b);
        });
    }

    if (selectedSort === 'high-to-low') {
        filteredHouseCards.sort(function(a, b) {
            return getHousePrice(b) - getHousePrice(a);
        });
    }

    // Return to page 1 after sorting
    currentPage = 1;

    // Display the sorted properties
    displayCurrentPage();
}

function displayCurrentPage() {
    // Hide all property cards first
    originalHouseCards.forEach(function(houseCard) {
        houseCard.style.display = 'none';
    });

    // Calculate the indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the properties for the current page
    const pageProperties = filteredHouseCards.slice(
        startIndex,
        endIndex
    );
    // Display the properties for the page
    pageProperties.forEach(function(houseCard) {
        houseCard.style.display = '';
    })
}

function generatePageNumbers() {
    const totalPages = Math.ceil(
        filteredHouseCards.length / itemsPerPage
    );

    pageNumbersContainer.innerHTML = '';

    for(let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement('a');

        pageButton.href = '#';
        pageButton.textContent = page;

        if(page === currentPage) {
            pageButton.classList.add('active');
        }
        pageNumbersContainer.appendChild(pageButton);
        pageButton.addEventListener('click', function(event) {
            event.preventDefault();

            currentPage = page;

            displayCurrentPage();
            generatePageNumbers();
        })
    }
    updatePaginationButton();
}

function updatePaginationButton() {
    const totalPages = Math.ceil(
        filteredHouseCards.length / itemsPerPage
    );

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage >= totalPages;

    previousPageButton.classList.toggle('disabled', isFirstPage);
    nextPageButton.classList.toggle('disabled', isLastPage);

    previousPageButton.setAttribute('arial-disabled', isFirstPage);
    nextPageButton.setAttribute('aria-disabled', isLastPage);
}

function filterHouses() {

    const selectedPrice = priceSelect.value;
    const selectedLocation = locationSelect.value;
    const selectedPropertyType = propertyTypeSelect.value;
    const searchText = houseSearchInput.value.toLowerCase().trim();
    filteredHouseCards = [];

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
            filteredHouseCards.push(houseCard);
        } 

    });
    const visibleHouseCount = filteredHouseCards.length

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

    // Return to page 1 after filtering
    currentPage = 1;

    // Display the matching properties
    sortHouses();
    generatePageNumbers();

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

previousPageButton.addEventListener('click', function(event) {
    event.preventDefault();

    if (currentPage > 1) {
        currentPage--;

        displayCurrentPage();
        generatePageNumbers();
    }
})

nextPageButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const totalPages = Math.ceil(
        filteredHouseCards.length / itemsPerPage
    );

    if (currentPage < totalPages) {
        currentPage++;

        displayCurrentPage();
        generatePageNumbers();
    }
})

/* Filter automatically when a dropdown changes */
locationSelect.addEventListener('change', filterHouses);
priceSelect.addEventListener('change', filterHouses);
propertyTypeSelect.addEventListener('change', filterHouses);
sortPriceSelect.addEventListener('change', sortHouses);
houseSearchInput.addEventListener('input', filterHouses);
// Initialize the browse Page
filterHouses();