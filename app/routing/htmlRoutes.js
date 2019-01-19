
'use strict';

//
// Routes to HTML pages
//
class HTMLRoutes {
  //
  // PARAM:
  // * app = an express application instance
  //
  constructor(exprApp) {
    this.app = exprApp;   // express app
  }
 
  //
  // Default catch-all route leading to home.html
  //
  // PARAM:
  // * htmlFile = path to an html file to display
  //
  home(htmlFile) {
    // this.app.all(/\/.*/, (req, res) => {
    this.app.all('/', (req, res) => {
      res.sendFile(htmlFile);
    });
  }
  
  //
  // Create /survey route to display the survey page
  //
  // PARAM:
  // * htmlFile = path to an html file to display
  //
  survey(htmlFile) {
    this.app.get('/survey', (req, res) => {
      res.sendFile(htmlFile);
    });
  }
}

// Export the class
module.exports = HTMLRoutes;
