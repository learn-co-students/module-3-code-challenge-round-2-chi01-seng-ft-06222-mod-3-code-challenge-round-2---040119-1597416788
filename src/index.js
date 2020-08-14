const URL = "http://localhost:3000/beers";

const main = () => {
  getAllBeer();
};

const getAllBeer = async () => {
  const res = await fetch(URL);
  const beers = await res.json();
  renderBeers(beers);
};

const renderBeers = (beers) => {
  const container = document.querySelector("#list-group");
  container.innerHTML = "";
  let beerList = "";
  beers.forEach((beer) => {
    beerList += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`;
  });
  container.innerHTML = beerList;
  beerInfoClick(container);
};

const beerInfoClick = (beerDiv) => {
  beerDiv.addEventListener("click", (event) => {
    fetchBeer(event.target.dataset.id);
  });
};

const fetchBeer = async (id) => {
  const res = await fetch(`${URL}/${id}`);
  const beer = await res.json();
  showPanel(beer);
};

const showPanel = (data) => {
  const container = document.querySelector("#beer-detail");
  container.innerHTML = beerHTML(data);
  saveButtonListener(container);
};

const beerHTML = (data) => {
  return `
    <h1>${data.name}</h1>
    <img src="${data.image_url}">
    <h3>${data.tagline}</h3>
    <p><strong>First Brewed:</strong> ${data.first_brewed}</p>
    <h4>Food Pairing</h4>
    <ul>
        ${data.food_pairing.map((food) => `<li>${food}</li>`).join("")}
    </ul>
    <p><strong>Brewer's Tips:</strong> ${data.brewers_tips}</p>
    <textarea style="margin-bottom: 10px;">${data.description}</textarea>
    <p><strong>Contributed by:</strong> ${data.contributed_by}</p>
    <button id="edit-beer" class="btn btn-info" data-id=${data.id}>
        Save
    </button> 
    `;
};

const saveButtonListener = (container) => {
  container.addEventListener("click", (event) => {
    if (event.target.id === "edit-beer") {
      const editedDescription = document.querySelector("textarea").value;
      const id = event.target.dataset.id;
      const reqObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ description: editedDescription }),
      };
      saveDescription(id, reqObj);
    }
  });
};

const saveDescription = async (id, reqObj) => {
  const res = await fetch(`${URL}/${id}`, reqObj);
  const beer = await res.json();
};

main();
