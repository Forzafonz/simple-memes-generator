import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../hooks/userContext'
import Draggable from 'react-draggable';
import './editmeme.scss';

export default function(props) {
  const { state, dispatch } = useContext(UserContext)
  const [inputList, setInputList] = useState([]);
  const ref = React.useRef(null);

  const element = state.filter(elem => {
    if (elem.selected){
      return elem;
    }
  })

  const deleteTextArea = (event) => {
   
    setInputList((prev) => {
      return prev.filter(input => {
        if (input.id != event.target.id)
          return input;
      })
    }
    )
  
  }

  const textareas = inputList.map(input => {
    console.log(ref)
    console.log(ref.current.getBoundingClientRect())
    console.log(ref.current.offsetParent.offsetLeft)
    const domRect = ref.current.getBoundingClientRect();
    // const left = domRect.y;
    const ParentLeft = ref.current.offsetParent.offsetLeft;
    const ParentTop = ref.current.offsetParent.offsetTop;
    const left = domRect.left - ParentLeft;
    const top = domRect.top - ParentTop;
    const bottom = top + domRect.height - 32;
    const right = left + domRect.width - 180;
    console.log({left, top, right,bottom})
    return (
      <Draggable 
      key = {input.id}
      bounds = {{left, top, right,bottom}} >
      <textarea
      draggable="true" 
      id = {input.id} 
      className = "input_text" 
      type = "text" 
      value = {inputList['0']['0']}
      onChange = {(event => updateInput(event))}
      onDoubleClick = {deleteTextArea}
      >
      </textarea>
      </Draggable>
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
        {textareas}
        <div className = "image_div">
        <img src = {url} alt = {name} 
        ref = {ref}
        />
        </div>
        <br/>
        <button onClick ={addTextArea}>Add Text</button>
        <button onClick ={deleteTextArea}>Delete Text</button>
        <button>Save</button>
        <button>Reset</button>
      </div>
    </div>
  )
};

