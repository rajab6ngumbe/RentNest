
const urlParams = new URLSearchParams(window.location.search);
const houseId = urlParams.get('id');

const propertyNotFound = document.getElementById('property-not-found');
const propertyDetails = document.querySelector('.house-details');

const houses = [
    {
        id: 'house-1',
        title: 'Modern Family House',
        location: 'Stone Town, Zanzibar',
        price: 'TZS 800,000 / month',
        type: 'Apartment',
        bedrooms: 3,
        bathrooms: 2,
        images: [
            'image/house 01.jpg',
            'image/living room.jpg',
            'image/Bedroom.avif'
        ]
    },
    {
        id: 'house-2',
        title: 'Beautiful Beach Apartment',
        location: 'Nungwi, Zanzibar',
        price: 'TZS 1,200,000 / month',
        type: 'House',
        bedrooms: 2,
        bathrooms: 1,
        images: [
            'image/house 02.jpg',
            'image/living room 02.jpeg',
            'image/Bedroom 02.jpeg'
        ]
    },
    {
        id: 'house-3',
        title: 'Spacious Three-Bedroom House',
        location: 'Paje, Zanzibar',
        price: 'TZS 950,000 / month',
        type: 'House',
        bedrooms: 3,
        bathrooms: 2,
        images: [
            'image/house 03.jpg',
            'image/living room 03.jpeg',
            'image/Bedroom 03.avif'
        ]
    }
];

const selectedHouse = houses.find(function(house) {
    return house.id === houseId;
});

if (!selectedHouse) {
    propertyDetails.hidden = true;
    propertyNotFound.hidden = false;
} else {
    document.getElementById('property-title').textContent =
        selectedHouse.title;

    document.getElementById('property-location').textContent =
        selectedHouse.location;

    document.getElementById('property-price').textContent =
        selectedHouse.price;

    document.getElementById('property-bedrooms').textContent =
        selectedHouse.bedrooms + ' Bedrooms';

    document.getElementById('property-bathrooms').textContent =
        selectedHouse.bathrooms + ' Bathrooms';

    const mainImage = document.getElementById('property-main-image');

    mainImage.src = selectedHouse.images[0];
    mainImage.alt = selectedHouse.title;

    const thumbnailContainer =
        document.getElementById('thumbnail-images');

    thumbnailContainer.innerHTML = '';

    selectedHouse.images.forEach(function(image) {
        const thumbnail = document.createElement('img');

        thumbnail.src = image;
        thumbnail.alt = selectedHouse.title;

        thumbnail.addEventListener('click', function() {
            mainImage.src = image;
        });

        thumbnailContainer.appendChild(thumbnail);
    });
}
