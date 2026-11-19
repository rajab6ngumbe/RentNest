const urlParams = new URLSearchParams(window.location.search);
const houseId = urlParams.get('id');
const propertyNotFound = document.getElementById('property-not-found');
const propertyDetails = document.querySelector('.house-details');

console.log(houseId);

const houses = [
    {
        id: 'house-1',
        title: 'Modern Family House',
        location: 'Stone Town, Zanzibar',
        price: 'TZS 800,000 / month',
        type: 'Apartment',
        bedrooms: 3,
        bathrooms: 2
    },
    {
        id: 'house-2',
        title: 'Beautiful Beach Apartment',
        location: 'Nungwi, Zanzibar',
        price: 'TZS 1,200,000 / month',
        type: 'House',
        bedrooms: 2,
        bathroom: 1
    },
    {
        id: 'house-3',
        title: 'Spacious Three-Bedroom House',
        location: 'Paje,  Zanzibar',
        price: 'TZS 950,000 / month',
        type: 'House',
        bedrooms: 3,
        bathrooms: 2

    }
];

const selectedHouse = houses.find(function(house) {
    return house.id === houseId;
});

if (!selectedHouse) {
    propertyDetails.hidden = true;
    propertyNotFound.hidden = false;
} else {
    document.getElementById('property-title').textContent = selectedHouse.title;
    document.getElementById('property-location').textContent = selectedHouse.location;
    document.getElementById('property-price').textContent = selectedHouse.price;
    document.getElementById('property-bedrooms').textContent = selectedHouse.bedrooms + ' Bedrooms';
    document.getElementById('property-bathrooms').textContent = selectedHouse.bathrooms + ' Bathrooms';
}

console.log(selectedHouse);