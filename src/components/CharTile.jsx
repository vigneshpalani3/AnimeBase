import React from 'react'
import '../styles/charTile.css';

const CharTile = ({item}) => {

  const voiceActor = item?.voice_actors?.filter(i=>i.language==='Japanese')[0];

  return (
    <div className='char-tile'>
      <img className='char-thumb' src={item?.character?.images?.jpg?.image_url} alt="" />
      <h1 className='char-name'>{item?.character.name}</h1>
      <h2 className='char-role'>{item?.role}</h2>
      <h3 className='char-voice-actor'>Voice : {voiceActor?.person?.name}</h3>
    </div>
  )
}

export default CharTile