const urlParams = new URLSearchParams(window.location.search);
const houseId = urlParams.get('id');

console.log(houseId);