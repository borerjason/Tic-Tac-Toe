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
 ---- Welcome  
 |  
 ---- Home  
 |  
 ---- Board  
 |      |  
 |      BoardPiece  
 |  
 ---- Scoreboard  

### Three Routes/Views:
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

### App:
Maintains the state of the user's current session. State includes the user's personal information (name, role('X' or 'O'), userWins ), opponent's information (opponent's name, opponent's wins), and session information (gameId, activeGame).

### Welcome:
User 'signs in' by submitting their name. Their name is saved in state in the parent App container.

### Home:
User has the option to create a new game or join an existing game.
  - New Game:  
    User clicks 'New Game':  
      1. User's name is sent to server via socket.io.  
      2. The server creates a new room and adds the users name.   
      3. Server sends back the room (gameId) to the user  
         State updated:  
           - App container:   
             - gameId  
             - role  
             - activeGame  
             - message  
      4. Client updates view to 'Board/Scoreboard' view  
  -   

   

Express: Create node.js webserver. Is a level of abstraction above node.js http module. Simpler API set up and provides useful middleware 
  Middleware utilized: 
    - static: serve up static files