# Shakemon
Using the PokeAPI with the Shakespearean API to provide a Shakespearean description of the chosen pokemon to send back to the frontend with the Pokemon name and sprite.

# Technologies Used
- Node.js & Express
- React.js
- Axios
- SCSS
- [React Select](https://react-select.com/home)

### APIs
- [PokeAPI](https://pokeapi.co/)
- [Shakespearean Translator](https://funtranslations.com/api/shakespeare)

### Testing
- Jest
- supertest
- ClientHTTP
- Insomnia

## Getting Started
You will find the backend in the server folder and the front end in the client folder. 

1. Run `npm i` or `yarn install` to install the dependencies in both server and client. 
2. To run the server, run `npm run serve` or `yarn serve`. Server must be running before you run client.
3. To run the client, run `npm run dev` or `yarn start`
* Please make sure you are in the correct folder :)

# The Backend
The backend is built with Node/Express.js and it functions in the following process: 
1. It takes the request from the user input on the frontend
2. It then sends a request to the PokeAPI to retrieve the name and sprite
4. It then gets the description and finds the entry in english
5. It then takes the returned english description and sends this to the Shakespearean Translator API, which returns the translated description
6. An object with the name, sprite and shakespearean translation is then returned to the frontend
7. If there is an error at any stage, it returns a 404 and an error message

To run a test: `npm test`. Testing uses the Jest testing framework with supertest mocking the request. In this case the test checks that the GET pokemon endpoint returns a status code of 200. During development testing was also done with ClientHTTP and Insomnia. 

<hr/>

# The Frontend
The frontend is built with React.js. The user interface contains a search bar where a used can type the name of a pokemon. I wanted the search to be dynamic and to autopopulate as the user types in a pokemon name. Eg. if they start to type 'cha', then all pokemon whose name starts with 'cha' will populate in the React Select bar and the used can select the one they want to view the data on.

Once the user has selected a pokemon by name, the id is taken from the data and sent to the backend to form the complete url to retreive the data and complete the translation. When returned the data is rendered and displayed on the pokemon card in the UI. 

<hr/>

## Important information
The Shakespearean Translation API will only return 5 requests an hour - so once you have retreived 5 then it will error with any more requests. 
