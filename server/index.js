const express = require('express');
const server = express();
const bodyParser  = require('body-parser');
const port = 8080;
const path = require('path');
const { body, validationResult } = require('express-validator');

// Login form
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '../client/index.html'));
});

// Parse URL-encoded bodies (as sent by HTML forms)
server.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
server.use(bodyParser.json());

// Access the parse results as request.body
server.post('/',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        response.status(200).json({
            success: true,
            message: 'Login successful',
        })
    }
);

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})