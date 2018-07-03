import React from 'react'
import { Label, Icon } from 'semantic-ui-react'

const DisplayStatus = (props) => {
  console.log(props.turn)
  return (
    <div className='display-status-inner' >
      <div className='label-wrapper'>
      <Label size='big'>
        <Icon name="legal" />
        {props.atk}
      </Label>
      </div>
      <div className='label-wrapper'>
      <Label size='big'>
        <Icon name="shield" />
        {props.def}
      </Label>
      </div>
      {props.self ? (<div className='label-wrapper'>
        <Label size='big'>
          <p className='turn'>Turn: </p>
          <p className='turn'>{props.turn === 'playerOne' ? 'Player One' : 'Player Two'}</p>
        </Label>
      </div>)
      : null}
    </div>
  )
}

export default DisplayStatus
