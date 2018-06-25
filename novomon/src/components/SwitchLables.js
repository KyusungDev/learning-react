import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends Component {
  state = {
    checked: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { checked } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
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
