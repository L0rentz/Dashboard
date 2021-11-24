const express = require('express');
const server = express();
const bodyParser  = require('body-parser');
const port = 8080;
const path = require('path');
const { body, validationResult } = require('express-validator');

// Include ressources
server.use(express.static(__dirname + '/../public'))
server.use(express.static(__dirname + '/../node_modules'))

// Start the server
server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

// Send the login form
server.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/../public/index.html'));
});

// Send the dashboard
server.get('/dashboard', function(request, response) {
	response.sendFile(path.join(__dirname + '/../public/pages/dashboard.html'));
});

// Parse URL-encoded bodies (as sent by HTML forms)
server.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
server.use(bodyParser.json());

// Access the parse results as request.body
server.post('/login',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    (request, response) => {
        console.log(request.body);
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        response.status(200).json({
            success: true,
            route: '/dashboard'
        })
    }
);