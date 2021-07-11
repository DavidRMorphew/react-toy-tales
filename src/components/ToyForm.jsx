
import React, { Component } from 'react';

const url = 'http://localhost:3000/toys'

class ToyForm extends Component {

state = {
  name: '',
  image: ''
}

handleOnChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleFormSubmit = e => {
  e.preventDefault()
  if (this.state.name && this.state.image){
    const toyObj = {...this.state, id: this.props.nextId()}
    const configObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
      },
      body: JSON.stringify(toyObj)
    }
    fetch(url, configObj)
    .then(resp=>resp.json())
    .then(newToy => {
      this.props.addToyToDom(newToy)
    })
  }
}

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleFormSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" onChange={this.handleOnChange} placeholder="Enter a toy's name..." value={this.state.name} className="input-text"/>
          <br/>
          <input type="text" name="image" onChange={this.handleOnChange} placeholder="Enter a toy's image URL..." value={this.state.image} className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
