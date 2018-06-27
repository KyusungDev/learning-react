import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends Component {
  state = {
    checked: false
  };

  handleChange = name => event => {
    console.log(name, event, this.state);
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { checked, disabled } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              disabled={disabled}
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value="checked"
              color="primary"
            />
          }
        />
      </FormGroup>
    );
  }
}

export default SwitchLabels;
