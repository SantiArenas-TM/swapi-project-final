const worldContainer = document.querySelector("#world");
const backLink = document.querySelector("#back-link");
const message = document.querySelector("#message");
const spinner = document.querySelector("#spinner");
const IMAGE_BASE = "https://starwars-visualguide.com/assets/img/planets";

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// Función para crear la tarjeta del mundo
function createWorld(planet, uid) {
  return `
      <article class="card">
        <img src="${IMAGE_BASE}/${uid}.jpg" alt="${planet.name || "Mundo"}">
        <div class="container">
          <h2>${planet.name || "Sin dato"}</h2>
          <p>Clima: ${planet.climate || "Sin dato"}</p>
          <p>Terreno: ${planet.terrain || "Sin dato"}</p>
          <p>Población: ${planet.population || "Sin dato"}</p>
          <p>Diámetro: ${planet.diameter || "Sin dato"}</p>
          <p>Gravedad: ${planet.gravity || "Sin dato"}</p>
        </div>
      </article>
    `;
}

// Función para cargar el mundo
async function loadWorld(id) {
  worldContainer.innerHTML = "";
  spinner.hidden = false;
  showMessage("Cargando mundo...");
  backLink.href = `character.html?id=${id}`;

  try {
    const response = await getCharacter(id);

    if (!response.ok) {
      showMessage(
        `El servidor respondió ${response.status}. No se pudo cargar el mundo.`,
        true,
      );
      return;
    }

    const data = await response.json();
    const homeworldUrl = data.result.properties.homeworld;

    if (!homeworldUrl) {
      showMessage("Este personaje no tiene mundo originario registrado.");
      return;
    }

    const worldResponse = await fetch(homeworldUrl);

    if (!worldResponse.ok) {
      showMessage(
        `El servidor respondió ${worldResponse.status}. No se pudo cargar el mundo.`,
        true,
      );
      return;
    }

    const worldData = await worldResponse.json();
    worldContainer.innerHTML = createWorld(
      worldData.result.properties,
      worldData.result.uid,
    );
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
  loadWorld(id);
} else {
  showMessage("No se indicó ningún personaje.", true);
}