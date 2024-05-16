import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaAlignLeft } from "react-icons/fa6";
import { MdOutlineVideocam } from "react-icons/md";
import '../styles/animeItem.css';
import CharTile from './CharTile';
import Loader from './Loader';
import UseGlobalContext from '../context/GlobalContext';
import { FaArrowLeft } from 'react-icons/fa';

const AnimeItem = () => {

  const {id} = useParams();
  const [anime,setAnime] = useState([]);
  const [charecter,setCharecter] = useState([]);
  const [charInPage,setCharInPage] = useState([]);
  const [charStart,setCharStart] = useState(0);
  const [isShrink,setIsShrink] = useState(true);
  const {dispatch,isLoading} = UseGlobalContext();

  const baseUrl = `https://api.jikan.moe/v4/anime/${id}`;
  const {
    aired,duration,episodes,
    favorites,genres,images,
    members,popularity,score,
    rating,status,season,
    studios,synopsis,title,
    title_english,source,
    year,trailer,type
  } = anime;

  useEffect(()=>{
    dispatch({type:"LOADING"});
    getAnime();
    getCharacters();
    dispatch({type:"LOADED"});
  },[]);

  async function getCharacters(){
    try{
      const responce = await fetch(`${baseUrl}/characters`);
      const data = await responce.json();
      if(responce.ok){
        setCharecter(data.data);
        setCharInPage(data?.data?.slice(charStart,10));
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
    }catch(err){
      console.log(err);
    }
  }

  async function getAnime(){
    try{
      const responce = await fetch(baseUrl);
      const data = await responce.json();
      if(responce.ok){
        setAnime(data.data);
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
    }catch(err){
      console.log(err);
    }
  }

  // handle pages
  function handleCharPage(type){
    switch(type){
      case 'prev':
        charStart>=10&&setCharStart(char=>char-=10);
        break;
        case 'next':
          charStart<=charecter.length-(charecter.length%10)-10 && setCharStart(char=>char+=10);
    }
  }

  useEffect(()=>{
    setCharInPage(charecter.slice(charStart,charStart+10))
  },[charStart])

  return (
    <div className='pages'>
    <Link to='/' className='backBtn'><FaArrowLeft/> Go back</Link>
    { isLoading ? <Loader /> :
      anime ? (
        <div className='anime-item'>
        <div className="item-basic-details">
          <div className="item-aside">
            <img className='item-thumb' src={images?.jpg.large_image_url} alt="" />
            <div className="item-states">
              <h3 className='item-type'>{type??'?'}</h3>
              <h3 className='item-season'>{season??'?'}</h3>
              <h3 className='item-year'>{year??'?'}</h3>
            </div>
          </div>
          <div className="item-details">
            <h1 className='item-en-title'>{title_english}</h1>
            <h2 className='item-title'>{title}</h2>
            <h3 className='item-status'>{status}</h3>
            <p className='item-popularity'><span>Popularity :</span><span>{popularity??'Unknown'}</span></p>
            <p className='item-score'><span>Score :</span><span>{score??'Unknown'}</span></p>
            <p className='item-aired'><span>Aired :</span><span>{aired?.string??'Unknown'}</span></p>
            <p className='item-rating'><span>Rating :</span><span>{rating??'Unknown'}</span></p>
            <p className='item-studio'><span>Studio :</span><span>{studios && studios[0]?.name}</span></p>
            <p className='item-episode'><span>Episodes :</span><span>{episodes ??'Unknown'}</span></p>
            <p className='item-duration'><span>Duration :</span><span>{duration??'Unknown'}</span></p>
            <p className='item-favs'><span>Favorites :</span><span>{favorites??'Unknown'}</span></p>
            <p className='item-members'><span>Members :</span><span>{members??'Unknown'}</span></p>
            <p className='item-source'><span>Source :</span><span>{source??'Unknown'}</span></p>
            <h4 className='genre-title'>Genres</h4>
            <div className="item-genres">
              {
                genres?.map((genre,index)=>(
                  <div className="item-genre" key={index}>
                    {genre.name}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {
          synopsis && 
          (
            <div className="synopsis">
              <h2>Synopsis <FaAlignLeft className='synopsis-icon' /></h2>
              <p>{isShrink && synopsis?.length>400?
                synopsis?.slice(0,400)+'...':
                synopsis}
                { synopsis?.length>400 &&
                  <button className='item-showmore' onClick={()=>setIsShrink(!isShrink)}>{isShrink?'show more':'show less'}</button>
                }
                </p>
            </div>
          )
        }
        {
          trailer?.embed_url && 
          (
            <div className="trailer">
              <h2>Trailer <MdOutlineVideocam className='vid-icon' /></h2>
              <div className="tailer-vid">
                <iframe 
                src={trailer?.embed_url} 
                frameBorder="0"
                allowFullScreen
                allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                ></iframe>
              </div>
            </div>
          )
        }
        {
          charInPage && 
          (
            <div className="characters-part">
              <h2>Characters</h2>
              <div className="characters">
                {
                  charInPage?.map(char=>(
                    <CharTile item={char} key={char?.character?.mal_id}/>
                  ))
                }
              </div>
              <div className="char-page-nav">
              {charStart>=10 && 
                (<button onClick={()=>handleCharPage('prev')}>Prev</button>)
              }
              {
                charStart<=charecter.length-(charecter.length%10)-10 && 
                (<button onClick={()=>handleCharPage('next')}>Next</button>)
              }
              </div>
            </div>
          )
        }
        </div>
      ):null
    }
    </div>
  )
}

export default AnimeItem