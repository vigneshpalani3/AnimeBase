import { Route, Routes } from 'react-router-dom'
import AnimeItem from './components/AnimeItem'
import Home from './components/Home'
import Missing from './components/Missing'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/anime/:id' element={<AnimeItem />}/>
      <Route path='/*' element={<Missing />}/>
    </Routes>
    </>
  )
}

export default App
