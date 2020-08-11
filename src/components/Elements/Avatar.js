import React from 'react'

function Avatar(props) {
  return(
    <div 
      className='avatar'
      style={{
        width: props.size,
        height: props.size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    > 
      {props.icon}
    </div>
  )
}

export default Avatar