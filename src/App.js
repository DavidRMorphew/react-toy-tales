import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const url = 'http://localhost:3000/toys'

class App extends React.Component{

  state = {
    display: false,
    toyData: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  increaseLikeCount = (id) => {
    const thisToy = this.state.toyData.find(toy => toy.id === id)
    const updatedToy = {...thisToy, likes: thisToy.likes+1}
    const configObj = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
      },
      body: JSON.stringify(updatedToy)
    }
    
    fetch(`${url}/${id}`, configObj)
    .then(resp => resp.json())
    .then(toyUpdateReturn => {
      const index = this.state.toyData.indexOf(thisToy)
      this.setState(prevState => ({prevState, toyData: [...prevState.toyData.slice(0, index), toyUpdateReturn, ...prevState.toyData.slice(index + 1)]}))
    })
  }

  addToyToDom = (newToy) => {
    this.setState(prevState=>({prevState, toyData: [...prevState.toyData, newToy]}))  
  }

  nextToyId = () => (this.state.toyData.length+1)

  componentDidMount(){
    fetch(url)
    .then(resp => resp.json())
    .then(toyData => {
      this.setState({toyData})
    })
  }

  donateToGoodWill = id => {
    console.log(id)
    const configObj = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
      }
    }
    fetch(`${url}/${id}`, configObj)
    .then(resp => resp.json())
    .then(() => {
      this.setState(prevState => ({prevState, toyData: prevState.toyData.filter(toy => toy.id !== id)}))
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm nextId={this.nextToyId} handleFormSubmit={this.handleFormSubmit} addToyToDom={this.addToyToDom}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toyData} increaseLikeCount={this.increaseLikeCount} donateToGoodWill={this.donateToGoodWill}/>
      </>
    );
  }
}

export default App;
