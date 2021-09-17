import React from 'react';
import './memeBox.scss';

export default function MemeBox(props) {
  const {Id, name, url} = props 
  return (
    <div className = "meme_box">
      <label>{name}</label>
      <img src = {url} alt = {name} />
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}
