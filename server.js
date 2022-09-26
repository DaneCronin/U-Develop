const express = require('express');


//Adding PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

//Add Express.js middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Route to handle user requests that are unsupported - Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});


//Add function to start express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});