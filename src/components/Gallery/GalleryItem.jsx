
import './GalleryList.css';
import axios from 'axios';
import { useState } from 'react';


function GalleryItem ({img, fetchImages}) {

    const [imageDescription, setImageDescription] = useState('Image');
    const [imageDescriptionDisplay, setImageDescriptionDisplay] = useState(<img className="image" src={img.url}/>);
    const [imageDescriptionButton, setImageDescriptionButton] = useState('Description')

    

    const addLike = () => {
        console.log('in addLike function');
        axios({
            method: 'PUT',
            url: `/api/gallery/like/${img.id}`
        })
        .then((response) => {
            fetchImages();
    
        })
        .catch((error) => {
            console.log('Error in the response from the server PUT route: ', error);
        })
    }

    const changeImageDescription = () => {
        if(imageDescription === 'Image') {
            setImageDescription('Description');
            setImageDescriptionDisplay(<p className="description">{img.description}</p>)
            setImageDescriptionButton('Image');
        }
        else if (imageDescription === 'Description') {
            setImageDescription('Image');
            setImageDescriptionDisplay(<img className="image" src={img.url}/>)
            setImageDescriptionButton('Description');
        }
    }


    return (
            <li className= "singleItem" data-testid="galleryItem">
                <h3>{img.title}</h3>
                <div className="imageDescriptionDiv">
                    {imageDescriptionDisplay}
                </div>
                <div className="buttons">
                    <button className="imageDescriptionButton" data-testid="toggle" onClick={changeImageDescription}>{imageDescriptionButton}</button>
                    <button className="likeButton" data-testid="like" onClick={addLike}>{Number(img.likes) == 1 ? `♥   1 Like` : `♥   ${img.likes} Likes`}</button>
                </div>
            </li>
    )
}

export default GalleryItem;