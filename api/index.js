// Simple REST API for Vercel Serverless Functions
const db = require('../db.json');

module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Content-Type', 'application/json');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Parse the URL path
    const urlPath = req.url.replace('/api', '').split('?')[0];
    const pathParts = urlPath.split('/').filter(p => p);

    // Root endpoint - list all resources
    if (pathParts.length === 0) {
        return res.status(200).json({
            message: 'API is working!',
            resources: Object.keys(db),
            endpoints: {
                mahasiswa: '/api/mahasiswa',
                dosen: '/api/dosen',
                matakuliah: '/api/matakuliah',
                kelas: '/api/kelas',
                krs: '/api/krs',
                user: '/api/user'
            }
        });
    }

    const resource = pathParts[0];
    const id = pathParts[1];

    // Check if resource exists
    if (!db[resource]) {
        return res.status(404).json({ error: `Resource '${resource}' not found` });
    }

    try {
        // GET all items or single item
        if (req.method === 'GET') {
            if (id) {
                // Get single item by ID
                const item = db[resource].find(item => item.id == id);
                if (!item) {
                    return res.status(404).json({ error: `Item with id ${id} not found` });
                }
                return res.status(200).json(item);
            } else {
                // Get all items (with optional filtering)
                let items = db[resource];

                // Simple query parameter filtering
                const query = req.url.split('?')[1];
                if (query) {
                    const params = new URLSearchParams(query);
                    items = items.filter(item => {
                        for (let [key, value] of params) {
                            if (item[key] != value) return false;
                        }
                        return true;
                    });
                }

                return res.status(200).json(items);
            }
        }

        // For POST, PUT, DELETE - return read-only message
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
            return res.status(405).json({
                error: 'Database is read-only in serverless mode',
                message: 'This API is read-only. To enable write operations, deploy JSON Server to Glitch or use a real database.',
                suggestion: 'See JSON_SERVER_FREE_DEPLOY.md for alternatives'
            });
        }

        // Method not allowed
        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};
