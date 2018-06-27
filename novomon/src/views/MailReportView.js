import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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

const Wrapper = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
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
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    margin: theme.spacing.unit
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
      receivers: []
    };
  }

  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/posts/1`).then(res => {
      let json = JSON.parse(
        '{"onOff":"on","sender":{"mail":"novonetworks@gmail.com","name":"novo","pwd":"novo20031101","smtpHost":"smtp.gmail.com","smtpPort":465},"receivers":[{"mail":"andrew@novonetworks.com","name":"andrew@novonetworks.com","type":"to"},{"mail":"nicew@novonetworks.com","name":"nicew@novonetworks.com","type":"to"},{"mail":"salad@novonetworks.com","name":"salad@novonetworks.com","type":"to"},{"mail":"gil@novonetworks.com","name":"gil@novonetworks.com","type":"cc"}]}'
      );

      this.setState({
        inProgress: false,
        checkedAutoReport: json.onOff === 'on',
        senderEmail: json.sender.mail,
        senderName: json.sender.name,
        senderSmtpHost: json.sender.smtpHost,
        senderSmtpPort: json.sender.smtpPort,
        receivers: json.receivers
      });
    });
  }

  handleAutoReportClick = event => {
    let check = !this.state.checkedAutoReport;
    // /v1/mail-report/config/onOff
    fetch(`https://jsonplaceholder.typicode.com/posts/1`).then(res => {
      this.setState({ checkedAutoReport: check });
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
        type: receiver.type
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
            메일 자동 보고 설정
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
            <div className={classes.container}>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="senderEmail">메일</InputLabel>
                <Input
                  id="senderEmail"
                  value={this.state.senderEmail}
                  onChange={this.handleChange}
                />
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="senderName">계정명</InputLabel>
                <Input
                  id="senderName"
                  value={this.state.senderName}
                  onChange={this.handleChange}
                />
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="senderSmtpHost">SMTP 호스트</InputLabel>
                <Input
                  id="senderSmtpHost"
                  value={this.state.senderSmtpHost}
                  onChange={this.handleChange}
                />
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="senderSmtpPort">SMTP 포트</InputLabel>
                <Input
                  id="senderSmtpPort"
                  value={this.state.senderSmtpPort}
                  onChange={this.handleChange}
                />
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
            </div>
          </Typography>
          <Divider />
          <br />
          <br />
        </Paper>
        <br />
        <Paper className={classes.paper}>
          <Typography variant="title" align="left">
            수신자 목록
          </Typography>
          <Button variant="outlined" className={classes.button} color="primary">
            수신자 추가
          </Button>
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
