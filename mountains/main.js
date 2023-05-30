const selectMountain = document.querySelector("#selectMountain");
const mountainInfo = document.querySelector("#mountainInfo");
const mountainInfoCard = document.querySelector("#mountainInfoCard");
const mountainInfoCardTitle = document.querySelector("#MountainInfoCardTitle");
const mountainInfoCardImg = document.querySelector("#mountainInfoCardImg");

selectMountain.innerHTML += `<option value="select">Select a Mountain</option>`;

window.onload = main;

function main() {
  mountainDropdownMenu();
  selectMountain.addEventListener("change", populateMountainInfo);
}

function mountainDropdownMenu() {
  for (let mountain of mountainsArray) {
    selectMountain.innerHTML += `<option value="${mountain.name}">${mountain.name}</option>`;
  }
}

async function mountainSunriseAndSunset(lat, lng) {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  const data = await response.json();
  return data;
}

function populateMountainInfo() {
  const selectedMountain = selectMountain.value;
  mountainInfo.innerHTML = "";

  if (selectedMountain === "select") {
    mountainInfoCard.style.display = "none";
    return;
  }

  const mountain = mountainsArray.find((m) => m.name === selectedMountain);
  if (!mountain) return;

  mountainInfoCardTitle.textContent = mountain.name;
  mountainInfo.innerHTML = `
    <span class="fw-bold">Description: </span>${mountain.desc}<br>
    <span class="fw-bold">Elevation: </span>${mountain.elevation}<br>
    <span class="fw-bold">Difficulty: </span>${mountain.effort}<br>
    <span class="fw-bold">Coordinates: </span>${mountain.coords.lat}, ${mountain.coords.lng}`;

  mountainSunriseAndSunset(mountain.coords.lat, mountain.coords.lng).then(
    (data) => {
      mountainInfo.innerHTML += `<br><span class="fw-bold">Sunrise Time: </span>${data.results.sunrise}<br>
      <span class="fw-bold">Sunset Time: </span>${data.results.sunset}`;
    }
  );

  mountainInfoCardImg.src = `images/${mountain.img}`;
  mountainInfoCard.style.display = "block";
}