const filmsContainer = document.querySelector("#films");
const backLink = document.querySelector("#back-link");
const message = document.querySelector("#message");
const spinner = document.querySelector("#spinner");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// Función para crear la tarjeta de la película en una lista
function createFilm(film) {
  return `
      <li class="film">
        <span><strong>${film.title || "Sin dato"}</strong></span>
        <span>${film.release_date || "Sin dato"}</span>
        <p>${film.opening_crawl || "Sin descripción"}</p>
      </li>
    `;
}

// Función para cargar la lista de las películas
async function loadFilms(id) {
  filmsContainer.innerHTML = "";
  spinner.hidden = false;
  showMessage("Cargando películas...");
  backLink.href = `character.html?id=${id}`;

  try {
    const response = await getCharacter(id);

    if (!response.ok) {
      showMessage(
        `El servidor respondió ${response.status}. No se pudieron cargar las películas.`,
        true,
      );
      return;
    }

    const data = await response.json();
    const filmUrls = data.result.properties.films;

    if (filmUrls.length === 0) {
      showMessage("Este personaje no aparece en ninguna película.");
      return;
    }

    let html = "";

    for (const url of filmUrls) {
      const filmResponse = await fetch(url);

      if (!filmResponse.ok) {
        showMessage(
          `El servidor respondió ${filmResponse.status}. No se pudo cargar una película.`,
          true,
        );
        return;
      }

      const filmData = await filmResponse.json();
      html += createFilm(filmData.result.properties);
    }

    filmsContainer.innerHTML = `
      <h2>Películas (${filmUrls.length})</h2>
      <ul class="film-list">${html}</ul>
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

// Función para obtener el id del personaje
const id = new URL(document.URL).searchParams.get("id");

// Función para cargar la lista de películas del personaje con el id
if (id) {
  loadFilms(id);
} else {
  showMessage("No se indicó ningún personaje.", true);
}