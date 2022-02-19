<template>
  <div class="home">
    <div class="card card-main"><OneSentence /></div>
    <div class="card card-sub"><VideoStation /></div>
    <div class="card card-sub"><MusicCatalog /></div>
    <div class="card "><BookShelf /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import OneSentence from "@/components/widgets/OneSentence.vue";
import BookShelf from "@/components/widgets/BookShelf.vue";
import VideoStation from "@/components/widgets/VideoStation.vue";
import MusicCatalog from "@/components/widgets/MusicCatalog.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    OneSentence,
    BookShelf,
    VideoStation,
    MusicCatalog
  },
};
</script>

<style scoped>
.home {
  --padding: 50px;
  box-sizing: border-box;
  padding: var(--padding);
  width: calc(100vw - var(--side-width));
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(
    3,
    calc((100vh - var(--head-height) - var(--padding)) / 3)
  );
  grid-auto-rows: minmax(200px, auto);
  gap: 1.5vw;
}
@media screen and (max-width: 600px) {
  .home {
    --padding: 20px;
    width: 100vw;
  }
}
.card {
  box-sizing: border-box;
  background: var(--card-color);
  border-radius: var(--card-radius);
  transition: all 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px 3px #00000024;
}
.card-main {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}
.card-sub{
  grid-column: 3 / 5;
}
</style>
