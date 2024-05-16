import React from 'react'
import '../styles/sidebar.css';
import UseGlobalContext from '../context/GlobalContext';
import { Link } from 'react-router-dom';

const SideBar = ({isOpen,setIsOpen}) => {

  const {active,dispatch} = UseGlobalContext();

  function handleActive(activeBtnName){
    dispatch({type:"ACTIVE",payload:activeBtnName});
    setIsOpen(!isOpen);
  }

  return (
    <div className={`sidebar ${isOpen ? 'opened' : 'closed'}`}>
      <button 
        className={`option ${active==='popular'&&'active'}`}
        onClick={()=>handleActive('popular')}
      >Popular</button>
      <button
        className={`option ${active==='airing'&&'active'}`}
        onClick={()=>handleActive('airing')}
      >Airing</button>
      <button
        className={`option ${active==='upcomming'&&'active'}`}
        onClick={()=>handleActive('upcomming')}
      >Upcomming</button>
      <button
        className={`option ${active==='random'&&'active'}`}
        onClick={()=>handleActive('random')}
      >Random Anime</button>
      <button
        className={`option ${active==='recommend'&&'active'}`}
        onClick={()=>handleActive('recommend')}
      >Recommendations</button>
    </div>
  )
}

export default SideBar