import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = props => {
  const {increaseLikeCount, donateToGoodWill, toys} = props

  const renderToyCards = () => (
    toys.map(eachToy => (
      <ToyCard 
        key={eachToy.id} 
        toy={eachToy} 
        increaseLikeCount={increaseLikeCount} 
        donateToGoodWill={donateToGoodWill}/
      >))
  )

  return(
    <div id="toy-collection">
      {renderToyCards()}
    </div>
  )
}

export default ToyContainer;
