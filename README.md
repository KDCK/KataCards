Welcome To Kata Cards
---

Kata Cards is a card collecting and battling app that is built on top of codewars. The goal is to incentivize programmers to practice algorithms. Each new user attaches their existing codewars account to their Kata Cards account. They are give a randomized start set of cards and 20 gold. Extra gold can be redeemed through the number of challenges completed on codewars. The more you complete. The more gold you can redeem for a chance at stronger cards.

Battling
---

-Users Enter Battle by joining the queue on their home screen
-Once two players are enqueue they are pushed to the staging area
-At the staging area, users are prompted to select 5 cards from their deck to bring into battle
-Once both users are ready the battle beings.
-In a turn-based system, users are prompted to place 4 of the cards they selecte onto the gameboard.
-When all cards are submitted, the total defense of the opponent is subtracted from the attack of the user. The highest attack wins. 

Stack
---
Firebase, Node, React, Firebase Connect

Getting Started
---
To get started with Kata Cards simply fork and clone the repo.

###Firebase Setup

To attach your firebase db add a config file in src with the following:

```
const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_FIREBASE_DB",
  databaseURL: "YOUR_FIREBASE_DB",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID"
};

export default config
```
