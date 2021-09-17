import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../hooks/userContext'
import './editmeme.scss';

export default function EditMeme() {
  const { state, dispatch } = useContext(UserContext)
  const [inputList, setInputList] = useState([{ id: 0, text: ""}]);
  const element = state.filter(elem => {
    if (elem.selected){
      return elem;
    }
  })

  const textareas = inputList.map(input => {
    return (
      <textarea 
      id = {input.id} 
      key = {input.id}
      className = "input_text" 
      type = "text" 
      value = {inputList['0']['0']}
      onChange = {(event => updateInput(event))}
      >
      </textarea>
    )
  })

  const updateInput = (event) =>{
    const id = event.target.id;
    const value = event.target.value;
    const newState = [...inputList];
    const updateState = newState.map(input => {
      if (input.id == id) {
        return {...input, text:value}
      }
      return input;
    }) 
    setInputList(updateState)
  }

  const addTextArea = (event) => {
    setInputList((prev) => {
      return [...prev, {id : Date.now(), text: ""}]
    }
    )
  }

  console.log(textareas)

  const [{id, name, url}] = element;
  return (
    <div className = "left-p">
      <div className ="edit_meme">
        <img src = {url} alt = {name} />
        <br/>
        <button onClick ={addTextArea}>Add Text</button>
        <button>Save</button>
        <button>Reset</button>
        {textareas}
      </div>
    </div>
  )
}
