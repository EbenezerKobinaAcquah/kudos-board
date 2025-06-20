import { useState } from 'react'
import Header from './components/Header'
import SearchBox from './components/SearchBox'
import Button from './components/ViewBoardButton'
import './App.css'
import KudoBoardCard from './components/KudoBoardCard'
import Footer from './components/Footer'
import KudoBoard from './components/KudoBoard'
import ParentComponent from './Parent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
<ParentComponent />
<Footer />
    </>
  )
}

export default App
