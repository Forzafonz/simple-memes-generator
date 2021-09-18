import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../hooks/userContext'
import Draggable from 'react-draggable';
import useDynamicRefs from 'use-dynamic-refs';
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
    })
  }

  const handleEvent = (e, data) => {
    console.log('Event Type', e.type);
    console.log(e, data);
    ref.current.click()
  }

  const handleEvent2 = (e, data) => {
    e.target.click()
    console.log('Event Type2', e.type);
    console.log(e, data);
    
  }

  const textareas = inputList.map((input, i)=> {

    const domRect = ref.current.getBoundingClientRect();
    const ParentLeft = ref.current.offsetParent.offsetLeft;
    const ParentTop = ref.current.offsetParent.offsetTop;
    const left = domRect.left - ParentLeft;
    const top = domRect.top - ParentTop;
    const bottom = top + domRect.height - 32;
    const right = left + domRect.width - 180;
    return (
      <Draggable 
      key = {input.id}
      bounds = {{left, top, right,bottom}}
      // onDragEnd ={event => handleStop(event)}
      onDrag={handleEvent}
      onStart={handleEvent}
      onStop={handleEvent2}
      // onMouseDown={handleEvent}
      // onMouseUp={handleEvent}
      onTouchStart={handleEvent}
      onTouchEnd={handleEvent}
      onDrop = {handleEvent2}
      
      >
      <textarea
      draggable="true" 
      id = {input.id} 
      className = "input_text" 
      type = "text" 
      defaultPosition = {{x: left, y: top}}
      value = {inputList['0']['0']}
      onChange = {(event => updateInput(event))}
      onDoubleClick = {deleteTextArea} >
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
    })
  }

  const saveText = (event) => {
    console.log(inputList)
    console.log(textareas[0])
    const data = textareas.map(area => {
      const text = inputList.map(item => {
        if (item.id == area.key){
          return item.text;
        }
      })
      return {bounds: area.props.bounds, text}
    })
    console.log("DATA:", data)
    // dispatch({type: "updatetext", values: { text: inputList}})
  }

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
        <button onClick = {saveText}>Save</button>
        <button>Reset</button>
      </div>
    </div>
  )
};

