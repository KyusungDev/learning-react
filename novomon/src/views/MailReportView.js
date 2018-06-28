import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import oc from 'open-color';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../store/modules/Auth';
import AddReciverDialog from '../components/AddReciverDialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Wrapper = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const ReciverDelButton = styled.button`
  margin: 0;
  padding: 0;
  width: 24px;
  height: 22px;
  opacity: 0.8;
  color: ${oc.indigo[9]};
  background-color: white;
  border: solid 1px ${oc.gray[1]};
  border-radius: 2px;
  cursor: pointer;
  transition: width 2s;
  &:hover {
    background-color: ${oc.indigo[1]};
    transition: background-color 0.3s linear;
  }
  &:active {
    background-color: ${oc.indigo[3]};
  }
`;
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    top: '-2px',
    left: '30px'
  }
});

class MailReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: true,
      checkedAutoReport: false,
      senderEmail: '',
      senderName: '',
      senderSmtpHost: '',
      senderSmtpPort: '',
      receivers: [],
      addReciverDialogOpen: false
    };
  }

  componentDidMount() {
    this.request();
  }

  request() {
    fetch(`http://192.168.0.26:8765/v1/mail`)
      .then(res => res.json())
      .then(res => {
        let data = res;
        if (data === undefined) return;
        console.log(data);
        this.setState({
          inProgress: false,
          checkedAutoReport: data.onOff === 'on',
          senderEmail: data.sender.mail,
          senderName: data.sender.name,
          senderSmtpHost: data.sender.smtpHost,
          senderSmtpPort: data.sender.smtpPort,
          receivers: data.receivers
        });
      });
  }

  handleAutoReportClick = event => {
    let check = this.state.checkedAutoReport;

    fetch(`http://192.168.0.26:8765/v1/mail-report/config/onOff`).then(res => {
      console.log(res);
      this.setState({ checkedAutoReport: !check });
    });
  };

  handleUpdateSenderClick = event => {
    const {
      senderEmail,
      senderName,
      senderSmtpHost,
      senderSmtpPort
    } = this.state;

    const data = JSON.stringify({
      mail: senderEmail,
      name: senderName,
      smtpHost: senderSmtpHost,
      smtpPort: senderSmtpPort
    });

    console.log(data);

    // /v1/mail-report/config/onOff
    fetch(`http://192.168.0.26:8765/v1/mail/sender`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        this.setState({
          senderEmail,
          senderName,
          senderSmtpHost,
          senderSmtpPort
        });
      });
  };

  handleDelReciverClick = e => {
    const mail = e.target.value;
    if (mail === undefined) return;

    fetch(`http://192.168.0.26:8765/v1/mail/receivers/${mail}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.request();
      });
  };

  handleAddReciverDialogOpen = () => {
    this.setState({
      addReciverDialogOpen: true
    });
  };

  handleAddReciverDialogClose = value => {
    console.log(value);

    if (value === undefined) {
      this.setState({ addReciverDialogOpen: false });
      return;
    }

    const { mail, name, type } = value;
    fetch(`http://192.168.0.26:8765/v1/mail/receivers/${mail}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, name, type })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.request();
        this.setState({ addReciverDialogOpen: false });
      });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  makeData() {
    const receivers = this.state.receivers;
    return receivers.map(receiver => {
      return {
        mail: receiver.mail,
        name: receiver.name,
        type: receiver.type,
        row: receiver
      };
    });
  }

  makeColumns() {
    const columns = [
      {
        Header: '메일',
        accessor: 'mail' // String-based value accessors!
      },
      {
        Header: '이름',
        accessor: 'name'
        //  Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: '전송 타입',
        accessor: 'type'
      }
    ];

    if (this.props.isLoginSuccess) {
      columns.push({
        Header: '',
        accessor: 'row',
        width: 50,
        Cell: row => (
          <div style={{ textAlign: 'center' }}>
            <ReciverDelButton
              id="delete"
              value={row.value.mail}
              onClick={this.handleDelReciverClick}
            >
              X
            </ReciverDelButton>
          </div>
        )
      });
    }

    return columns;
  }

  render() {
    const { classes, isLoginSuccess } = this.props;
    return this.state.inProgress ? (
      <Wrapper>
        <CircularProgress size={70} />
      </Wrapper>
    ) : (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="title" align="left">
            서버상태 자동보고 설정
            {isLoginSuccess && (
              <Button
                variant="outlined"
                className={classes.button}
                color="primary"
              >
                메일 테스트
              </Button>
            )}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    disabled={!isLoginSuccess}
                    checked={this.state.checkedAutoReport}
                    onChange={this.handleAutoReportClick}
                    value="checkedAutoReport"
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </Typography>
          <Divider />
          <br />
          <br />
          <Typography variant="title" align="left">
            발신자 정보
          </Typography>
          <div className={classes.container}>
            <FormControl
              className={classes.formControl}
              disabled={!isLoginSuccess}
            >
              <InputLabel htmlFor="senderEmail">메일</InputLabel>
              <Input
                id="senderEmail"
                value={this.state.senderEmail}
                onChange={this.handleChange('senderEmail')}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              disabled={!isLoginSuccess}
            >
              <InputLabel htmlFor="senderName">계정명</InputLabel>
              <Input
                id="senderName"
                value={this.state.senderName}
                onChange={this.handleChange('senderName')}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              disabled={!isLoginSuccess}
            >
              <InputLabel htmlFor="senderSmtpHost">SMTP 호스트</InputLabel>
              <Input
                id="senderSmtpHost"
                value={this.state.senderSmtpHost}
                onChange={this.handleChange('senderSmtpHost')}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              disabled={!isLoginSuccess}
            >
              <InputLabel htmlFor="senderSmtpPort">SMTP 포트</InputLabel>
              <Input
                id="senderSmtpPort"
                value={this.state.senderSmtpPort}
                onChange={this.handleChange('senderSmtpPort')}
                type="number"
              />
            </FormControl>
            {isLoginSuccess && (
              <Button
                variant="outlined"
                className={classes.button}
                color="primary"
                onClick={this.handleUpdateSenderClick}
              >
                정보 수정
              </Button>
            )}
          </div>
          <Divider />
          <br />
          <br />
        </Paper>
        <br />
        <Paper className={classes.paper}>
          <Typography variant="title" align="left">
            수신자 목록
            {isLoginSuccess && (
              <Button
                variant="outlined"
                className={classes.button}
                color="primary"
                onClick={this.handleAddReciverDialogOpen}
              >
                수신 추가
              </Button>
            )}
            <AddReciverDialog
              open={this.state.addReciverDialogOpen}
              onClose={this.handleAddReciverDialogClose}
            />
          </Typography>
        </Paper>
        <Paper>
          <ReactTable
            data={this.makeData()}
            columns={this.makeColumns()}
            minRows={10}
            showPagination={false}
            sortable={false}
            className="-striped -highlight"
          />
        </Paper>
      </div>
    );
  }
}

MailReportView.propTypes = {
  classes: PropTypes.object.isRequired
};

// store의 state를 props로 가져오기
const mapStateToProps = state => {
  return { isLoginSuccess: state.Auth.isLoginSuccess };
};

// action을 props로 가져오기
const mapDispatchToProps = dispatch => ({
  AuthActions: bindActionCreators(authActions, dispatch)
});

// connect HOC을 이용하여 적용
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MailReportView));
