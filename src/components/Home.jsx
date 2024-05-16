import React, { useEffect, useState } from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import '../styles/home.css'
import SideBar from './SideBar';
import SearchBar from './SearchBar';
import Popular from './Popular'
import UseGlobalContext from '../context/GlobalContext';
import Upcomming from './Upcomming';
import Airing from './Airing';
import Loader from './Loader'
import SearchResults from './SearchResult';
import Random from './Random';
import Error from './Error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recommend from './Recommend';

const Home = () => {

  const [isNavOpen,setIsNavOpen] =  useState(false);
  const {active,isLoading} = UseGlobalContext();

  useEffect(()=>{
    if(!navigator.onLine){
      toast.warn('Check Your Internet Connection!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  },[active]);

  return (
    <main className='home-page'>
      {/* HEADER */}
      <header>
        <div className="logo">
          Anime Base
          </div>
        <div className="hamburger">
          <Hamburger color={isNavOpen?'rgb(34, 137, 240)':'white'} toggled={isNavOpen} toggle={()=>setIsNavOpen(!isNavOpen)} size={29} />
        </div>
      </header>
      {/* SIDEBAR OPTION PANEL */}
      <SideBar isOpen={isNavOpen} setIsOpen={setIsNavOpen}/>

      {/* SEARCH BAR */}
      <SearchBar />

      {/* SHOW ACTIVE PAGE */}
      <div className="pages">
        {
          isLoading?<Loader />:
          (
            active==='popular'? <Popular /> :
            active==='upcomming'?<Upcomming />:
            active==='airing'?<Airing />:
            active==='search'?<SearchResults />:
            active==='random'?<Random />:
            active==='recommend'?<Recommend />:
            active==='error'?<Error />:null
          )
        }
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </main>
  )
}

export default Home