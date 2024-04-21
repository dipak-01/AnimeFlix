import { useState } from 'react'


import './App.css'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './components/Navbar.jsx'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <HomePage />
        {/* <LandingPage /> */}
      </div>

    </>
  )
}

export default App
