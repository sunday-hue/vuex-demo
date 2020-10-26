import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义后台渲染的数据
    list: [],
    // input输入框的原始的值
    inputVal: 'aaa',
    // 数组的默认id
    initid: 5,
    // 默认的值是全部显示的状态
    key: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    listenIpt(state, val) {
      state.inputVal = val
    },
    addItem(state) {
      var obj = {
        done: false,
        id: state.iniTid,
        info: state.inputVal.trim()
      }
      state.list.push(obj)
      state.initid++
      state.inputVal = ''
    },
    delById(state, id) {
      const i = state.list.findIndex(x => x === id)
      state.list.splice(i, 1)
    },
    // 判断复选框选中的个数
    judgeCheck(state, param) {
      // console.log(param)  // ok
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已经完成的数据
    clearDone(state) {
      state.list = state.list.filter(x => !x.done)
    },
    // 记录选中的key值
    keyValue(state, key) {
      state.key = key
    }
  },
  actions: {
    // 异步获取todolist的数据列表
    getData(context) {
      axios
        .get('/list.json')
        .then(({ data }) => {
          // 获取数据成功后的回调函数
          // console.log(data)
          context.commit('initList', data)
        })
        .catch(err => console.error(err))
    }
  },
  modules: {},
  getters: {
    // 把剩余的条数，用计算属性设置
    undoneItem(state) {
      return state.list.filter(x => x.done === false).length
      // console.log(undo)  filter函数返回的是一个数组
    },
    changeList(state) {
      if (state.key === 'all') {
        return state.list
      }
      if (state.key === 'undo') {
        return state.list.filter(x => !x.done)
      }
      if (state.key === 'done') {
        return state.list.filter(x => x.done)
      }
    }
  }
})
