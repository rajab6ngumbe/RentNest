
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
        parking: true,
        furnished: true,

        description: 'A comfortable family home in Stone Town with spacious rooms and a private garden.',

        images: [
            'image/house 01.jpg',
            'image/living room.jpg',
            'image/Bedroom.avif'
        ],
        amenities: [
            'Air Conditioning',
            'Wi-Fi',
            'Private Garden',
            'Parking'
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7933.525066926291!2d39.19301455!3d-6.16254925!2m3!1f0!2f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd059242fbd01%3A0x9a18e54b0e5a94d8!2sStone%20Town%2C%20Zanzibar!5e0!3m2!1sen!2stz!4v1795520368949!5m2!1sen!2stz'

    },
    {
        id: 'house-2',
        title: 'Beautiful Beach Apartment',
        location: 'Nungwi, Zanzibar',
        price: 'TZS 1,200,000 / month',
        type: 'House',
        bedrooms: 2,
        bathrooms: 1,
        parking: false,
        furnished: true,

        description: 'A beatiful beachside apartment in Nungwi, offering a relaxing atmosphere, comfortable living space, and convenient access to the back.',

        images: [
            'image/house 02.jpg',
            'image/living room 02.jpeg',
            'image/Bedroom 02.jpeg'
        ],
        amenities: [
            'Wi-Fi',
            'Ocean View',
            'Air Conditioning',
            'Beach Access'
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15879.637917817416!2d39.287757135088!3d-5.726177608476321!2m3!1f0!2f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18431e47dd2f981b%3A0x8e4004c205e46cb2!2sNungwi!5e0!3m2!1sen!2stz!4v1795522521461!5m2!1sen!2stz'
    },
    {
        id: 'house-3',
        title: 'Spacious Three-Bedroom House',
        location: 'Paje, Zanzibar',
        price: 'TZS 950,000 / month',
        type: 'House',
        bedrooms: 3,
        bathrooms: 2,
        parking: true,
        furnished: false,

        description: 'A spacious three-bedroom house in Paje, featuring comfortable living spaces and a welcoming enviroment, making it suitable for families looking for a ralaxing home.',

        images: [
            'image/house 03.jpg',
            'image/living room 03.jpeg',
            'image/Bedroom 03.avif'
        ],
        amenities: [
            'Wi-Fi',
            'Parking',
            'Private Garden',
            'Spacious Living Room'
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7931.9671339612705!2d39.527821427552354!3d-6.265891074995553!2m3!1f0!2f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185d3d0a989c2b8f%3A0xd23378fca6a1a8db!2sPaje!5e0!3m2!1sen!2stz!4v1795522663230!5m2!1sen!2stz'
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
    
    document.getElementById('property-parking').textContent = selectedHouse.parking ? 'Parking Available' : 'No Parking';    

    document.getElementById('property-description').textContent = selectedHouse.description;

    document.getElementById('property-type').textContent = selectedHouse.type;

    document.getElementById('details-bedrooms').textContent = selectedHouse.bedrooms;

    document.getElementById('details-parking').textContent = selectedHouse.parking ? 'Available' : 'Not Available';

    document.getElementById('property-furnished').textContent = selectedHouse.furnished ? 'Yes' : 'No';

    document.getElementById('details-location').textContent = selectedHouse.location;

    document.getElementById('location-description').textContent =
        `This property is located in ${selectedHouse.location}.`;

    document.getElementById('property-area').textContent = selectedHouse.location;  
    
    const propertyMap = document.getElementById('property-map');
    propertyMap.src = selectedHouse.mapUrl;

    const mainImage = document.getElementById('property-main-image');

    const contactOwnerLink = document.getElementById('contact-owner');

    contactOwnerLink.href = 'contact.html?id=${selectedHouse.id}';

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

    const amenitiesContainer = document.getElementById('property-amenities');
    amenitiesContainer.innerHTML = '';
    selectedHouse.amenities.forEach(function(amenity) {
        const listItem = document.createElement('li');

        listItem.textContent = amenity;

        amenitiesContainer.appendChild(listItem);
    })
}
