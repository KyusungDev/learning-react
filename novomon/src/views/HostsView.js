import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hostsActions from '../store/modules/Hosts';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import oc from 'open-color';

const StyledTableCell = styled(TableCell)`
  border-radius: 1px;
  ${props =>
    props.state === 'on'
      ? `background: ${oc.lime[7]}`
      : `background: ${oc.red[7]}`};
`;

const ServerStateIcon = styled.div``;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

class HostsView extends Component {
  constructor(props) {
    super(props);

    this.state = { inProgress: true };
  }

  componentDidMount() {
    const { HostsActions } = this.props;
    let intervalTimer = setInterval(() => HostsActions.getHostsAsync(), 3000);
    this.setState({ intervalTimer: intervalTimer });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalTimer);
  }

  render() {
    const { classes, hosts } = this.props;
    let hostList = hosts.slice();

    hostList.sort((a, b) => {
      let l = parseInt(a.ip.slice(a.ip.lastIndexOf('.') + 1, a.ip.length), 10);
      let r = parseInt(b.ip.slice(b.ip.lastIndexOf('.') + 1, b.ip.length), 10);
      return l > r ? 1 : l < r ? -1 : 0;
    });

    return this.state.inProgress ? (
      <div>progress</div>
    ) : (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>IP</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Ignore Time</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hostList.map(n => {
              return (
                <TableRow key={n.ip}>
                  <TableCell>{n.ip}</TableCell>
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.mode}</TableCell>
                  <TableCell>{n.monitoringIgnoreTime}</TableCell>
                  <StyledTableCell state={n.monitoringStatus} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

HostsView.propTypes = {
  classes: PropTypes.object.isRequired
};

// store의 state를 props로 가져오기
const mapStateToProps = state => {
  return { hosts: state.Hosts.hosts };
};

// action을 props로 가져오기
const mapDispatchToProps = dispatch => ({
  HostsActions: bindActionCreators(hostsActions, dispatch)
});

// connect HOC을 이용하여 적용
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HostsView));
