import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client'
import Input from './components/Input'

function App() {
  const [score, setScores] = useState({})
  const [scores, setAllScores] = useState([])
  const socket = io("localhost:3000")

  function connectSocket() {
    socket.on("connection", () => {})
  }

  useEffect(() => {
    connectSocket()
  }, [])

  function handleInput(event) {
    let { name, value } = event.target;
    console.log({[name] : value});
    let currentObj = { [name]: value }

    setScores((prev) => 
      {
        return (
          {...prev, ...currentObj}
        )
      }
    )

    socket.on("playerScores", (playerScores) => {
      console.log(playerScores)
    })
  }


  function sendScores() {
    console.log(score)

    socket.emit('scores', score)

    socket.on("playerScores", (playerScores) => {
      setAllScores(playerScores);
    });
  }

  return (
    <>
      <h1>React Multiplayer Dashbaord</h1>

      <Input handleInput={handleInput} name="name" className="input-field" placeholder="Enter your name" type="text" ></Input>

      <Input handleInput={handleInput} name="score" className="input-field" placeholder="Enter your score" type="text"></Input>

      <button className='send-scores' onClick={sendScores}>Publish Score</button>

      {scores.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>

            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score?.name}</td>
                <td>{score?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  )
}

export default App
