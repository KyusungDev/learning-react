import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  width: 200px;
`;

class AddReciverDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      name: '',
      type: 'to',
      errorMarkingEmail: false,
      errorMarkingName: false
    };
  }
  handleClose = name => event => {
    if (name === 'add') {
      const { mail, name, type } = this.state;
      if (mail === '') {
        this.setState({ errorMarkingEmail: true });
        return;
      }
      if (name === '') {
        this.setState({ errorMarkingName: true });
        return;
      }
      this.props.onClose({ mail, name, type });
    } else {
      this.props.onClose();
    }

    this.setState({
      mail: '',
      name: '',
      type: 'to',
      errorMarkingEmail: false,
      errorMarkingName: false
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { ...other } = this.props;
    const { errorMarkingEmail, errorMarkingName } = this.state;
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          {...other}
        >
          <DialogTitle id="form-dialog-title">수신자 정보 입력</DialogTitle>
          <DialogContent>
            <StyledTextField
              error={errorMarkingEmail}
              required
              autoFocus
              margin="normal"
              id="mail"
              label="메일"
              type="mail"
              autoComplete="off"
              fullWidth
              value={this.state.email}
              onChange={this.handleChange('mail')}
            />
            <StyledTextField
              error={errorMarkingName}
              required
              id="name"
              label="이름"
              margin="normal"
              autoComplete="off"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            <StyledTextField
              required
              select
              id="type"
              label="전송타입"
              margin="normal"
              autoComplete="off"
              fullWidth
              value={this.state.type}
              onChange={this.handleChange('type')}
            >
              <MenuItem key={0} value={'to'}>
                {'to'}
              </MenuItem>
              <MenuItem key={1} value={'cc'}>
                {'cc'}
              </MenuItem>
            </StyledTextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose('cancel')} color="primary">
              취소
            </Button>
            <Button onClick={this.handleClose('add')} color="primary">
              추가
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddReciverDialog.propTypes = {
  onClose: PropTypes.func
};

export default AddReciverDialog;
