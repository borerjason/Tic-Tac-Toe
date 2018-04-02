## Tic-Tac-Toe Challenge 

> A web application that allows two users to play tic-tac-toe.  


## Usage

Once you have forked & cloned the repo to your own machine:

Install dependencies:
```sh
npm install
```
Start server:
```sh
npm start
```

## Transpiling / Scripts
Webpack is used to bundle the client side code into a single file. It utilizes Babel to transpile ES6 code to ES5 code. 

In a new terminal tab cd into the repo and run the follow command:

Build client:
```sh
npm run build
```

## Main Technologies

- node.js 
- express
- socket.io
- react
- react-router
- styled-components

## Front-End Architecture

Containers: 

App 
 | 
 -- Welcome 
 | 
 -- Home 
 | 
 -- Board 
 |    | 
 |    -- BoardPiece 
 | 
 -- Scoreboard 

 Three Routes/Views:
   1. '/' (Welcome)
     User Interactions: 
        - Enter name to 'sign in'

   2. '/home' (Home)
     User Interactions:
        - Start new game
        - Join existing game 

   3. '/game' (Board/ScoreBoard)
     User Interactions:
        - Play game

 ## Design Decisions:

  App:
  ```sh
   Maintains the state of the user's current session. State includes the user's personal information (name, role('X' or 'O'), userWins ), opponents information (opponents name, opponents wins), and session information (gameId, activeGame).
  ```
   
    
    


Express: Create node.js webserver. Is a level of abstraction above node.js http module. Simpler API set up and provides useful middleware 
  Middleware utilized: 
    - static: serve up static files