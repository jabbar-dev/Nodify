const express = require('express');
const app = express();
const path = require('path');
const PORT  = process.env.PORT || 3500;
const routes = require('./routes/dir');
const employees = require('./routes/api/employees');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/dir', routes)
app.use('/employees', employees)

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname,'views','index.html'));
// });         

app.listen(PORT, () => console.log("Server is running on port " + PORT));