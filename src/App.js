import React from "react";
import axios from "axios";


//  console.log(process.env.REACT_APP_LOCATION_KEY);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starWarsCharacters: [],
      error: false,
      errorMessage: "",
      city: ""
    };
  }

  //helper for star wars
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //try this if it does not work then catch the error.
      console.log(event);
      let starWarsCharacters = await axios.get(
        "https://swapi.dev/api/people/?page=1"
      );
      // console.log("🚀 starWarsCharacters:", starWarsCharacters.data.results);
      //add to state
      this.setState({
        starWarsCharacters: starWarsCharacters.data.results,
      });
    } catch (error) {
      console.log("error", error);
      //                   object.key
      console.log("error", error.message);
      this.setState({
        error: true,
        errorMessage: `An error ocurred; ${error.response.status}`,
      });
    }
  };

  //handle the city submit for location IQ call
  submitCityHandler = async (event) => {
    event.preventDefault();
 // make my request to my Api
 let url = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`);

 console.log(url.data[0]);

//  https://us1.locationiq.com/v1/search?key=pk.366fea80da4817b70fc2d981b40b1718N&q=SEARCH_STRING&format=json
//add it to state
//share the image url for the second part of lab



  };

  handleCityInput = (event) => {
    //add city to what? Before we call the api?
    //update state so that we can call the api with the data
    this.setState({
      city: event.target.value
    });
  };

  render() {
    //loop over some star wars data
    // console.log(this.state.starWarsCharacters, "good?");
    // console.log(this.state.city);

    let starWarsList = this.state.starWarsCharacters.map(
      (characterName, index) => {
        return <li key={index}>{characterName.name}</li>;
      }
    );

    return (
      <>
        <h1>Data from Star Wars API</h1>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Display Star Wars Data</button>
        </form>

        {/* WTF  */}
        {this.state.error ? (
          <p>{this.state.errorMessage}</p>
        ) : (
          <ul>{starWarsList}</ul>
        )}


        <form onSubmit={this.submitCityHandler}>
          <label>
            Pick a City:
            {/* 11. Add the onChange */}
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Get City Data</button>
        </form>



      </>
    );
  }
}

export default App;
