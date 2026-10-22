const shipsContainer = document.querySelector("#starships");
const backLink = document.querySelector("#back-link");
const message = document.querySelector("#message");
const spinner = document.querySelector("#spinner");
const IMAGE_BASE = "https://starwars-visualguide.com/assets/img/starships";

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// Función para crear la tarjeta de la nave
function createStarship(ship, uid) {
  return `
      <article class="card">
        <img src="${IMAGE_BASE}/${uid}.jpg" alt="${ship.name || "Nave"}">
        <div class="container">
          <h2>${ship.name || "Sin dato"}</h2>
          <p>Modelo: ${ship.model || "Sin dato"}</p>
          <p>Clase: ${ship.starship_class || "Sin dato"}</p>
          <p>Fabricante: ${ship.manufacturer || "Sin dato"}</p>
        </div>
      </article>
    `;
}

// Función para cargar las naves
async function loadStarships(id) {
  shipsContainer.innerHTML = "";
  spinner.hidden = false;
  showMessage("Cargando naves...");
  backLink.href = `character.html?id=${id}`;

  try {
    const response = await getCharacter(id);

    if (!response.ok) {
      showMessage(
        `El servidor respondió ${response.status}. No se pudieron cargar las naves.`,
        true,
      );
      return;
    }

    const data = await response.json();
    const shipUrls = data.result.properties.starships;

    if (shipUrls.length === 0) {
      showMessage("Este personaje no tiene naves.");
      return;
    }

    let html = "";

    for (const url of shipUrls) {
      const shipResponse = await fetch(url);

      if (!shipResponse.ok) {
        showMessage(
          `El servidor respondió ${shipResponse.status}. No se pudo cargar una nave.`,
          true,
        );
        return;
      }

      const shipData = await shipResponse.json();
      html += createStarship(shipData.result.properties, shipData.result.uid);
    }

    // Verifica si es solo una sola nave
    let layout = "cards";
    if (shipUrls.length === 1) {
      layout = "single";
    }

    shipsContainer.innerHTML = `
      <h2>Naves espaciales (${shipUrls.length})</h2>
      <div class="${layout}">${html}</div>
    `;
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

const id = new URL(document.URL).searchParams.get("id");

if (id) {
  loadStarships(id);
} else {
  showMessage("No se indicó ningún personaje.", true);
}