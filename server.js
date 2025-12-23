import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Persistent data directory (Railway volume or local)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const INITIAL_DB = path.join(__dirname, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`Created data directory: ${DATA_DIR}`);
}

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    console.log('Initializing database from template...');
    fs.copyFileSync(INITIAL_DB, DB_FILE);
    console.log(`Database initialized at: ${DB_FILE}`);
} else {
    console.log(`Using existing database at: ${DB_FILE}`);
}

const server = jsonServer.create();
const router = jsonServer.router(DB_FILE); // Use persistent DB file
const middlewares = jsonServer.defaults({
    static: './dist'
});

const PORT = process.env.PORT || 3001;

// Enable CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(middlewares);

// Custom routes if needed
server.use(jsonServer.bodyParser);

// Add custom middleware before router
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    if (req.method === 'PUT' || req.method === 'PATCH') {
        req.body.updatedAt = Date.now();
    }
    next();
});

server.use(router);

// Graceful shutdown - save data before exit
process.on('SIGTERM', () => {
    console.log('SIGTERM received, saving database...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, saving database...');
    process.exit(0);
});

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
    console.log(`Database location: ${DB_FILE}`);
    console.log(`Access the API at http://localhost:${PORT}`);
});
