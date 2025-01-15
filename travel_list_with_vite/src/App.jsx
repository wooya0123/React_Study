import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SettingsPage from './pages/SettingsPage'
import Header from './components/Header'
import CityMap from './components/CityMap'
import MovieList from './pages/MovieList'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/citymap/:city" element={<CityMap />} />
        <Route path="movielist" element={<MovieList />} />
      </Routes>
    </>

  )
}

export default App