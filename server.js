
'use strict';

// Prepare all necessary packages/modules
const express = require('express');
const path = require('path');
const HTMLRoutes = require('./app/routing/htmlRoutes');
const APIRoutes = require('./app/routing/apiRoutes');

const PORT = process.env.PORT || 3003;

// Initialize Express app and routes
const app = express();
const htmlRoutes = new HTMLRoutes(app);
const apiRoutes = new APIRoutes(app);

// set a directory path for files of this application
const publicDir = path.join(__dirname, 'app', 'public');

// make use of the precious middlewares
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));                                        
app.use(express.json());       

// set up routes
htmlRoutes.home(path.join(publicDir, 'home.html'));
htmlRoutes.survey(path.join(publicDir, 'survey.html'));
apiRoutes.getFriends();
apiRoutes.postFriends();

// start the server
app.listen(PORT, function() {
  console.log(`server listining on port ${PORT}`);
});

