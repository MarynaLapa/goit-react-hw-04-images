import css from './searchbar.module.css'
import {ReactComponent as Search} from 'components/icon/search.svg'
import { useState } from 'react'

const Searchbar = ({addSearch}) => {

  const [search, setSearch] = useState(null)
  
  
  const handlerSearch = ({ target: { value } }) => {
    setSearch(value.toLowerCase())    
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    addSearch(search)
  }


  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onClick={handlerSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
        >
          <Search width='28' height='28' stroke="#3f51b5"/>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          onChange={handlerSearch}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header> 
  )
}

export default Searchbar