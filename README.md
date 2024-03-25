# Flashcards Project

![npm](https://img.shields.io/npm/v/npm)
![node](https://img.shields.io/node/v/react)

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Commands](#commands)
5. [Testing](#testing)
6. [Screens](#screens)

## Description

This project is designed to test your ability to work with rendering and state management using React. Before you undertake this project, you should be able to comfortably:

- Install packages via NPM
- Run tests from the command line
- Write React function components
- Create routes, including nested routes, using React Router
- Use hooks like `useState()`, `useParams()`, and `useHistory()`
- Debug React code through console output and using the VS Code debugger

## Installation

Follow the instructions below to get this project up and running on your own machine:

1. Download the Qualified assessment files to your computer.
2. Navigate to the directory in your terminal.
3. Run `npm install` to install the required project dependencies.

## Usage

`npm start` is used to start the application. This starts two servers concurrently:

- An API server, powered by json-server, running on `http://localhost:5000`
- A React application running on `http://localhost:3000`

To stop the running servers from your terminal, you can press `Control+C`.

## Commands

- `npm test`: To run the test files
- `npm start`: To start the API server and the React application simultaneously

## Testing

To run the tests for this project, you can run the `npm test` command. The tests will initially run slowly because they wait for content to load via the API. They will speed up as you near completion of the project.

## Screens

- **Home**: Shows a list of decks with options to create, study, view, or delete a deck. (/)
- **Study**: Allows the user to study the cards from a specific deck. (/decks/:deckId/study)
- **Create Deck**: Allows the user to create a new deck. (/decks/new)
- **Deck**: Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck. (/decks/:deckId)
- **Edit Deck**: Allows the user to modify information on an existing deck. (/decks/:deckId/edit)
- **Add Card**: Allows the user to add a new card to an existing deck. (/decks/:deckId/cards/new)
- **Edit Card**: Allows the user to modify information on an existing card. (/decks/:deckId/cards/:cardId/edit)
