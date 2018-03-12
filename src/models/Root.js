export default {
  namespace: 'app',

  state: {
    test: 123,
  },

  reducers: {
    getSysInfoSuccess(state, action) {
      const sysInfo = action.payload;
      return { ...state, ...sysInfo };
    },
  },

  effects: {
    *getSysInfo(action, { call, put }) {
      const sysInfo = { test: 345 };
      yield put({ type: 'getSysInfoSuccess', payload: sysInfo });
    },

    *init(action, { all, put }) {
      yield all([put({ type: 'getSysInfo' })]);
    },
  },
};
