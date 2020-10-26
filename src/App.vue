<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputVal"
      @input="listenIpt"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="changeList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            (e) => {
              judgeCheckNum(e, item.id)
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="delById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ undoneItem }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="key === 'all' ? 'primary' : 'default'"
            @click="cheangeTab('all')"
            >全部</a-button
          >
          <a-button
            :type="key === 'undo' ? 'primary' : 'default'"
            @click="cheangeTab('undo')"
            >未完成</a-button
          >
          <a-button
            :type="key === 'done' ? 'primary' : 'default'"
            @click="cheangeTab('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getData')
  },
  computed: {
    ...mapState(['changeList', 'inputVal', 'key']),
    ...mapGetters(['undoneItem', 'changeList'])
  },
  methods: {
    ...mapMutations(['delById', 'clearDone']),
    // 监听input输入框的改变事件
    listenIpt(e) {
      // console.log(e.target.value)
      this.$store.commit('listenIpt', e.target.value)
    },
    addItem() {
      if (this.inputVal.trim().length <= 0) {
        return this.$message.info('请在输入框中输入内容')
      }
      this.$store.commit('addItem')
    },
    judgeCheckNum(e, id) {
      // console.log(e)
      // 获取当前最新的复选框的选中状态的值
      // console.log(e.target.checked)
      // console.log(id)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('judgeCheck', param)
    },
    cheangeTab(key) {
      this.$store.commit('keyValue', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
