
'use strict';

const fs = require('fs');
let friends = require('../data/friends');

const APIROutes = function() {

}
//
// Routes to API endpoints
//
class APIRoutes {
  //
  // PARAM:
  // * app = an express application instance
  //
  constructor(exprApp) {
    this.app = exprApp;   // express app
  }
 
  //
  // API to display a JSON of all possible friends.
  //
  getFriends() {
    this.app.get('/api/friends', (req, res) => {
      res.json(friends);
    });
  }
  
  //
  // API to handle incoming survey results.
  //
  postFriends() {
    this.app.post('/api/friends', (req, res) => {
      console.log(req.body);
      // { name: '',
      // photo: '',
      // scores: [ '3', '3', '2', '2', '2', '2', '2', '5', '5', '2' ] } 
      let scores = req.body.scores.map(n => parseInt(n));
      let matchIndex = this.findMatch(scores);
      let bestMatch = {
        name: friends[matchIndex].name,
        photo: friends[matchIndex].photo
      }
      res.send(bestMatch);
      
      // Store this new person's data into data/friends.js 
      this.addPerson(req.body);
    });
  }
  
  //
  // Add a new person into the friends data
  //
  addPerson(personInfo) {
    friends.push(personInfo);
    let data = 'let friends = ' + JSON.stringify(friends) + "\n"
                + 'module.exports = friends;';
    console.log(data);
    
    fs.writeFile(__dirname + '/../data/friends.js', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
  
  //
  // Find match
  //
  findMatch(scores) {
    let match = null;
    let minDiff = 100;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for(let i = 0; i < friends.length; i++) {
      let diff = [];
      for(let j = 0; j < 10; j++) {
        diff.push(Math.abs(friends[i].scores[j] - scores[j]));
      }
      let totalDifference = diff.reduce(reducer);
      console.log(friends[i].scores, totalDifference, friends[i].name);
      if (totalDifference < minDiff) {
        match = i; 
        minDiff = totalDifference; 
      }
    }
    
    return match;
  }
}

// Export the class
module.exports = APIRoutes;
