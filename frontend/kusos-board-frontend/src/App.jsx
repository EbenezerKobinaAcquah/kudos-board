import { useState } from 'react'
import Header from './components/Header'
import SearchBox from './components/SearchBox'
import Button from './components/Button'
import './App.css'
import KudoBoardCard from './components/KudoBoardCard'
import Footer from './components/Footer'
import KudoBoard from './components/KudoBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <SearchBox />
<KudoBoard />
     <div className='addNewKudoCardButton'>
     <Button text = "Add a new Kudo" color = "gray"/>
     </div>
      

<Footer />
    </>
  )
}

export default App
