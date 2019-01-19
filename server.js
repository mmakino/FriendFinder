
'use strict';

const express = require('express');
const path = require('path');
const HTMLRoutes = require('./app/routing/htmlRoutes');
const APIRoutes = require('./app/routing/apiRoutes');

const PORT = process.env.PORT || 3003;

const app = express();
const htmlRoutes = new HTMLRoutes(app);
const apiRoutes = new APIRoutes(app);

const publicDir = path.join(__dirname, 'app', 'public');

app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));                                        
app.use(express.json());       

htmlRoutes.home(path.join(publicDir, 'home.html'));
htmlRoutes.survey(path.join(publicDir, 'survey.html'));
apiRoutes.getFriends();
apiRoutes.postFriends();

app.listen(PORT, function() {
  console.log(`server listining on port ${PORT}`);
});

