<template>
  <div class="home">
    <div class="card card-main"><OneSentence /></div>
    <div class="card" v-for="i in 100"></div>
    <div class="card"></div>
    <div class="card"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import OneSentence from '@/components/widgets/OneSentence.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    OneSentence
  }
}
</script>

<style scoped>
.home{
  --padding:50px;
  box-sizing: border-box;
  padding:var(--padding);
  width: calc(100vw - var(--side-width));
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  grid-template-rows:repeat(3, calc((100vh - var(--head-height) - var(--padding) - 30px * 3 - 40px) / 3));
  grid-auto-rows: minmax(200px, auto);
  gap:1.5vw;
}
@media screen and (max-width: 600px) {
  .home{
    --padding:20px;
    width: 100vw;
  }
}
.card{
  box-sizing: border-box;
  /* width:100%; */
  /* height: 100px; */
  background: var(--card-color);
  border-radius: var(--card-radius);
}
.card-main{
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}
</style>
