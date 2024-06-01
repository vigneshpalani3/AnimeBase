import { Route, Routes } from 'react-router-dom'
import AnimeItem from './components/AnimeItem'
import Home from './components/Home'
import Missing from './components/Missing'
import SeasonalAnime from './components/SeasonalAnime'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/anime/:id' element={<AnimeItem />}/>
      <Route path='/*' element={<Missing />}/>
      <Route path='season/:year/:season' element={<SeasonalAnime />}/>
    </Routes>
    </>
  )
}

export default App
