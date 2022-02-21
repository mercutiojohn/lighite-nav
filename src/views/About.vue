<template>
  <div class="about common-page">
    <div v-for="(item,index) in text" :key="index">
      <span class="title">{{item.title}}</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      text:''
    }
  },
  methods:{
    getData(){
      axios.get('http://www.mercutio.club/api/posts?pageSize=100')
      .then((response)=>{
        console.log(response)
        this.text = response.data.data;
      })
    }
  },
  mounted(){
    this.getData();
  }
}
</script>
<style scoped>
.about{
  padding: 20px;
}
</style>
