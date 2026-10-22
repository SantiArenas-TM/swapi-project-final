const PEOPLE_API = "https://www.swapi.tech/api/people";
const IMAGE_API = "https://akabab.github.io/starwars-api/api/id"; // Fuente para las imágenes de los personajes

// Función para buscar los personajes por el nombre
function searchCharacters(name) {
  return fetch(`${PEOPLE_API}/?name=${name}`);
}

// Función para traer u obtener el personaje por su id
function getCharacter(uid) {
  return fetch(`${PEOPLE_API}/${uid}`);
}

// Función para trae la imagen de un personaje por su número
function getImage(uid) {
  return fetch(`${IMAGE_API}/${uid}.json`);
}