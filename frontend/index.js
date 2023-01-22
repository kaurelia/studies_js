const getAllBackpacksElement = document.querySelector("#get-all-backpacks");
const getAllBrandsElement = document.querySelector("#get-all-brands");
const allBackpacksWrapperElement = document.querySelector(
  "#all-backpacks-wrapper"
);
const allBrandsWrapperElement = document.querySelector("#all-brands-wrapper");
const getSpecificBackpackElement = document.querySelector(
  "#get-specific-backpack"
);
const backpackInputElement = document.querySelector("#backpack-input");
const getSpecificBrandElement = document.querySelector("#get-specific-brand");
const brandInputElement = document.querySelector("#brand-input");
const backpackWrapperElement = document.querySelector("#backpack-wrapper");
const brandWrapperElement = document.querySelector("#brand-wrapper");

const mapDataToRow = ({ data, wrapperElement }) => {
  const element = document.createElement("div");
  const dataEntries = Object.entries(data);
  dataEntries.forEach(([key, value]) => {
    element.innerHTML += `<div><span class="key">${key}:</span> <span class="value">${
      typeof value === "string" ? value.trim() : value
    }</span></div>`;
  });
  element.innerHTML = `<div class="element-wrapper">${element.innerHTML}</div>`;
  wrapperElement.appendChild(element);
};

const requestBackendForGroupedData = async ({ endpoint, wrapperElement }) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  wrapperElement.innerHTML = "";
  Array.isArray(data)
    ? data.forEach((backpack) => {
        mapDataToRow({
          data: backpack,
          wrapperElement,
        });
      })
    : mapDataToRow({
        data,
        wrapperElement,
      });
};

getSpecificBackpackElement.addEventListener("click", () => {
  requestBackendForGroupedData({
    endpoint: `http://localhost:5000/backpack/${backpackInputElement.value}`,
    wrapperElement: backpackWrapperElement,
  });
});

getSpecificBrandElement.addEventListener("click", () => {
  requestBackendForGroupedData({
    endpoint: `http://localhost:5000/brand/${brandInputElement.value}`,
    wrapperElement: brandWrapperElement,
  });
});

getAllBackpacksElement.addEventListener("click", () => {
  requestBackendForGroupedData({
    endpoint: "http://localhost:5000/backpacks",
    wrapperElement: allBackpacksWrapperElement,
  });
});

getAllBrandsElement.addEventListener("click", () => {
  requestBackendForGroupedData({
    endpoint: "http://localhost:5000/brands",
    wrapperElement: allBrandsWrapperElement,
  });
});
