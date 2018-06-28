import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

const Wrapper = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
`;

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = { inProgress: true, intervalTimer: null, serverStates: [] };
  }
  componentDidMount() {
    this.request();
    let intervalTimer = setInterval(() => this.request(), 3000);
    this.setState({ intervalTimer: intervalTimer });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalTimer);
  }

  request() {
    Promise.all([
      fetch(`http://192.168.0.26:8765/v1/hosts`),
      fetch(`http://192.168.0.26:8765/v1/host-status`)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([res1, res2]) => {
        // res1 =
        //   '[{"ip":"192.168.0.1","name":"gw","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.29","name":"vm_tsdn","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.13","name":"monster1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.14","name":"monster2","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.15","name":"nana","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.18","name":"berry","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.23","name":"twin","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":"00:00:00-09:05:00"},{"ip":"192.168.0.25","name":"Novo2_ap","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.26","name":"t1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.28","name":"zte_win","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.36","name":"k2","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.124","name":"u1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.128","name":"p2","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.41","name":"a1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.43","name":"L1","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.16","name":"k1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.34","name":"svnPc","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null}]';
        // res2 =
        //   '{"pingStates":[{"ip":"192.168.0.1","name":"gw","status":"on"},{"ip":"192.168.0.29","name":"vm_tsdn","status":"on"},{"ip":"192.168.0.13","name":"monster1","status":"on"},{"ip":"192.168.0.14","name":"monster2","status":"on"},{"ip":"192.168.0.15","name":"nana","status":"on"},{"ip":"192.168.0.18","name":"berry","status":"on"},{"ip":"192.168.0.23","name":"twin","status":"on"},{"ip":"192.168.0.25","name":"Novo2_ap","status":"on"},{"ip":"192.168.0.26","name":"t1","status":"on"},{"ip":"192.168.0.28","name":"zte_win","status":"on"},{"ip":"192.168.0.36","name":"k2","status":"on"},{"ip":"192.168.0.124","name":"u1","status":"on"},{"ip":"192.168.0.128","name":"p2","status":"on"},{"ip":"192.168.0.41","name":"a1","status":"on"},{"ip":"192.168.0.43","name":"L1","status":"on"},{"ip":"192.168.0.16","name":"k1","status":"on"},{"ip":"192.168.0.34","name":"svnPc","status":"on"}],"resourceStates":[{"ip":"192.168.0.29","diskStates":[{"info":"/","total":27345022976,"usable":16280858624,"percent":40}],"memoryState":{"info":"Memory","total":4130504704,"usable":247181312,"percent":94}},{"ip":"192.168.0.13","diskStates":[{"info":"/","total":243843866624,"usable":115683565568,"percent":52}],"memoryState":{"info":"Memory","total":33419382784,"usable":255135744,"percent":99}},{"ip":"192.168.0.14","diskStates":[{"info":"/","total":243843866624,"usable":22692130816,"percent":90}],"memoryState":{"info":"Memory","total":33419382784,"usable":230158336,"percent":99}},{"ip":"192.168.0.15","diskStates":[{"info":"/","total":103172980736,"usable":71853928448,"percent":30}],"memoryState":{"info":"Memory","total":3145154560,"usable":101842944,"percent":96}},{"ip":"192.168.0.18","diskStates":[{"info":"/","total":74945134592,"usable":66275905536,"percent":11}],"memoryState":{"info":"Memory","total":3153461248,"usable":1687531520,"percent":46}},{"ip":"192.168.0.23","diskStates":null,"memoryState":null},{"ip":"192.168.0.26","diskStates":[{"info":"/","total":52844687360,"usable":40932315136,"percent":22}],"memoryState":{"info":"Memory","total":1040703488,"usable":63705088,"percent":93}},{"ip":"192.168.0.124","diskStates":[{"info":"/","total":20079898624,"usable":571912192,"percent":97}],"memoryState":{"info":"Memory","total":8370987008,"usable":3525111808,"percent":57}},{"ip":"192.168.0.128","diskStates":null,"memoryState":null},{"ip":"192.168.0.41","diskStates":[{"info":"/","total":9707950080,"usable":2700378112,"percent":72}],"memoryState":{"info":"Memory","total":8365920256,"usable":6585753600,"percent":21}},{"ip":"192.168.0.16","diskStates":[{"info":"/","total":263166824448,"usable":181652172800,"percent":30}],"memoryState":{"info":"Memory","total":8255426560,"usable":1870069760,"percent":77}},{"ip":"192.168.0.34","diskStates":[{"info":"/","total":487624581120,"usable":66181427200,"percent":86}],"memoryState":{"info":"Memory","total":4113494016,"usable":126230528,"percent":96}}],"backupStates":[{"ip":"192.168.0.29","path":[]},{"ip":"192.168.0.13","path":[{"name":"/media/monster1/hdd2/backup","fileInfo":[{"name":"17_06_18_04_00","type":"DIRECTORY","size":211864311079,"date":"2018-06-16T19:32:40.000+0000"},{"name":"24_06_18_04_00","type":"DIRECTORY","size":211929195612,"date":"2018-06-23T19:42:58.000+0000"}]}]},{"ip":"192.168.0.14","path":[{"name":"/media/monster2/hdd1/backup","fileInfo":[{"name":"17_06_18_04_00","type":"DIRECTORY","size":333156220534,"date":"2018-06-16T19:32:45.000+0000"},{"name":"24_06_18_04_00","type":"DIRECTORY","size":333292390055,"date":"2018-06-23T19:35:13.000+0000"}]}]},{"ip":"192.168.0.15","path":[]},{"ip":"192.168.0.18","path":[]},{"ip":"192.168.0.23","path":null},{"ip":"192.168.0.26","path":[]},{"ip":"192.168.0.124","path":[]},{"ip":"192.168.0.128","path":null},{"ip":"192.168.0.41","path":[]},{"ip":"192.168.0.16","path":[]},{"ip":"192.168.0.34","path":[{"name":"/home/svnm/backup","fileInfo":[{"name":"01_06_18_03_00","type":"DIRECTORY","size":195461856001,"date":"2018-05-31T18:00:01.000+0000"}]}]}]}';

        let hosts = res1;
        let status = res2;
        let resources = status.resourceStates;
        let backups = status.backupStates;

        let serverStates = hosts.map(host => {
          let resource = resources.find(r => host.ip === r.ip);
          let backup = backups.find(b => host.ip === b.ip);
          return Object.assign(host, resource, backup);
        });

        console.log(serverStates);
        this.setState({ serverStates, inProgress: false });
      });
  }

  makeData() {
    const { serverStates } = this.state;
    console.log(this.state);

    let hostList = serverStates.slice();
    hostList.sort((a, b) => {
      let l = parseInt(a.ip.slice(a.ip.lastIndexOf('.') + 1, a.ip.length), 10);
      let r = parseInt(b.ip.slice(b.ip.lastIndexOf('.') + 1, b.ip.length), 10);
      return l > r ? 1 : l < r ? -1 : 0;
    });

    return hostList.map(host => {
      let disk =
        host.hasOwnProperty('diskStates') &&
        host.diskStates !== null &&
        host.diskStates.length !== 0
          ? host.diskStates[0].percent
          : '';

      let memory =
        host.hasOwnProperty('memoryState') && host.memoryState !== null
          ? host.memoryState.percent
          : '';
      return {
        ip: host.ip,
        name: host.name,
        mode: host.mode,
        ignore_time: host.monitoringIgnoreTime,
        status: host.monitoringStatus,
        disk: disk,
        memory: memory,
        backup:
          host.hasOwnProperty('path') &&
          host.path !== null &&
          host.path.length !== 0
            ? host.path[0]
            : ''
      };
    });
  }

  makeColumns() {
    const columns = [
      {
        Header: 'IP',
        accessor: 'ip', // String-based value accessors!,
        width: 150
      },
      {
        Header: '서버명',
        accessor: 'name'
        //  Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: '모드',
        accessor: 'mode',
        width: 100
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
                  transition: 'all .2s ease-out',
                  textAlign: 'center',
                  fontSize: '0.6em',
                  lineHeight: '16px',
                  color: `${oc.gray[1]}`
                }}
              >
                {`${row.value}%`}
              </div>
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
                  transition: 'all .2s ease-out',
                  textAlign: 'center',
                  fontSize: '0.6em',
                  lineHeight: '16px',
                  color: `${oc.gray[1]}`
                }}
              >
                {`${row.value}%`}
              </div>
            </div>
          );
        }
      },
      {
        Header: '백업 파일 경로',
        accessor: 'backup',
        Cell: row =>
          row.value !== '' ? (
            <div>
              <span style={{ fontSize: '0.8em' }}>{row.value.name}&nbsp;</span>
              <Tooltip
                id="tooltip-bottom"
                title={
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {row.value.fileInfo
                      .map(file => 'FILE: ' + file.name)
                      .join()
                      .replace(/,/gi, '\n')}
                  </div>
                }
                placement="bottom"
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    lineHeight: '16px',
                    borderRadius: '30%',
                    backgroundColor: `${oc.gray[6]}`,
                    textAlign: 'center',
                    fontSize: '0.7em',
                    color: 'white'
                  }}
                >
                  {row.value.fileInfo.length}
                </span>
              </Tooltip>
            </div>
          ) : (
            <div />
          )
      },
      {
        //Header: props => <span>Friend Age</span>, // Custom header components!
        Header: '모니터링 중지 시간',
        accessor: 'ignore_time',
        width: 160,
        Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>
      },
      {
        Header: '서버 상태',
        accessor: 'status',
        width: 100,
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

    return columns;
  }

  render() {
    return this.state.inProgress ? (
      <Wrapper>
        <CircularProgress size={70} />
      </Wrapper>
    ) : (
      <ReactTable
        data={this.makeData()}
        columns={this.makeColumns()}
        showPagination={false}
        sortable={false}
        className="-striped -highlight"
        getTrProps={(state, rowInfo, column) => {
          return {
            style: {
              fontSize: '14px'
            }
          };
        }}
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

export default TableView;
