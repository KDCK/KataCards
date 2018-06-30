import React from 'react'
import { Label, Icon } from 'semantic-ui-react'

const DisplayStatus = (props) => {
  console.log(props);
  
  return (
    <div style={{marginBottom: "-25px", marginTop: "-25px"}}>
      <Label size='big'>
        <Icon name="legal" />
        {props.atk}
      </Label>
      <Label size='big'>
        <Icon name="shield" />
        {props.def}
      </Label>
    </div>
  )
}

export default DisplayStatus