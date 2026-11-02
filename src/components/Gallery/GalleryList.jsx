import GalleryItem from './GalleryItem.jsx';
import './GalleryList.css';
function GalleryList({ images, likes, addLike }) {
  return (
    <div data-testid="galleryList">
      <ul className="galleryListOfItems">
        {images.map(img => <GalleryItem key={img.id} img={img} likes={likes[img.id] || 0} addLike={addLike} />)}
      </ul>
    </div>
  );
}
export default GalleryList;
