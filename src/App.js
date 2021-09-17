import './App.css';
import React, { useReducer, useEffect } from 'react';
import MainBox from './Components/MainBox';
import { UserContext } from './hooks/userContext';
import axios from "axios";

const INITIALIZE = "initialize";
function reducer(state, action) {

  const initialize = (input) => {
    const newInput = input.map((item,index) => {
      let selected = 0;
      if (index === 0) {
        selected = 1;
      }
      return {...item, selected}
    })
    return [...newInput];
  }

  const actions = {
    [INITIALIZE]: initialize
  }

  return actions[action.type](action.state)

}

function App() {
  const initialState = [{0: "Empty", selected : 1, id: "null"}]
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes")
      .then(result => {
        dispatch({ type: INITIALIZE, state: result.data.data.memes })
      })
  }, [])
  return (
    <UserContext.Provider value = {{state, dispatch}}>
    <div className="App">
        <MainBox />
    </div>
    </UserContext.Provider>
  );
}

export default App;
