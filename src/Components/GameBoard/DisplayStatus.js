import React from 'react'
import { Label, Icon } from 'semantic-ui-react'

const DisplayStatus = (props) => {
  return (
    <div className='display-status-inner' >
      <div className='label-wrapper'>
        <Label color="red" size='big'>
          <Icon name="legal" />
          {props.atk}
        </Label>
      </div>
      <div className='label-wrapper'>
        <Label color="teal" size='big'>
          <Icon name="shield" />
          {props.def}
        </Label>
      </div>
    </div>
  )
}

export default DisplayStatus
