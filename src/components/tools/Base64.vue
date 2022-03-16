<template>
  <div class="encode-template">
    <h1>Base64编码转换</h1>
    <textarea
      class="editor-area better-input"
      name=""
      id=""
      cols="30"
      rows="10"
      v-model="input"
    ></textarea>
    <!-- <Editor :value="input" index="1" @updateValue="input = $event" /> -->
    <div class="options">
      <button
        class="convert-button common-button"
        @click="convert('btoa')"
      >
        文本转换为Base64
      </button>
      <button
        class="convert-button common-button"
        @click="convert('atob')"
      >
        Base64转换为文本
      </button>
      <!-- <span>{{this.values.input}}</span> -->
    </div>
    <textarea
      class="editor-area better-input"
      name=""
      id=""
      cols="30"
      rows="10"
      v-model="output"
    ></textarea>

    <!-- <Editor :value="output" index="2" ref="outputEditor" :key="timer" @updateValue="output = $event" /> -->
  </div>
</template>

<script>
export default {
  name: "Base64",
  components: {
    // Editor
  },
  data() {
    return {
      input: "",
      output: "",
      timer: "",
    };
  },
  methods: {
    convert(mode) {
      if (mode == "btoa") {
        this.output = window.btoa(this.input);
      } else {
        this.output = window.atob(this.input);
      }
    },
  },
  watch: {
    output(newVal) {
      this.timer = new Date().getTime();
      // console.log(newVal);
      // this.outputEditor.changeData(newVal);
    },
  },
  mounted() {
    this.timer = new Date().getTime();
  },
};
</script>

<style scoped>
.encode-template {
  display: flex;
  flex-direction: column;
  padding: 30px;
}

.encode-template .options {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.convert-button{
  margin-right: 10px;
  padding: 8px 12px;
  transition: all .2s ease;
}

</style>