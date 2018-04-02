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
      2. Server creates a new gameId and adds the gameId and users name to the 'games' object.  
      3. Server adds the socket to a new socket room labeled with the gameId.     
      4. Server emits room (gameId) to the user via the new private socket.    
         State updated:  
           - App container:   
             - gameId  
             - role  
             - activeGame  
             - message  
      5. Client updates view to 'Board/Scoreboard' view  
  - Join Game:
    User adds gameId to join and clicks 'Join':
      1. Client validates that gameId input contains text
      2. User's name and gameId are sent to server via socket.io
      3. Server looks up gameId in 'games' object and adds second user's name to game.
      4. Server adds socket to existing private game socket via the gameId
      5. Server emits gameId to user
      6. Server emits player info to both sockets in gameId room.
         - State Updated:
           - Board container:  
             - opponent present   
           - App container: 
             - opponent's name


       socket.emit('joinGame', data);
    io.in(room).emit('startGame', players);
  }); 

   

Express: Create node.js webserver. Is a level of abstraction above node.js http module. Simpler API set up and provides useful middleware 
  Middleware utilized: 
    - static: serve up static files