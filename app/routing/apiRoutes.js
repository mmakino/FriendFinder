
'use strict';

const fs = require('fs');
let friends = require('../data/friends');

//
// Routes to API endpoints
//
class APIRoutes {
  //
  // PARAM:
  // * exprApp = an express application instance
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
  // { name: 'name',
  //   photo: 'https://www.picutre.com/my.png',
  //   scores: [ '3', '3', '2', '2', '2', '2', '2', '5', '5', '2' ] } 
  //
  postFriends() {
    this.app.post('/api/friends', (req, res) => {
      console.log(req.body);
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
    // convert the scores to integers
    personInfo.scores = personInfo.scores.map(score => parseInt(score));
    // add the new person to friends data in memory
    friends.push(personInfo);
    
    // Make the object ready for reloading
    let data = 'let friends = ' + JSON.stringify(friends, null, 2) + "\n"
                + 'module.exports = friends;';
    // console.log(data);
    
    // Write back into the file
    fs.writeFile(__dirname + '/../data/friends.js', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
  
  //
  // Find match
  //
  // RETURN:
  // * an index of the match in the "friends" array data
  //
  findMatch(scores) {
    let match = null;   // index of the current best match 
    let minDiff = 100;  // init the minimum difference

    for(let i = 0; i < friends.length; i++) {
      let totalDifference = 0;
      for(let j = 0; j < 10; j++) {
        totalDifference += Math.abs(friends[i].scores[j] - scores[j]);
      }
      console.log(friends[i].scores, totalDifference, friends[i].name);
      
      // IF the difference is smaller than the current least difference
      // THEN 1)set the best match index to the current person
      //      2)update the min diff with this diff
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
