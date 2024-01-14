import ImageGallery from "./imageGallery/ImageGallery";
import { getAllPhoto } from 'components/api/api'
import Button from './Button/Button'
import Modal from "./modal/Modal";
import Loader from "./loader/Loader";
import Searchbar from "./searchbar/Searchbar";
import { useEffect, useState } from 'react'

const App = () => {

  const [photo, setPhoto] = useState([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [isShowModal, setIsShowModal] = useState(false)
  const [totalPages, setTotalPages] = useState(null)
  const [img, setImg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  console.log('search :>> ', search);
  useEffect(() => {
    if (!search) return

    const getPhoto = async (search, page) => {
      try {

        setIsLoading(true)
        setError('')

        const { data } = await getAllPhoto(search, page)

        if (data.hits.length === 0) {
          alert('Sorry image not found...')
          return
        }
        setPhoto(prev => [...prev, ...data.hits])
        setTotalPages(Math.ceil(data.totalHits / 12))
        
      } catch (error) {
        setError(error.message)
      } finally {
          setIsLoading(false)
      }
    }

    getPhoto(search, page)
  }, [page, search])
 
  const addSearch = (name) => {
    setPhoto([])
    if (search === name) {
      return alert(`You have already viewed this request!`)
    }
    setSearch(name)
    console.log('name', name)
    setPage(1)
  }

  const onLoadMoreButton = () => {
    setPage(prev => prev + 1)
  }

  const getLargeImg = img => {
    setImg(img)
    setIsShowModal(true)
  }

  const getCloseModal = () => {
    setIsShowModal(false)
    setImg('')
  }
  
  return (
       <>
        <Searchbar addSearch={addSearch}/>
        {photo.length > 0 &&
          <ImageGallery onClick={getLargeImg} photo={photo}/>}

        {photo.length !== 0 && totalPages > page && !isLoading &&
          <Button onLoadMoreButton={onLoadMoreButton} />}

        {isLoading && <Loader />}
        {isShowModal &&
          <Modal onClose={getCloseModal}>
            <img src={img.src} alt={img.alt} />
          </Modal>}
        
      {error &&
        <h1 style={{textAlign: 'center', fontSize: 48,}}>
          {error}
        </h1>}
    </>
  )
}

export default App

