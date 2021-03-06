import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 타입's
const GET_LOGIN_STATE = 'Auth/GET_LOGIN_STATE';
const SET_LOGIN_STATE = 'Auth/SET_LOGIN_STATE';

// 액션's
export const getLoginState = createAction(GET_LOGIN_STATE);
export const setLoginState = createAction(SET_LOGIN_STATE);

export const getLoginStateAsync = callback => dispatch => {
  // v1/hosts
  // v1/host-status/resource
  // Promise.all([
  //   fetch(`https://jsonplaceholder.typicode.com/posts/1`),
  //   fetch(`https://jsonplaceholder.typicode.com/posts/1`),
  //   fetch(`https://jsonplaceholder.typicode.com/posts/1`)
  // ]).then(([res1, res2, res3]) => {
  //   let hosts = JSON.parse(
  //     '[{"ip":"192.168.0.1","name":"gw","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.29","name":"vm_tsdn","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.13","name":"monster1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.14","name":"monster2","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.15","name":"nana","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.18","name":"berry","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.23","name":"twin","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":"00:00:00-09:05:00"},{"ip":"192.168.0.25","name":"Novo2_ap","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.26","name":"t1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.28","name":"zte_win","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.36","name":"k2","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.124","name":"u1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.128","name":"p2","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.41","name":"a1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.43","name":"L1","mode":"ping","monitoringStatus":"on","monitoringIgnoreTime":null},{"ip":"192.168.0.16","name":"k1","mode":"agent","monitoringStatus":"on","monitoringIgnoreTime":null}]'
  //   );
  //   let resources = JSON.parse(
  //     '[{"ip":"192.168.0.29","diskStates":[{"info":"/","total":27345022976,"usable":16390328320,"percent":40}],"memoryState":{"info":"Memory","total":4130504704,"usable":326631424,"percent":92}},{"ip":"192.168.0.13","diskStates":[{"info":"/","total":243843866624,"usable":115705909248,"percent":52}],"memoryState":{"info":"Memory","total":33419382784,"usable":254615552,"percent":99}},{"ip":"192.168.0.14","diskStates":[{"info":"/","total":243843866624,"usable":23032832000,"percent":90}],"memoryState":{"info":"Memory","total":33419382784,"usable":225898496,"percent":99}},{"ip":"192.168.0.15","diskStates":[{"info":"/","total":103172980736,"usable":71840161792,"percent":30}],"memoryState":{"info":"Memory","total":3145154560,"usable":83255296,"percent":97}},{"ip":"192.168.0.18","diskStates":[{"info":"/","total":74945134592,"usable":66276085760,"percent":11}],"memoryState":{"info":"Memory","total":3153461248,"usable":1716166656,"percent":45}},{"ip":"192.168.0.23","diskStates":null,"memoryState":null},{"ip":"192.168.0.26","diskStates":[{"info":"/","total":52844687360,"usable":40935600128,"percent":22}],"memoryState":{"info":"Memory","total":1040703488,"usable":65146880,"percent":93}},{"ip":"192.168.0.124","diskStates":[{"info":"/","total":20079898624,"usable":586498048,"percent":97}],"memoryState":{"info":"Memory","total":8370987008,"usable":3652026368,"percent":56}},{"ip":"192.168.0.128","diskStates":[{"info":"/","total":65393258496,"usable":44736753664,"percent":31}],"memoryState":{"info":"Memory","total":4138082304,"usable":941584384,"percent":77}},{"ip":"192.168.0.41","diskStates":[{"info":"/","total":9707950080,"usable":2700406784,"percent":72}],"memoryState":{"info":"Memory","total":8365920256,"usable":6596874240,"percent":21}},{"ip":"192.168.0.16","diskStates":[{"info":"/","total":263166824448,"usable":181711716352,"percent":30}],"memoryState":{"info":"Memory","total":8255426560,"usable":2033106944,"percent":75}},{"ip":"192.168.0.34","diskStates":[{"info":"/","total":487624581120,"usable":66454675456,"percent":86}],"memoryState":{"info":"Memory","total":4113494016,"usable":172740608,"percent":95}}]'
  //   );
  //   let backups = JSON.parse(
  //     '[{"ip":"192.168.0.29","path":[]},{"ip":"192.168.0.13","path":[{"name":"/media/monster1/hdd2/backup","fileInfo":[{"name":"17_06_18_04_00","type":"DIRECTORY","size":211864311079,"date":"2018-06-16T19:32:40.000+0000"},{"name":"24_06_18_04_00","type":"DIRECTORY","size":211929195612,"date":"2018-06-23T19:42:58.000+0000"}]}]},{"ip":"192.168.0.14","path":[{"name":"/media/monster2/hdd1/backup","fileInfo":[{"name":"17_06_18_04_00","type":"DIRECTORY","size":333156220534,"date":"2018-06-16T19:32:45.000+0000"},{"name":"24_06_18_04_00","type":"DIRECTORY","size":333292390055,"date":"2018-06-23T19:35:13.000+0000"}]}]},{"ip":"192.168.0.15","path":[]},{"ip":"192.168.0.18","path":[]},{"ip":"192.168.0.23","path":null},{"ip":"192.168.0.26","path":[]},{"ip":"192.168.0.124","path":[]},{"ip":"192.168.0.128","path":null},{"ip":"192.168.0.41","path":[]},{"ip":"192.168.0.16","path":[]},{"ip":"192.168.0.34","path":[{"name":"/home/svnm/backup","fileInfo":[{"name":"01_06_18_03_00","type":"DIRECTORY","size":195461856001,"date":"2018-05-31T18:00:01.000+0000"}]}]}]'
  //   );
  //   let serverStates = hosts.map(host => {
  //     let resource = resources.find(r => host.ip === r.ip);
  //     let backup = backups.find(b => host.ip === b.ip);
  //     return Object.assign(host, resource, backup);
  //   });
  //   dispatch(
  //     getServerStates({
  //       serverStates
  //     })
  //   );
  //  });

  setTimeout(() => {
    let isLoginSuccess = true;
    dispatch(
      getLoginState({
        isLoginSuccess
      })
    );
  }, 1000);
};

export const setLoginStateAsync = state => dispatch => {
  dispatch(
    setLoginState({
      isLoginSuccess: state
    })
  );
};

// 초기화
const initialize = {
  isLoginSuccess: false
};

// 리듀서's
export default handleActions(
  {
    [GET_LOGIN_STATE]: (state, action) => {
      return produce(state, draftState => {
        draftState.isLoginSuccess = action.payload.isLoginSuccess;
      });
    },
    [SET_LOGIN_STATE]: (state, action) => {
      return produce(state, draftState => {
        draftState.isLoginSuccess = action.payload.isLoginSuccess;
      });
    }
  },
  initialize
);
