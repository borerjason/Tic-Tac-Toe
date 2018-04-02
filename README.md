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

Webpack is used to bundle the client side code into a single file. It utilizes Babel to transpile ES6 code to ES5 code. 

In a new terminal window/tab, cd into the repo.

Build client:
```sh
npm run build
```

Open two tabs in your browser, one for each player:
```sh
localhost:3000
```
Have fun!

## Main Technologies

- node.js 
- express
- socket.io
- react
- react-router
- styled-components

## Game Design  
  The Tic Tac Toe board is represented in state as a 2-D array. The board is viewed and constructed as an array of BoardPiece components. Each piece has as props, its index in the array, its value, and its respective location in the state array. 
  
  When the user clicks on a BoardPiece the application first validates the move by checking if:  
    1. There is currently not a winner  
    2. There is currently not a tie  
    3. The BoardPiece does not have a value  
    4. There is more than 1 player in the game  
    5. It is the correct player's turn to play  

  Once the move is validated the application checks to see if the game has a winner. The check will only be initiated if there have been at least 5 plays, the minimum number of total plays required for a winner.

  The row and column of the placed piece is recorded. A winning game occurs if all pieces in the board's respective column, row, or a diagonal match the users role ('X' or 'O') value.   

  If a winner is identified the usersWins total is incremented. If there is a winner or a tie the players have the option to start a new game. Once one user initiates a new game the board is reset for both users.

## Front-End Architecture

Containers: 

App  
 |  
 ---- Welcome  
 |  
 ---- Home  
 |  
 ---- Board --- BoardPiece  
 |  
 ---- Scoreboard  
 |  
 --- Messages 

### Three Routes/Views:
   1. '/' (Welcome)  
     User Interactions:  
        - Enter name to 'sign in'  
  
   2. '/home' (Home)  
     User Interactions:  
        - Start new game  
        - Join existing game   

   3. '/game' (Board/ScoreBoard/Messages)  
     User Interactions:  
        - Play game  
        - Chat with opponent  

## Design and User Flow:

### App:
Maintains the state of the user's current session. State includes the user's personal information (name, role('X' or 'O'), userWins ), opponent's information (opponent's name, opponent's wins), and session information (gameId).

### Welcome:
User 'signs in' by submitting their name. The name is saved in state in the parent App container.

### Home:
User has the option to create a new game or join an existing game. The userId is saved in state and is transmitted to the server when the user joins an existing game. 
    
    User clicks 'New Game':  
      1. User's name is sent to server via socket.io.  
      2. Server creates a new gameId and adds the gameId and user's name to the 'games' object.  
      3. Server adds the socket to a new socket room labeled with the gameId.     
      4. Server emits room (gameId) to the user via the new private socket.    
         State updated:  
           - App container:   
             - gameId  
             - role   
             - message  
      5. Client updates view to 'Board/Scoreboard' view  
  
    User adds gameId to join and clicks 'Join':
      1. Client validates that gameId input contains text  
      2. User's name and gameId are sent to server via socket.io  
      3. Server looks up gameId in 'games' object and adds second user's name to game.  
      4. Server adds socket to existing private game socket via the gameId  
      5. Server emits gameId to user  
      6. Server emits player info to both sockets in gameId room.  
         - State updated:  
           - Board container:    
             - opponent from false to true  
           - App container:   
             - opponent's name  
             - Role (opponent)  
             - gameId (opponent)  

 ### Board  
 Maintains the state of the individual game. Validates moves and sends updates to the server via socket.io to emit to the other user. State includes the Board, next players turn, total number of plays played, winner status, if there is an opponent present, and the size of the board. I added a state variable n to represent the size of the board so future iterations of the app can have board sizes of different dimensions. The current board is set to a fixed size of 3.

 The Board container also triggers the scoreboard update, updates the opponents name, and updates the alert message via functions passed down from the App container as props. 

## Styling  

I utilized the styled-components library to optimize for resusable styled DOM elements. Elements that are used in more than one container are saved in the parent 'components' folder. Elements that are specific to one container are saved within their respective container's folder.  
 
## Testing  

State functions and game play functions were tested with jest.

Run tests:
```sh
npm run test
```

## Improvements
I would love to continue learning about socket.io and eventually add the following featuers: 
   - Server validates the gameId when second player joins  
   - Server ensures only two players are allowed per game  
   - Server deletes game from 'games' object when users disconnect  
   - Users are notified when the other player disconnects  
   - Socket.io code is modular and organized separately from main server file  

## Known Issues:
  - client/server rendering: If refresh browser on any route other than '/' route receive error. 

