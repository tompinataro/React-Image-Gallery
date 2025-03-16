import { useState, useEffect } from 'react';
import axios from 'axios';
import GalleryList from "../Gallery/GalleryList.jsx"; //"../GalleryList/GalleryList.jsx";
import './App.css';


function App() {

    useEffect(() => {
      fetchImages();
    }, [])

    const[images, setImages] = useState([]);

    const fetchImages = () => {
      console.log('in GET route in app.jsx')
      axios({
        method: 'GET',
        url: '/api/gallery'
      })
      .then((response) => {
        console.log('GET route got a response from the sever: ', response.data);
        setImages(response.data);
        console.log(images);
      })
      .catch((error) => {
        console.log('Error occurred when receiving a response form the server GET route: ', error);
      })
    }

    


    return (
      <div data-testid="app">
        <header>
          
          <h1 id="pageTitle">React Gallery</h1>
          <h3 id = "subTitle">Flowers, etc.</h3>
        </header>
        <GalleryList images={images} fetchImages={fetchImages} />
        <footer> <h3>You can reach me at: Tom@Pinataro.com</h3></footer>
      </div>
    );
}

export default App;
