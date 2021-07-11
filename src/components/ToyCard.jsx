import React from 'react';

const ToyCard = props => {
    const {toy, increaseLikeCount, donateToGoodWill} = props

    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button className="like-btn" onClick={()=>increaseLikeCount(toy.id)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => donateToGoodWill(toy.id)}>Donate to GoodWill</button>
      </div>
    );
}

export default ToyCard;
