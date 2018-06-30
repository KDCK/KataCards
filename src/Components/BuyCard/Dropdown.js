import React, {Component} from 'react'
import {Button, Form, Select} from 'semantic-ui-react'

const options = [
  {key: '1', text: 'Tier 1', value: '1'},
  {key: '2', text: 'Tier 2', value: '2'},
  {key: '3', text: 'Tier 3', value: '3'}
]

class DropDown extends Component {
  render() {    
    console.log(this.props);
    
    return (
      <Form onSubmit={this.props.purchaseCard}>
        <Form.Group widths="equal">
          <Form.Field
            required
            onChange={this.props.handleChange}
            control={Select}
            label="Choose a Tier"
            options={options}
            placeholder="Tier"
          />
        </Form.Group>
        <Button disabled={!this.props.selected} color="red">Buy!</Button>
      </Form>
    )
  }
}

export default DropDown
