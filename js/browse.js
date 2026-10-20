console.log("RentNest Browse JavaScript is connected");

const locationSelect = document.getElementById('location');
locationSelect.addEventListener('change', function() {
    const selectedLocation = locationSelect.value;
    console.log('Selected location:', selectedLocation);
});