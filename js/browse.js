const searchFrom = document.querySelector('.search-form');
const locationSelect = document.getElementById('location');
const propertyTypeSelect = document.getElementById('property-type');
const priceSelect = document.getElementById('price');
const houseCards = document.querySelectorAll('.house-card');

searchFrom.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedPrice = priceSelect.value;
    const selectedLocation = locationSelect.value;
    const selectedPropertyType = propertyTypeSelect.value;

    houseCards.forEach(function(houseCard) {
        const priceElement = houseCard.querySelector('.house-price');
        const locationElement = houseCard.querySelector('.house-location');
        const houseLocation = locationElement.textContent.trim();
        const typeElement = houseCard.querySelector('.house-type');
        const houseType = typeElement.textContent.trim();

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

        if (matchesPrice && matchesLocation && matchesPropertyType) {
            houseCard.style.display = '';
        } else {
            houseCard.style.display = 'none';
        }
    });

    console.log('Selected price;', selectedPrice);
    console.log('Selected location:', selectedLocation);
    console.log('Selected property type:', selectedPropertyType);
})