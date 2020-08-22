
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

const checkHealthReducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case "FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            throw new Error()
    }
}

function App() {
  const [checkHealth, setCheckHealth] = useState(false)
    const [state, dispatch] = useReducer(checkHealthReducer, {
        isLoading: false,
        isError: false,
        data: {"status":""}
    })

    useEffect(() => {
        const callCheckHealth = async () => {
            dispatch({
                type: "INIT"
            })
            try {
                const url = "http://triple-hour-287219.uc.r.appspot.com/api/checkHealth"
                const headers = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                const res = await axios(url)
                console.log("Health status from backend---",res.data)
                dispatch({
                    type: 'SUCCESS',
                    payload: res.data
                })
                setCheckHealth(false)
            }
            catch (err) {
                dispatch({
                    type: 'FAILURE'
                })
            }

        }
        if (checkHealth) {
            callCheckHealth()
        }

    }, [checkHealth])

  const handleCheckHealthButton = () =>{
    setCheckHealth(true)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleCheckHealthButton}>Check Health</button>
        <div>Health status : {state.data.status}</div>
      </header>
    </div>
  );
}

export default App;


