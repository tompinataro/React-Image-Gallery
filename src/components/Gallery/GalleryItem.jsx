import './GalleryList.css';
import { useState } from 'react';

function GalleryItem({ img, likes, addLike }) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <li className="singleItem" data-testid="galleryItem">
      <h3>{img.title}</h3>
      <div className="imageDescriptionDiv">
        {showDescription
          ? <p className="description">{img.description}</p>
          : <img className="image" src={`${import.meta.env.BASE_URL}${img.url}`} alt={img.title} decoding="async" />}
      </div>
      <div className="buttons">
        <button className="imageDescriptionButton" data-testid="toggle" aria-label={`${showDescription ? 'Show image' : 'Show description'}: ${img.title}`} aria-pressed={showDescription} onClick={() => setShowDescription(!showDescription)}>{showDescription ? 'Image' : 'Description'}</button>
        <button className="likeButton" data-testid="like" aria-label={`Like ${img.title}. ${likes} likes on this device.`} onClick={() => addLike(img.id)}>♥ {likes} {likes === 1 ? 'Like' : 'Likes'}</button>
      </div>
    </li>
  );
}
export default GalleryItem;
