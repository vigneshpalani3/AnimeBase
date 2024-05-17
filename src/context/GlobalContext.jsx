import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {

  const baseUrl = 'https://api.jikan.moe/v4'
  
  const LOADING = "LOADING";
  const LOADED = "LOADED";
  const SEARCH_RESULT = "SEARCH_RESULT";
  const SEARCH_RESULT_PAGE = "SEARCH_RESULT_PAGE";
  const GET_POPULAR = "GET_POPULAR"; 
  const POPULAR_PAGE ="POPULAR_PAGE"
  const GET_UPCOMMING = "GET_UPCOMMING";
  const GET_AIRING = "GET_AIRING";
  const ACTIVE = "ACTIVE";
  const UPCOMMING_PAGES="UPCOMMING_PAGES";
  const RANDOM = "RANDOM";
  const AIRING_PAGES="AIRING_PAGES";
  const ERROR = "ERROR";
  const RECOMMEND = "RECOMMEND";

  // Initial state
  const initialState = {
    popularAnime:[],
    popularPageNo:1,
    upcommingAnime:[],
    upcommingPageNo:1,
    airingAnime:[],
    airingPageNo:1,
    searchResults:[],
    searchResultsPageNo:1,
    recommendation:[],
    errorMsg:[],
    randomAnime:[],
    isLoading:false,
    active:'popular',
  }

  //creating a Reducer
  const reducer = (state,action) =>{
    switch(action.type){
      case LOADING:
        return {...state,isLoading:true};
      case LOADED:
        return {...state,isLoading:false};
      case GET_POPULAR:
        return {...state,popularAnime:action.payload};
      case POPULAR_PAGE:
        return {...state,popularPageNo:action.payload};
      case GET_AIRING:
        return {...state,airingAnime:action.payload};
      case AIRING_PAGES:
        return {...state,airingPageNo:action.payload};
      case GET_UPCOMMING:
          return {...state,upcommingAnime:action.payload};
      case UPCOMMING_PAGES:
        return {...state,upcommingPageNo:action.payload};
      case SEARCH_RESULT:
        return {...state,searchResults:action.payload};
      case SEARCH_RESULT_PAGE:
        return {...state,searchResultsPageNo:action.payload};
      case RECOMMEND:
          return {...state,recommendation:action.payload};
      case RANDOM:
        return {...state,randomAnime:action.payload};
      case ERROR:
        return {...state,errorMsg:action.payload};
      case ACTIVE:
        return {...state,active:action.payload};
    }
  }

  const [state,dispatch] = useReducer(reducer,initialState);
  const [searchString,setSearchString] = useState('');
  const [input,setInput] = useState('');

  // Run functions to get the data from api
  useEffect(()=>{
    switch(state.active){
      case "popular":
        getPopularAnime();
        break;
      case "airing":
        getAiringAnime();
        break;
      case "upcomming":
        getUpcommingAnime();
        break;
      case "random":
        getRandomAnime();
        break;
      case "recommend":
        getRecommendation();
        break;
      case "search":
        if(searchString) getSearchResults();
    }
    window.scrollTo(0,0);
    if(state.active!=='search') setSearchString('');
  },
  [
    state.active,
    state.popularPageNo,
    state.airingPageNo,
    state.upcommingPageNo,
    state.searchResultsPageNo,
    searchString
  ]);

  //get popular anime
  async function getPopularAnime(){
    try{
      dispatch({type:LOADING});
      const responce = await fetch(`${baseUrl}/top/anime?filter=bypopularity&page=${state.popularPageNo}&sfw`);
      const data = await responce.json();
      if(responce.ok){
        dispatch({type:GET_POPULAR,payload:data});
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
      dispatch({type:LOADED});
    }catch(err){
      console.log(err);
    }

  }
  
  // get this season anime
  async function getAiringAnime(){
    try{
      dispatch({type:LOADING});
      const responce = await fetch(`${baseUrl}/seasons/now?page=${state.airingPageNo}&sfw`);
      const data = await responce.json();
      if(responce.ok){
        dispatch({type:GET_AIRING,payload:data});
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
      dispatch({type:LOADED});
    }catch(err){
      console.log(err);
    }
  }

  // get upomming anime
  async function getUpcommingAnime(){
    try{
      dispatch({type:LOADING});
      const responce = await fetch(`${baseUrl}/seasons/upcoming?page=${state.upcommingPageNo}&sfw`);
      const data = await responce.json();
      if(responce.ok){
        dispatch({type:GET_UPCOMMING,payload:data});
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
      dispatch({type:LOADED});
    }catch(err){
      console.log(err);
    }
  }

  // get Search Results
  async function getSearchResults(){
    try{
      dispatch({type:LOADING});
      const responce =await fetch(`${baseUrl}/anime?q=${searchString}&page=${state.searchResultsPageNo}`);
      const data = await responce.json();
      if(responce.ok){
        dispatch({type:SEARCH_RESULT,payload:data});
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
      dispatch({type:LOADED});
    }catch(err){
      console.log(err);
    }
  }

  // function to handle submit of search bar
  function handleSumbit(e){
    dispatch({type:SEARCH_RESULT_PAGE,payload:1});
    e.preventDefault();
    setSearchString(input);
    dispatch({type:ACTIVE,payload:'search'})
  }

  // function get random anime
  async function getRandomAnime(){
    try{
      dispatch({type:LOADING});
      const responce = await fetch(`${baseUrl}/random/anime`);
      const data = await responce.json();
      if(responce.ok){
        dispatch({type:RANDOM,payload:data.data});
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
      dispatch({type:LOADED});
    }catch(err){
      console.log(err);
    }
  }

  // function to get recommendations
  async function getRecommendation(){
    try{
      dispatch({type:LOADING});
      const responce = await fetch(`${baseUrl}/recommendations/anime`);
      const data = await responce.json();
      if(responce.ok){
        dispatch({type:RECOMMEND,payload:data});
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
      dispatch({type:LOADED});
    }catch(err){
      console.log(err);
    }
  }

  return (
    <GlobalContext.Provider value={{
      ...state,
      handleSumbit,
      dispatch,
      searchString,
      setSearchString,
      getRandomAnime,
      input,
      setInput
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default function UseGlobalContext(){
  return useContext(GlobalContext);
}