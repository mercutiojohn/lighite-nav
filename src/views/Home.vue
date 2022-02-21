<template>
  <div class="home">
    <div class="card card-main"><GreetingBox /></div>
    <div class="card card-small"><Weather /></div>
    <div class="card card-long"><TinyToDo /></div>
    <div class="card card-small"></div>
    <div class="card card-sub1"><TinyVideo /></div>
    <div class="card card-sub2"><TinyBook /></div>
    <div class="card card-sub1"><TinyMusic /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import TinyBook from "@/components/widgets/TinyBook.vue";
import TinyVideo from "@/components/widgets/TinyVideo.vue";
import TinyMusic from "@/components/widgets/TinyMusic.vue";
import GreetingBox from '@/components/widgets/GreetingBox.vue';
import Weather from '@/components/widgets/Weather.vue';
import TinyToDo from '@/components/widgets/TinyToDo.vue';

export default {
  name: "Home",
  components: {
    TinyBook,
    TinyVideo,
    TinyMusic,
    GreetingBox,
    Weather,
    TinyToDo
  },
};
</script>

<style scoped>
.home {
  --padding: 50px;
  box-sizing: border-box;
  padding: var(--padding);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(
    2,
    calc((100vh - var(--head-height) - var(--padding)) / 3)
  );
  grid-auto-rows: minmax(300px, auto);
  gap: 1.5vw;
}
@media screen and (max-width: 600px) {
  .home {
    --padding: 20px;
    width: 100vw;
    grid-template-rows: calc(100vh - var(--bottom-height) - var(--head-height) - var(--padding) * 2 - 300px);
    grid-auto-rows: minmax(100px, auto);

  }
}
.card {
  box-sizing: border-box;
  background: var(--card-color);
  border-radius: var(--card-radius);
  overflow-x: hidden;
  /* overflow-y: scroll; */
}
.card::-webkit-scrollbar{
  width: 5px;
  /* background: #000; */
}
.card::-webkit-scrollbar-thumb{
  border-radius: 3px;
  background: var(--bg-color);
}
.card-no-bg{
  background: transparent;
}

.card-main {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}
.card-sub1{
  grid-column: 1 / 3;
}
.card-sub2{
  grid-column: 3 / 5;
}
.card-more{
  grid-column: 1 / 5;
}
.card-long{
  grid-row: 1 / 3;
}
@media screen and (max-width: 600px) {
  .card-sub1,
  .card-sub2,
  .card-main,
  .card-small,
  .card-long,
  .card-more{
      grid-column: 1 / 5;
  }
}
</style>
