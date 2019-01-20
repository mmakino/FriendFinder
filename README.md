# Friend Finder - Node and Express Servers

### Overview

This "FriendFinder" application is basically a dating app based on personality compatibility via survey. The app will take in users' answers from the surveys, then compare their answers with those from other users. Then, it will display the name and picture of the user with the best overall match.

This full stack web site uses Express(Node.js) to handle routing to serve various endpoints. It is deployed at Heroku.

### Deployment and Availability

* Heroku
  * https://
* GitHub
  * https://mmakino.github.io/FriendFinder
  
### Description

1. `Main home page`
   1. A button to the survery page. 
   1. A hyper link to a list of friends in JSON format.
   1. A hyper link to this app in GitHub repository.
  
1. `Survey page`
   * Enter 1)your name and 2)a url link to your picutre. 
   * There are 10 questions. Please answer each question on a scale of 1 to 5 as to how much you agree or disagree to a question.
   * Please fill your name, provide a link to your picture, and answer __all the questions__  to see the best friend match result.
   * __The best match result__
      * A friend with the most compatible answers to survery will be displayed.
    
### Directories & Files
```
FriendFinder
├── README.md                              -- this file
├── app
│   ├── data
│   │   ├── friends-init.js                -- initial mock survey data
│   │   └── friends.js                     -- active survey data
│   ├── public
│   │   ├── css
│   │   │   ├── style.css                  -- CSS for home.html
│   │   │   └── style_survey.css           -- CSS for survey.html
│   │   ├── home.html                      -- The main web page
│   │   ├── images
│   │   │   └── friends-vector-icon-10.jpg -- background used in the main web page
│   │   └── survey.html                    -- The survery web page
│   └── routing
│       ├── apiRoutes.js                   -- Javascript codes for API routes
│       └── htmlRoutes.js                  -- Javascript for routing HTML pages
├── homework_instructions.md               -- source instructions/requirements
├── package.json                           -- NPM JSON package file
└── server.js                              -- The back-end server Javascript codes

6 directories, 13 files
```

#### Written by [Motohiko Makino](https://mmakino.github.io/)