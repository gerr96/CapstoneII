const searchFilter = document.querySelector("#searchFilter");
const searchByLocation = document.querySelector("#searchByLocation");
const searchByParkType = document.querySelector("#searchByParkType");
const searchByNationalPark = document.querySelector("#searchByNationalPark");
const parksInformation = document.querySelector("#parksInformation");

// setting up event listeners for various elements on the page
window.onload = function () {
  searchFilter.addEventListener("change", handleFilterDropdownChange);
  searchByLocation.addEventListener("change", handleLocationChange);
  searchByParkType.addEventListener("change", handleParkChange);
  searchByNationalPark.addEventListener("change", handleNationalParkChange);

  searchByLocation.style.display = "none";
  searchByParkType.style.display = "none";
  searchByNationalPark.style.display = "none";
  parksInformation.style.display = "none";
};

// displaying different sets of search options based on the selected value of the search filter dropdown
function handleFilterDropdownChange() {
  hideElements();

  if (searchFilter.value === "Location") {
    searchByLocation.style.display = "block";
    populateLocationOptions();
  } else if (searchFilter.value === "Park Type") {
    searchByParkType.style.display = "block";
    populateParkOptions();
  } else if (searchFilter.value === "All") {
    searchByNationalPark.style.display = "block";
    populateAllOptions();
  }
}

// functions to add options dynamically to select elements based on different criteria
function populateOptions(element, options) {
  element.innerHTML = "";

  for (let option of options) {
    const newOption = document.createElement("option");
    newOption.value = option;
    newOption.textContent = option;
    element.appendChild(newOption);
  }
}

function populateLocationOptions() {
  populateOptions(searchByLocation, locationsArray);
}

function populateParkOptions() {
  populateOptions(searchByParkType, parkTypesArray);
}

function populateAllOptions() {
  populateOptions(
    searchByNationalPark,
    nationalParksArray.map((park) => park.LocationName)
  );
}

// change events
function handleLocationChange() {
  const selectedLocation = searchByLocation.value;

  searchByNationalPark.innerHTML = "";

  if (selectedLocation) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Please Select a Park";
    searchByNationalPark.appendChild(defaultOption);

    for (let park of nationalParksArray) {
      if (selectedLocation === park.State) {
        const parkOption = document.createElement("option");
        parkOption.value = park.LocationName;
        parkOption.text = park.LocationName;
        searchByNationalPark.appendChild(parkOption);
      }
    }

    searchByNationalPark.style.display = "block";
  } else {
    searchByNationalPark.style.display = "none";
  }
}

function handleParkChange() {
  const selectedParkType = searchByParkType.value;

  searchByNationalPark.innerHTML = "";

  if (selectedParkType) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Please Select a Park";
    searchByNationalPark.appendChild(defaultOption);

    for (let park of nationalParksArray) {
      if (park.LocationName.includes(selectedParkType)) {
        const parkOption = document.createElement("option");
        parkOption.value = park.LocationName;
        parkOption.textContent = park.LocationName;
        searchByNationalPark.appendChild(parkOption);
      }
    }

    searchByNationalPark.style.display = "block";
  }
}

function handleNationalParkChange() {
  const selectedNationalPark = searchByNationalPark.value;

  for (let park of nationalParksArray) {
    if (selectedNationalPark === park.LocationName) {
      parksInformation.style.display = "block";
      parksInformation.innerHTML = `
        <span style='color: black;'>Name : </span>${park.LocationName}<br/>
        <span style='color: black;'>Address : </span>${park.Address}<br/>
        <span style='color: black;'>City : </span>${park.City}<br/>
        <span style='color: black;'>State : </span>${park.State}<br/>
        <span style='color: black;'>Zip Code : </span>${park.ZipCode}
      `;
    }
  }

  if (!selectedNationalPark) {
    parksInformation.style.display = "none";
  }
}

function hideElements() {
  searchByLocation.style.display = "none";
  searchByParkType.style.display = "none";
  searchByNationalPark.style.display = "none";
  parksInformation.style.display = "none";
}