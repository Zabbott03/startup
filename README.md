# Snake Wars

[My Notes](notes.md)

A snake game where you try to eat "food pellets" to grow longer, while trying to not hit yourself, the walls, or other players.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Everybody has played the classic __Snake game__, where you try to grow your snake without bumping into your ever growing tail. The one thing that would make the game better is if you could play with your friends! With this app, you will be able to compete against your friends in real time! You will battle to be the longest, or you can try to take them out by having them run into you. Your scores will go onto a leaderboard with all of your friends, allowing your high score and win to be remembered, showing everyone who the best snake player is.

### Design


![Design image](<Screenshot 2025-01-14 at 5.03.42 PM.png>)

This is a (very) rough sketch of what the game page and the leaderboard page will look like.


### Key features

- create an account with a secure login
- ability to join a game with up to three other people
- ability to see high scores of yourself and others
- ability to change the color of your snake
- able to interact with other players with your snake as you play
- in-game counter with the score of all players
- host can start and end game
- third party service used to get facts about different kinds of snakes.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Used for the base structure of the app. Login page, leaderboard page, as well as the main game page
- **CSS** - Will be used to style the three pages. Will include visually pleasing color choice as well as proper spacing depending on the device screen size.
- **React** - Will be used to control the game and login and create an account. Also used to start and end the game, as well as add more players. 
- **Service** - Used to login and to retrieve position of each player's snake. Third party service call to get random snake facts.
- **DB/Login** - Will have the high score of each user in the database, displayed in the leaderboard. Also used to store the account info for each person after creating an account.
- **WebSocket** - Position of all snakes will be broadcast to each other player in real time.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://snakewars.click/).

## 🚀 HTML deliverable

For this deliverable I created the main layout of my application using HTML.

- [x] **HTML pages** - I created three differrent pages, one for each part of my website.
- [x] **Proper HTML element usage** - I properly used different HTML formatting elements to construct my application.
- [x] **Links** - I included links to each different page on my application, as well as a link to my repository.
- [x] **Text** - I put in placeholder text for each part of my website.
- [x] **3rd party API placeholder** - I included buttons that will in the future "communicate" with other people.
- [ ] **Images** - I did not have a relevant image to include.
- [x] **Login placeholder** - I have a login form on my home page.
- [x] **DB data placeholder** - As far as I understand, same thing as the login placeholders. Users input email and password which are then saved in the DB.
- [x] **WebSocket placeholder** - The blank canvas element will have the "snakes" inside communicating their position to the other players.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I included a header, footer, and main section in my application.
- [x] **Navigation elements** - I styled the links to each page to stand out and also change color when hovered over.
- [x] **Responsive to window resizing** - The website looks good when resized on a computer, however on mobile it still does not work great.
- [x] **Application elements** - I added and styled the different parts of my application including the main game canvas, the leaderboard, and the snake fact.
- [x] **Application text content** - I used a consistent video game style font across all pages, including text shadow to make the words more visible.
- [ ] **Application images** - I still don't have any images.

## 🚀 React part 1: Routing deliverable

For this deliverable I converted my html and css over to react using vite to bundle everything.

- [x] **Bundled using Vite** - I did this!
- [x] **Components** - I componentized each part of the app in its own jsx file.
- [x] **Router** - Routing between pages in the app

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Everything is working good! The game is functional, and I also added a local
    multiplayer checkbox option to kinda simulate what it will be like when playing online. I used localStorage for name and score as well.

- [x] **Hooks** - I used useEffect and useState to manage multiple variables across the entire application, as well as many within the game itself.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - This was done.
- [x] **Static middleware for frontend** - This was done.
- [x] **Calls to third party endpoints** - In my leaderboard.jsx file I call an animal facts api where I get snake information.
- [x] **Backend service endpoints** - I created multiple backend service points to handle account creation/login as well as update the leaderboard scores.
- [x] **Frontend calls service endpoints** - I completed this part of the deliverable, I have multiple fetch calls to the service endpoints in my login and leaderboard directories.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **User registration** - Users are able to register their account.
- [x] **User login and logout** - Users can login and logout of their account.
- [x] **Stores data in MongoDB** - The user's name and password are stored in MongoDB.
- [x] **Stores credentials in MongoDB** - The user's credentials are also stored in MongoDB.
- [x] **Restricts functionality based on authentication** - If a user is not logged in they cannot view the highscores.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
