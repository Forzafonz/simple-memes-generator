import React from 'react'
import EditMeme from './EditMeme'
import MemeContainer from './MemeContainer'
import './mainBox.scss'


export default function MainBox() {
  return (
    <div className = "block">
        <EditMeme />
        <MemeContainer />
    </div>
  )
}
