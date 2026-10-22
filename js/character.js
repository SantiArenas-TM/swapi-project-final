const characterDetails = document.querySelector("#character-details");
const message = document.querySelector("#message");
const spinner = document.querySelector("#spinner");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// Función para crear la información del personaje
function createCharacterInfo(character, image, id) {
  const name = character.properties.name;
  const imageHtml = image
    ? `<img src="${image}" alt="${name}">`
    : `<p>Sin imagen</p>`;

  return `
      ${imageHtml}
      <div class="info">
        <h2>${name}</h2>
        <p><strong>Año de Nacimiento: </strong> ${character.properties.birth_year || "Sin dato"}</p>
        <p><strong>Género</strong> ${character.properties.gender || "Sin dato"}</p>
        <p><strong>Altura</strong> ${character.properties.height || "Sin dato"}</p>
      </div>
      <ul class="secondary">
        <li><a href="world.html?id=${id}">Mundo originario</a></li>
        <li><a href="starships.html?id=${id}">Naves</a></li>
        <li><a href="vehicles.html?id=${id}">Vehículos</a></li>
        <li><a href="films.html?id=${id}">Películas</a></li>
      </ul>
    `;
}

// Función para cargar el personaje
async function loadCharacter(id) {
  characterDetails.innerHTML = "";
  spinner.hidden = false;
  showMessage("Cargando personaje...");

  try {
    const response = await getCharacter(id);

    if (!response.ok) {
      showMessage(
        `El servidor respondió ${response.status}. No se pudo cargar el personaje.`,
        true,
      );
      return;
    }

    const data = await response.json();
    const character = data.result;

    let image = "";
    const imageResponse = await getImage(id);

    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      image = imageData.image;
    }

    document.title = character.properties.name;
    characterDetails.innerHTML = createCharacterInfo(character, image, id);
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

// Función para obtener el id del personaje
const id = new URL(document.URL).searchParams.get("id");

// Función para cargar el personaje con el id
if (id) {
  loadCharacter(id);
} else {
  showMessage("No se indicó ningún personaje.", true);
}