import css from './imageGallery.module.css'

const ImageGalleryItem = ({ onClick, photoData } ) => {
    return (
        <li className={css.ImageGalleryItem} onClick={()=> onClick(photoData.id)}>
            <img
                className={css.Image}
                src={photoData.webformatURL}
                alt={photoData.tags}
                id={photoData.id}
            />
        </li>
    )
}


export default ImageGalleryItem

