import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hostsActions from '../store/modules/Hosts';
import styled from 'styled-components';
import oc from 'open-color';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableView extends Component {
  componentDidMount() {
    const { HostsActions } = this.props;
    HostsActions.getHostsAsync();
    let intervalTimer = setInterval(() => HostsActions.getHostsAsync(), 3000);
    this.setState({ intervalTimer: intervalTimer });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalTimer);
  }

  render() {
    const { hosts, resources } = this.props;
    let hostList = hosts.slice();

    hostList.sort((a, b) => {
      let l = parseInt(a.ip.slice(a.ip.lastIndexOf('.') + 1, a.ip.length), 10);
      let r = parseInt(b.ip.slice(b.ip.lastIndexOf('.') + 1, b.ip.length), 10);
      return l > r ? 1 : l < r ? -1 : 0;
    });

    const data = hostList.map(host => {
      let resource = resources.find(e => e.ip === host.ip);
      let disk = '';
      let memory = '';

      if (resource) {
        disk =
          resource.diskStates !== null && resource.diskStates.length !== 0
            ? resource.diskStates[0].percent
            : '';
        memory =
          resource.memoryState !== null ? resource.memoryState.percent : '';
      }

      return {
        ip: host.ip,
        name: host.name,
        mode: host.mode,
        ignore_time: host.monitoringIgnoreTime,
        status: host.monitoringStatus,
        disk: disk,
        memory: memory
      };
    });

    const columns = [
      {
        Header: 'IP',
        accessor: 'ip' // String-based value accessors!
      },
      {
        Header: '서버명',
        accessor: 'name'
        //  Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: '모드',
        accessor: 'mode'
      },
      {
        Header: '디스크',
        accessor: 'disk',
        Cell: row => {
          return row.value === '' ? (
            <span
              style={{
                fontSize: '0.8em',
                fontStyle: 'italic',
                opacity: 0.8
              }}
            >
              Unknown
            </span>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: `${oc.gray[4]}`,
                borderRadius: '2px'
              }}
            >
              <div
                style={{
                  width: `${row.value}%`,
                  height: '100%',
                  backgroundColor:
                    row.value > 80
                      ? `${oc.red[6]}`
                      : row.value > 40
                        ? `${oc.yellow[5]}`
                        : `${oc.green[6]}`,
                  borderRadius: '2px',
                  transition: 'all .2s ease-out'
                }}
              />
            </div>
          );
        }
      },
      {
        Header: '메모리',
        accessor: 'memory',
        Cell: row => {
          return row.value === '' ? (
            <span
              style={{
                fontSize: '0.8em',
                fontStyle: 'italic',
                opacity: 0.8
              }}
            >
              Unknown
            </span>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: `${oc.gray[4]}`,
                borderRadius: '2px'
              }}
            >
              <div
                style={{
                  width: `${row.value}%`,
                  height: '100%',
                  backgroundColor:
                    row.value > 80
                      ? `${oc.red[6]}`
                      : row.value > 40
                        ? `${oc.yellow[5]}`
                        : `${oc.green[6]}`,
                  borderRadius: '2px',
                  transition: 'all .2s ease-out'
                }}
              />
            </div>
          );
        }
      },
      {
        //Header: props => <span>Friend Age</span>, // Custom header components!
        Header: '모니터링 중지 시간',
        accessor: 'ignore_time',
        Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>
      },
      {
        Header: '서버 상태',
        accessor: 'status',
        Cell: row => (
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                textAlign: 'center',
                color: row.value === 'on' ? `${oc.green[6]}` : `${oc.red[6]}`,
                transition: 'all .3s ease'
              }}
            >
              &#x25cf;
            </span>
          </div>
        )
      }
    ];

    return (
      <ReactTable
        data={data}
        columns={columns}
        showPagination={false}
        sortable={false}
        className="-striped -highlight"
      />
    );
  }

  /*render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName'
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Profile Progress',
                  accessor: 'progress',
                  Cell: row => (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dadada',
                        borderRadius: '2px'
                      }}
                    >
                      <div
                        style={{
                          width: `${row.value}%`,
                          height: '100%',
                          backgroundColor:
                            row.value > 66
                              ? '#85cc00'
                              : row.value > 33
                                ? '#ffbf00'
                                : '#ff2e00',
                          borderRadius: '2px',
                          transition: 'all .2s ease-out'
                        }}
                      />
                    </div>
                  )
                },
                {
                  Header: 'Status',
                  accessor: 'status',
                  Cell: row => (
                    <span>
                      <span
                        style={{
                          color:
                            row.value === 'relationship'
                              ? '#ff2e00'
                              : row.value === 'complicated'
                                ? '#ffbf00'
                                : '#57d500',
                          transition: 'all .3s ease'
                        }}
                      >
                        &#x25cf;
                      </span>{' '}
                      {row.value === 'relationship'
                        ? 'In a relationship'
                        : row.value === 'complicated'
                          ? `It's complicated`
                          : 'Single'}
                    </span>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  } */
}

// store의 state를 props로 가져오기
const mapStateToProps = state => {
  return { hosts: state.Hosts.hosts, resources: state.Hosts.resources };
};

// action을 props로 가져오기
const mapDispatchToProps = dispatch => ({
  HostsActions: bindActionCreators(hostsActions, dispatch)
});

// connect HOC을 이용하여 적용
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableView);
