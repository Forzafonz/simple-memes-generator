import React, { useContext } from 'react'
import { UserContext } from '../hooks/userContext'
import './editmeme.scss';

export default function EditMeme() {
  const { state, dispatch } = useContext(UserContext)
  const element = state.filter(elem => {
    if (elem.selected){
      return elem;
    }
  })
  const [{id, name, url}] = element;
  return (
    <div className = "left-p">
      <div className ="edit_meme">
        <img src = {url} alt = {name} />
        <br/>
        <button>Add Text</button>
        <button>Save</button>
        <button>Reset</button>
      </div>
    </div>
  )
}
