import React, { useContext } from 'react'
import { UserContext } from '../hooks/userContext'
import MemeBox from './MemeBox'

export default function MemeContainer() {
  const {state} = useContext(UserContext)
  const memeboxes = state.map(meme => {
    return <MemeBox 
    key = {meme.id}
    {...meme}
    />
  })
  return (
    <div className = "right-p">
      <p> SELECT YOUR MEME </p>
      {memeboxes}
    </div>
  )
}
