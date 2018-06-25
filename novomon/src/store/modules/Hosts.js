import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 타입's
const GET_HOSTS = 'hosts/GET_HOSTS';

// 액션's
export const getHosts = createAction(GET_HOSTS);

// Promise.all([
//   fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent'),
//   fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
// ])
// .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
// .then(([data1, data2]) => this.setState({
//   recentInfo: data1,
//   alltimeInfo: data2
// }));

export const getHostsAsync = callback => dispatch => {
  // v1/hosts
  // v1/host-status/resource
  Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/1`),
    fetch(`https://jsonplaceholder.typicode.com/posts/1`)
  ]).then(([res1, res2]) => {
    let hosts = JSON.parse(
      '[{"ip":"192.168.0.1","name":"gw","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.29","name":"vm_tsdn","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.13","name":"monster1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.14","name":"monster2","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.15","name":"nana","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.18","name":"berry","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.23","name":"twin","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":"00:00:00-09:05:00"},{"ip":"192.168.0.25","name":"Novo2_ap","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.26","name":"t1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.28","name":"zte_win","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.36","name":"k2","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.124","name":"u1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.128","name":"p2","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.41","name":"a1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.43","name":"L1","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.16","name":"k1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null}]'
    );

    let resources = JSON.parse(
      '[{"ip":"192.168.0.29","diskStates":[{"info":"/","total":27345022976,"usable":16390328320,"percent":40}],"memoryState":{"info":"Memory","total":4130504704,"usable":326631424,"percent":92}},{"ip":"192.168.0.13","diskStates":[{"info":"/","total":243843866624,"usable":115705909248,"percent":52}],"memoryState":{"info":"Memory","total":33419382784,"usable":254615552,"percent":99}},{"ip":"192.168.0.14","diskStates":[{"info":"/","total":243843866624,"usable":23032832000,"percent":90}],"memoryState":{"info":"Memory","total":33419382784,"usable":225898496,"percent":99}},{"ip":"192.168.0.15","diskStates":[{"info":"/","total":103172980736,"usable":71840161792,"percent":30}],"memoryState":{"info":"Memory","total":3145154560,"usable":83255296,"percent":97}},{"ip":"192.168.0.18","diskStates":[{"info":"/","total":74945134592,"usable":66276085760,"percent":11}],"memoryState":{"info":"Memory","total":3153461248,"usable":1716166656,"percent":45}},{"ip":"192.168.0.23","diskStates":null,"memoryState":null},{"ip":"192.168.0.26","diskStates":[{"info":"/","total":52844687360,"usable":40935600128,"percent":22}],"memoryState":{"info":"Memory","total":1040703488,"usable":65146880,"percent":93}},{"ip":"192.168.0.124","diskStates":[{"info":"/","total":20079898624,"usable":586498048,"percent":97}],"memoryState":{"info":"Memory","total":8370987008,"usable":3652026368,"percent":56}},{"ip":"192.168.0.128","diskStates":[{"info":"/","total":65393258496,"usable":44736753664,"percent":31}],"memoryState":{"info":"Memory","total":4138082304,"usable":941584384,"percent":77}},{"ip":"192.168.0.41","diskStates":[{"info":"/","total":9707950080,"usable":2700406784,"percent":72}],"memoryState":{"info":"Memory","total":8365920256,"usable":6596874240,"percent":21}},{"ip":"192.168.0.16","diskStates":[{"info":"/","total":263166824448,"usable":181711716352,"percent":30}],"memoryState":{"info":"Memory","total":8255426560,"usable":2033106944,"percent":75}},{"ip":"192.168.0.34","diskStates":[{"info":"/","total":487624581120,"usable":66454675456,"percent":86}],"memoryState":{"info":"Memory","total":4113494016,"usable":172740608,"percent":95}}]'
    );

    dispatch(
      getHosts({
        hosts,
        resources
      })
    );

    callback ? callback() : '';
  });
};

// 초기화
const initialize = {
  hosts: [],
  resources: []
};

// 리듀서's
export default handleActions(
  {
    [GET_HOSTS]: (state, action) => {
      return produce(state, draftState => {
        draftState.hosts = action.payload.hosts;
        draftState.resources = action.payload.resources;
      });
    }
  },
  initialize
);
