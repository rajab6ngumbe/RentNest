const houses = [
    {
        id: 'house-1',
        title: 'Moden Family House',
        location: 'Stone Town, Zanzibar',
        price: 'TZS 800,000 / month',
        type: 'Apartment',
        image: 'image/house 01.jpg',
        link: 'house-details.html'
    },
    {
        id: 'house-2',
        title: 'Beautiful Beach Apartment',
        location: 'Nungwi, Zanzibar',
        price: 'TZS 1,200,000/ month',
        type: 'House',
        image: 'image/house 02.jpg',
        link: '#'
    },
    {
        id: 'house-3',
        title: 'Spacious Three-Bedroom House',
        location: 'Paje, Zanzibar',
        price: 'TZS 950,000 / month',
        type: 'House',
        image: 'image/house 03.jpg',
        link: '#'
    }
];

let favourites = JSON.parse(
    localStorage.getItem('favourites')
) || [];

const savedHouses = houses.filter(function(house) {
    return favourites.includes(house.id)
});

const favouritesGrid = document.getElementById('favourites-grid');
const emptyFavouritesMessage = document.getElementById('empty-favourites');

if (savedHouses.length === 0) {
    emptyFavouritesMessage.hidden = false;
} else {
    emptyFavouritesMessage.hidden = true
};

function displaySavedHouses() {
    // Clear the grid before displaying properties
    favouritesGrid.innerHTML = '';

    savedHouses.forEach(function(house) {
        // create a new property card
        const houseCard = document.createElement('article');

        // Add the css class
        houseCard.classList.add('house-card');

        // Add the property information
        houseCard.innerHTML = `
        <div class="house-image">
                <img src="${house.image}" alt="${house.title}">
            </div>

            <div class="house-info">
                <h3 class="house-title">${house.title}</h3>

                <p class="house-location">${house.location}</p>

                <p class="house-price">${house.price}</p>

                <p class="house-type">${house.type}</p>

                <a href="${house.link}" class="view-house">
                    View House
                </a>
            </div>
        `;
        // Add the  card to the favourites grid
        favouritesGrid.appendChild(houseCard);
    });
}
displaySavedHouses();

console.log(favouritesGrid);
console.log(emptyFavouritesMessage)