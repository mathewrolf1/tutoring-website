import { useEffect, useState } from 'react'
import './App.css'



const Card = ({ title, rating }) => {


  const[count,setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  //[variableName, setvariableName]

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`)
  }, [hasLiked]);


  return(
    <div className='card' onClick={() => setCount((prevState) => prevState + 1)}>
      <h2>{title} - {count || null}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '♡'}
      </button>
    </div>
  )
}
// Reuse Card Component in App


const App = () => {

  return (
    <div className='card-container'>
      <h2>Movie Ratings</h2>
     
      <Card title="Star Wars" rating ={5}/>
      <Card title="Avatar" rating ={4}/>
      <Card title="Lion King" rating ={5}/>
      
    </div>
    
  )
}

export default App


