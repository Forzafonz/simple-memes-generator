import React, { useContext }  from 'react';
import './memeBox.scss';
import { UserContext } from '../hooks/userContext';



export default function MemeBox(props) {
  const {id, name, url} = props;
  const {dispatch} = useContext(UserContext);

  const handleEditClick = (event) => {
    event.preventDefault();
    dispatch({type: "edit", value : {id}})
  }

  return (
    <div className = "meme_box">
      <label>{name}</label>
      <img src = {url} alt = {name} />
      <button onClick = {(event) => handleEditClick(event)}>Edit</button>
      <button>Delete</button>
    </div>
  )
}
