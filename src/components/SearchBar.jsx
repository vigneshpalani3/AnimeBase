import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../styles/searchbar.css'
import UseGlobalContext from '../context/GlobalContext'

const SearchBar = () => {

  const {searchString,setSearchString,handleSumbit} = UseGlobalContext();

  return (
    <form className='search-bar' onSubmit={(e)=>handleSumbit(e)}>
      <input value={searchString} onChange={e=>setSearchString(e.target.value)} type="text" placeholder='Search Anime'/>
      <button className='search-btn'><FaSearch /></button>
    </form>
  )
}

export default SearchBar