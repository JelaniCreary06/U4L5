const p = document.querySelector('p');

let map = L.map('iss_loc').setView([0, 0], 1); 
const marker = L.marker([0, 0]).addTo(map);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
setInterval(async () => {
  (await fetch('https://api.wheretheiss.at/v1/satellites/25544').then(async response => {
    const data = await response.json();
    p.textContent = `Latitude: ${data.latitude}, Longitude: ${data.longitude}, Velocity: ${data.velocity}`;

    tiles.addTo(map);
    marker.setLatLng([data.latitude, data.longitude]);
    map.setView([data.latitude, data.longitude],5)
    console.log(data);
  }))
}, 1000)
