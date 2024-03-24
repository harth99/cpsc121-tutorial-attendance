// index.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;


// Function to save student records to a CSV file
function saveToCSV() {
    const csvData = students.map(student => `${student.lastName},${student.firstName},${student.studentNumber}`).join('\n');
    fs.writeFile('students.csv', csvData, err => {
        if (err) {
            console.error('Error writing to CSV:', err);
        } else {
            console.log('Student records saved to students.csv');
        }
    });
}


// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Array to store student data
let students = [];

// Route to serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { lastName, firstName, studentNumber } = req.body;

    // Check if last name and first name are not empty
    if (!lastName || !firstName) {
        return res.status(400).send('Last name and first name are required.');
    }

    // Check if student number is a string of 8 digits
    if (!/^\d{8}$/.test(studentNumber)) {
        return res.status(400).send('Student number must be an 8-digit number.');
    }

    students.push({ lastName, firstName, studentNumber });

    // Save to CSV after pushing the student record
    saveToCSV();

    res.redirect('/');
});


// Route to get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
