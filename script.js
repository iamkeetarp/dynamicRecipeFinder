var data;
async function findRecipe() {
  let recipe = document.getElementById("searchInput").value;
  const url =
    "https://api.edamam.com/search?q=" +
    recipe +
    "&app_id=62175d8b&app_key=2216b2fa6b85b5a7f25b112e694abcd4";
  const response = await fetch(url);
  const recipies = await response.json();
  data = recipies.hits;
  showRecipeData(recipies.hits);
}

function showRecipeData(data) {
  console.log(data[0].recipe.label);
  document.getElementById("sorting-btn").style.display = "block";
  const cardString = data.map(
    (card) => `
    <div class="card col-md-3" style="width: 18rem">
    <img src="${card.recipe.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${card.recipe.label}</h5>
      <p class="card-text">
        Source : ${card.recipe.source}
      </p>
      <div class="text-center my-3">
      <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#myModal"
      onclick='checkFunc(${JSON.stringify(card.recipe)})'
      data-toggle="modal"
      data-target="#myModal"
    >
      Open Modal
    </button>
    </div>
    </div>
  </div>`
  );

  document.getElementById("recipies").innerHTML = cardString;
}

function checkFunc(cardModal) {
  console.log(cardModal.label);
  showModal(cardModal);
}

function showModal(modalData) {
  var modelDiv = `<div
  class="modal fade"
  id="myModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${modalData.label}</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      <img src="${modalData.image}" class="card-img-top" alt="..." />
        <p>Clories : ${modalData.calories}</p>
        <p>Weight : ${modalData.totalWeight}</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>`;
  document.getElementById("modal-div").innerHTML = modelDiv;
}

function sortRecipies() {
  console.log(data);
  var sortedData = [...data.sort((a, b) => b.recipe.label - a.recipe.label)];
  document.getElementById("recipies").innerHTML = "";
  console.log(sortedData[0].recipe.label);
  showRecipeData(sortedData);
}
