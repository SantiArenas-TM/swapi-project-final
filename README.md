# SWAPI: Personajes de Star Wars

Aplicación web en HTML, CSS y JavaScript puro que muestra los personajes de Star Wars de la API pública [SWAPI](https://www.swapi.tech) y permite buscarlos por nombre. Cada tarjeta lleva a la ficha del personaje, con sus películas, naves, vehículos y mundo originario.

## Cómo se abre

Con la extensión Live Server de VS Code: abrir la carpeta del proyecto y luego abrir `index.html`.

## Cómo provocar cada estado

- **Cargando:** F12 → Network → «Slow 4G», y luego recargar la página o buscar.
- **Con datos:** abrir la página o buscar `luke`.
- **Sin resultados:** buscar `zzzzqq`.
- **Error del servidor:** en `js/api.js`, cambiar `PEOPLE_API` por `https://www.swapi.tech/api/peoplex` y recargar.
- **Sin conexión:** F12 → Network → «Offline», y luego buscar.

# Integrantes:
- Julián Andrés Arbeláez Ríos
- Santiago Arenas Rios
- David Giraldo Henriet