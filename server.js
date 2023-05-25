/**
 * Server JavaScript File
 * TODO: Make sure vite is installed!
 * Execute with node server.js
 * Install vite with npm install vite
 */

const { createServer } = require('vite');

// Reads port out of a .env file. if it does not exist, use a default port.
require('dotenv').config();
const port = process.env.PORT || 8080;

async function startServer() {
    const server = await createServer({
        server: {
        port: port, // Specify the desired port number
        },
    });

    await server.listen(); // Start the server

    console.log(`Server running at http://localhost:${port}`);
}

startServer().catch((error) => {
    console.error(error);
    process.exit(1);
});
