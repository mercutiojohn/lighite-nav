<template>
  <div class="tiny-todo">
    <div class="header">
      <span class="title">待办清单</span>
    </div>
    <div class="todo-input-box">
      <input
        type="text"
        name=""
        :placeholder="tip"
        id="todoInput"
        @keyup.enter="addTodoItem()"
        v-model="editingTodoItem.text"
      />
    </div>
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @mouseover="showDelete(index)"
        @mouseleave="showDelete('')"
      >
        <div class="left">
          <input
            type="checkbox"
            name=""
            id=""
            v-model="item.checked"
            @click="doneTodo(index)"
          />
          <!-- <span v-text="index"></span> -->
          <span
            v-text="item.text"
            :class="{ 'todo-text-checked': item.checked, 'todo-text': true }"
          ></span>
        </div>
        <div :class="{ right: true, 'right-show': hoverIndex === index }">
          <button class="icon-button" @click="deleteTodoItem(index)">
            <span class="iconfont icon-trash"></span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  components: {},
  data() {
    return {
      tip: "今天想做些什么呢?",
      editingTodoItem: {
        text: "",
      },
      list: [
        {
          text: "正在加载",
          checked: false,
          createdAt: "",
        },
      ],
      hoverIndex: "",
    };
  },
  computed: {
    remoteList: function () {
      return this.$store.getters.getTodoList;
    },
  },
  watch: {
    list() {
      this.$store.commit("setTodoList", this.list);
    },
  },
  methods: {
    addTodoItem() {
      let data = {
        text: this.editingTodoItem.text,
        createdAt: Date.now(),
        checked: false,
        doneAt: "",
      };
      this.list.unshift(data);
      this.editingTodoItem.text = "";
    },
    deleteTodoItem(index) {
      this.list.splice(index, 1);
    },
    doneTodo(index) {
      setTimeout(() => {
        if (this.list[index].checked) this.list[index].doneAt = Date.now();
        else this.list[index].doneAt = "";
        this.updateTodo();
      }, 5);
    },
    updateTodo() {
      setTimeout(() => {
        this.$store.commit("setTodoList", this.list);
      }, 5);
    },
    showDelete(index) {
      this.hoverIndex = index;
    },
  },
  created() {},
  mounted() {
    this.list = this.remoteList;
  },
  beforeDestroy() {},
};
</script>
<style lang="css" src="../../styles/card.css" scoped>
</style>
<style scoped>
.tiny-todo{
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.todo-text {
  user-select: text;
}
.todo-text-checked {
  opacity: 0.6;
  text-decoration: line-through;
}
#todoInput {
  width: 100%;
}
.todo-input-box {
  margin: 0 20px 5px 20px;
}
.list {
  margin: 5px 0 20px 20px;
  overflow-y: scroll;
}
.list::-webkit-scrollbar{
  width: 3px;
}
.list::-webkit-scrollbar-thumb{
  background: var(--bg-color);;
}
.list .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding-right: 20px;
  border-bottom: 1px solid var(--line-color);
}
/* .list .item:nth-child(1) {
  margin-top: 10px;
} */
.list .item:last-child {
  border-bottom: none;
}
.list .item .left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 8px 0;
  flex-shrink: 1;
  overflow: hidden;
}
.todo-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list .item .right {
  flex-shrink: 0;
  display: none;
}
.list .item .right-show {
  display: block;
}
.icon-button:active {
  background: var(--warn-color);
}
</style>