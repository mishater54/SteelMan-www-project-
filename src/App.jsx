import Header from './components/Header/Header'
import RegistrationForm from './components/Registration/Form'
import Footer from './components/Footer/Footer'
import Photo from './components/PhotoGalery/Photo'
import FitnessLandingPage from './components/Information/Info'
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <FitnessLandingPage />
      <Photo />
      <RegistrationForm />
      <Footer />
    </>
  )
}

export default App
