# React Image Gallery
_Duration: 48 hour sprint_

## Description

Gallery images with descriptions appearing as reversible cards.

## Built With

- Node.js 
- React.js 
- Axios 
- Express 
- Database manager

### Prerequisites

Required software dependencies:

- [Node.js](https://nodejs.org/en/)
- [React.js] (https://react.dev/)
- [Axios] (https://axios-http.com/)
- [Express] (https://expressjs.com/)

### Installing

Steps to get the development environment running.
(Prior to Deployment on Heroku...)

1. Clone this repository.
2. Open and run npm install.
3. Use SQL file to set up the database. 
4. Run `npm run server` in a terminal
6. Run `npm run client` in a separate terminal.
5. Navigate to http://localhost:5001/
  (Admin page at http://localhost:5001/admin)


## Acknowledgments

Thank you to [Prime Digital Academy](www.primeacademy.io) 

Color Palette derived from: https://stephcorrigan.com/blue-color-palettes/

## iPhone app / GitHub Pages

The original gallery is now also a standalone, offline web app:

**https://tompinataro.github.io/React-Image-Gallery/**

1. Open that link in **Safari on your iPhone**.
2. Tap **Share** (the square with an upward arrow).
3. Choose **Add to Home Screen**. If offered, leave **Open as Web App** on.
4. Keep or edit the name **Tom's Garden**, then tap **Add**.

The launcher and favicon use the original Red Zinnia photo (`IMG_4118.jpg`).
Wait for “Ready for offline viewing” on the first online visit before using the
app without a connection. All 20 original photos and descriptions are bundled.
Likes are saved per device/browser rather than in the old shared database;
clearing website data clears those likes. A new home-screen app may have its own
storage separate from Safari. No account or server is required.

### Develop and publish the static app

- `npm ci --ignore-scripts`
- `npm run client` (Vite development server)
- `npm run test:static` (local-storage tests)
- `npm run build` (production app plus versioned offline cache in `build/`)
- `sh scripts/publish-pages.sh` (test, build, publish generated files to `gh-pages`)

GitHub Pages is configured for the `gh-pages` branch, root folder. Run the publish
script after future source changes. The old Express/Postgres source and original
SQL seed remain in the repository for historical reference; the Pages app does
not use them. The legacy `npm test` Cypress suite requires the old server/database
and fixture data and is not the static-app verification command.

Updates activate after existing gallery windows close. Reopen the app online to
receive new versions. The offline cache is scoped to this app's path.
