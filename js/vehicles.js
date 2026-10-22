const vehiclesContainer = document.querySelector("#vehicles");
const backLink = document.querySelector("#back-link");
const message = document.querySelector("#message");
const spinner = document.querySelector("#spinner");
const IMAGE_BASE = "https://starwars-visualguide.com/assets/img/vehicles";

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// Función para crear la tarjeta del vehículo
function createVehicle(vehicle, uid) {
  return `
      <article class="card">
        <img src="${IMAGE_BASE}/${uid}.jpg" alt="${vehicle.name || "Vehículo"}">
        <div class="container">
          <h2>${vehicle.name || "Sin dato"}</h2>
          <p>Modelo: ${vehicle.model || "Sin dato"}</p>
          <p>Clase: ${vehicle.vehicle_class || "Sin dato"}</p>
          <p>Fabricante: ${vehicle.manufacturer || "Sin dato"}</p>
        </div>
      </article>
    `;
}

// Función para cargar los vehículos
async function loadVehicles(id) {
  vehiclesContainer.innerHTML = "";
  spinner.hidden = false;
  showMessage("Cargando vehículos...");
  backLink.href = `character.html?id=${id}`;

  try {
    const response = await getCharacter(id);

    if (!response.ok) {
      showMessage(
        `El servidor respondió ${response.status}. No se pudieron cargar los vehículos.`,
        true,
      );
      return;
    }

    const data = await response.json();
    const vehicleUrls = data.result.properties.vehicles;

    if (vehicleUrls.length === 0) {
      showMessage("Este personaje no tiene vehículos.");
      return;
    }

    let html = "";

    for (const url of vehicleUrls) {
      const vehicleResponse = await fetch(url);

      if (!vehicleResponse.ok) {
        showMessage(
          `El servidor respondió ${vehicleResponse.status}. No se pudo cargar un vehículo.`,
          true,
        );
        return;
      }

      const vehicleData = await vehicleResponse.json();
      html += createVehicle(
        vehicleData.result.properties,
        vehicleData.result.uid,
      );
    }

    // Verifica si solo hay un vehículo
    let layout = "cards";
    if (vehicleUrls.length === 1) {
      layout = "single";
    }

    vehiclesContainer.innerHTML = `
      <h2>Vehículos (${vehicleUrls.length})</h2>
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
  loadVehicles(id);
} else {
  showMessage("No se indicó ningún personaje.", true);
}