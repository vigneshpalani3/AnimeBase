import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../styles/searchbar.css'
import UseGlobalContext from '../context/GlobalContext'

const SearchBar = () => {

  const {input,setInput,handleSumbit} = UseGlobalContext();

  return (
    <form className='search-bar' onSubmit={(e)=>handleSumbit(e)}>
      <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder='Search Anime'/>
      <button className='search-btn'><FaSearch /></button>
    </form>
  )
}

export default SearchBar