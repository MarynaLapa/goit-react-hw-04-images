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
  const [search, setSearch] = useState(null)
  const [page, setPage] = useState(0)
  const [isShowModal, setIsShowModal] = useState(false)
  const [totalPages, setTotalPages] = useState(null)
  const [id, setId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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

    if (name && search === name) {
      return alert(`You have already viewed this request!`)
    }
    setSearch(name)
    // setPhoto([])
    setPage(1)
  }

  const onLoadMoreButton = () => {
    setPage(prev => prev + 1)
  }

  const toggleModal = (id) => {
    setIsShowModal(prev => !prev)
    setId(id)    
  }
  
  const result = photo.find((el) => el.id === id)

  return (
       <>
        <Searchbar
          addSearch={addSearch}
        />
        {photo.length > 0 &&
          <ImageGallery
            onClick={toggleModal}
            photo={photo}
          />}

        {photo.length !== 0 &&
          totalPages > page &&
          !isLoading &&
          <Button
            onLoadMoreButton={onLoadMoreButton}
            
          />}

        {isLoading && <Loader />}
        {isShowModal &&
          id !== null &&
          <Modal
            onClose={toggleModal}
          >
            <img src={result.largeImageURL} alt={result.tag} />
          </Modal>}
        
        {error &&
          <h1 style={{
            textAlign: 'center',
            fontSize: 48,
          }}>
            {error}
          </h1>}
    </>
  )
}

export default App

