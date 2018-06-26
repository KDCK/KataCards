import React, {Component} from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Dropdown
} from 'semantic-ui-react'

const options = [
  {key: '1', text: 'Tier 1', value: '1'},
  {key: '2', text: 'Tier 2', value: '2'},
  {key: '3', text: 'Tier 3', value: '3'}
]

class FormDropDown extends Component {
  state = {}

  handleChange = (e, {value}) => this.setState({value})

  render() {
    const {value} = this.state
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            required
            control={Select}
            label="Choose a Tier"
            options={options}
            placeholder="Tier"
          />
        </Form.Group>
        <Button>Buy!</Button>
      </Form>
    )
  }
}

export default FormDropDown
