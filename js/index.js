const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const resultCount = document.querySelector("#result-count");
const cardContainer = document.querySelector("#content");
const message = document.querySelector("#message");
const spinner = document.querySelector("#spinner");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// Función para crear la tarjeta del personaje con sus datos
function createCard(character, image) {
<<<<<<< Updated upstream
  const name = character.properties.name;
  const gender = character.properties.gender || "Sin dato";
  const imageHtml = image
    ? `<img src="${image}" alt="${name}">`
    : `<p>Sin imagen</p>`;
=======
    const name = character.properties.name;
    const gender = character.properties.gender || "Sin dato";
    const birthYear = character.properties.birth_year || "Sin dato";
    const height = character.properties.height || "Sin dato";
    const imageHtml = image ?
        `<img src="${image}" alt="${name}">` :
        `<p>Sin imagen</p>`;
>>>>>>> Stashed changes

  return `
        <a class="card-link" href="character.html?id=${character.uid}">
            <article class="card">
                ${imageHtml}
                <div class="container">
                    <h2>${name}</h2>
                    <p>Género: ${gender}</p>
                    <p>Año de Nacimiento: ${birthYear}</p>
                    <p>Altura: ${height}</p>
                </div>
            </article>
        </a>
    `;
}

<<<<<<< Updated upstream
// Función para poner todas las tarjetas de todos los personajes
async function showCharacters(results) {
  let html = "";

  for (const character of results) {
    let image = "";
    const imageResponse = await getImage(character.uid);
=======
// Función para poner todas las tarjetas de los personajes
async function showCharacters(characters) {
    let html = "";

    for (const character of characters) {
        let image = "";
        const imageResponse = await getImage(character.uid);
>>>>>>> Stashed changes

    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      image = imageData.image;
    }

    html += createCard(character, image);
  }

  cardContainer.innerHTML = html;
}

<<<<<<< Updated upstream
// Función para buscar los personajes por medio del nombre
async function runSearch(name) {
  cardContainer.innerHTML = "";
  resultCount.textContent = "";
  spinner.hidden = false;
  showMessage("Buscando personajes...");
=======
// Función para empezar a cargar: limpia la pantalla y muestra el spinner
function startLoading(text) {
    cardContainer.innerHTML = "";
    resultCount.textContent = "";
    spinner.hidden = false;
    showMessage(text);
}

// Función para cargar todos los personajes al abrir la página
async function loadAllCharacters() {
    startLoading("Cargando personajes...");

    try {
        const response = await getAllCharacters();

        if (!response.ok) {
            showMessage(
                `El servidor respondió ${response.status}. No se pudieron cargar los personajes.`,
                true,
            );
            return;
        }

        const data = await response.json();
        const characters = data.results;

        resultCount.textContent = `${characters.length} personajes`;
        await showCharacters(characters);
        showMessage("");
    } catch (error) {
        showMessage(
            "No hay conexión con el servidor. Revise su internet e intente de nuevo.",
            true,
        );
    } finally {
        spinner.hidden = true;
    }
}

// Función para buscar los personajes por medio del nombre
async function runSearch(name) {
    startLoading("Buscando personajes...");
>>>>>>> Stashed changes

  try {
    const response = await searchCharacters(name);

    if (!response.ok) {
      showMessage(
        `El servidor respondió ${response.status}. No se pudo buscar. Intente de nuevo.`,
        true,
      );
      return;
    }

    const data = await response.json();
    const results = data.result;

    if (results.length === 0) {
      showMessage(`No hay resultados para «${name}».`);
      return;
    }

    resultCount.textContent = `${results.length} resultados`;
    await showCharacters(results);
    showMessage("");
  } catch (error) {
    showMessage(
      "No hay conexión con el servidor. Revise su internet e intente de nuevo.",
      true,
    );
  } finally {
    spinner.hidden = true;
  }
}

// Función para buscar los personajes al presionar el botón
searchButton.addEventListener("click", () => {
  const name = searchInput.value.trim();

  if (name) {
    runSearch(name);
  } else {
    showMessage("Escriba el nombre de un personaje.", true);
  }
});

<<<<<<< Updated upstream
showMessage("Escriba el nombre de un personaje para buscar.");
=======
// Al abrir la página se ven todas las tarjetas
loadAllCharacters();
>>>>>>> Stashed changes
