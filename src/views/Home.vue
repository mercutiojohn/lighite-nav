<template>
  <div class="home">
    <div class="card card-main"><GreetingBox /></div>
    <div class="card card-small"><Weather /></div>
    <div class="card card-long"><TinyToDo /></div>
    <div class="card card-small"></div>
    <!-- <div class="card card-sub1"><TinyVideo /></div> -->
    <!-- <div class="card card-sub2"><TinyBook /></div> -->
    <div class="card card-new"><TinyMusicChart /></div>
    <div class="card card-new"><TinyAnimeChart /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import TinyBook from "@/components/widgets/TinyBook.vue";
import TinyVideo from "@/components/widgets/TinyVideo.vue";
import TinyAnimeChart from "@/components/widgets/TinyAnimeChart.vue";
import TinyMusic from "@/components/widgets/TinyMusic.vue";
import TinyMusicChart from "@/components/widgets/TinyMusicChart.vue";
import GreetingBox from "@/components/widgets/GreetingBox.vue";
import Weather from "@/components/widgets/Weather.vue";
import TinyToDo from "@/components/widgets/TinyToDo.vue";

export default {
  name: "Home",
  components: {
    TinyBook,
    TinyVideo,
    TinyMusic,
    TinyMusicChart,
    TinyAnimeChart,
    GreetingBox,
    Weather,
    TinyToDo,
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

  grid-auto-rows: minmax(300px, auto);
  gap: 1.5vw;
  height: unset;
  overflow: unset;
}
@media screen and (min-width: 1080px) {
  .home {
    grid-template-rows: repeat(
      2,
      calc((100vh - var(--head-height) - var(--padding)) / 3)
    );
  }
}
@media screen and (min-width: 700px) and (max-width: 1080px) {
  .home {
    --padding: 20px;
    grid-template-rows: unset, 300px;
    grid-auto-rows: minmax(100px, auto);
  }
}
@media screen and (max-width: 700px) {
  .home {
    --padding: 20px;
    grid-template-rows: unset;
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
.card::-webkit-scrollbar {
  width: 5px;
  /* background: #000; */
}
.card::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: var(--bg-color);
}
/*  */
.bilianime-area::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 0;
  position: absolute;
  right: 0;
  transition: all 0.2s ease;
  cursor: pointer;
}
.bilianime-area::-webkit-scrollbar:window-inactive {
  /* display: none; */
  width: 0;
}
.bilianime-area::-webkit-scrollbar-button,
.bilianime-area::-webkit-scrollbar-corner,
.bilianime-area::-webkit-scrollbar-track {
  background-color: transparent;
}

.bilianime-area::-webkit-scrollbar-button {
  background-repeat: no-repeat;
  cursor: pointer;
}

.bilianime-area::-webkit-scrollbar-button:vertical {
  background-position: 50%;
  width: 18px;
  height: 18px;
}

.bilianime-area::-webkit-scrollbar-button:horizontal {
  background-position: 50%;
  width: 0;
}
.bilianim-content::-webkit-scrollbar-track {
  background: transparent;
  /* width: 100px; */
}

.bilianime-area::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.bilianime-area::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}

.bilianime-list::-webkit-scrollbar-resizer {
  background-color: #ff6e00;
}
.bilianime-area::-webkit-scrollbar-button:vertical:increment {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUUlEQVQ4T6XLMQ6AMAwEwfz/bXRIfOeQCxckK8iKYgqvfCPJLxgNjAZGA6OB0VjCcV55M/8/jkbDMv+VJbSdccHYvsYFo4HRwGhgNDAaGPdl3LNlBnofQ4+bAAAAAElFTkSuQmCC);
}

.bilianime-area::-webkit-scrollbar-button:vertical:increment:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAUklEQVQ4T6XLsQ2AMAwF0ey/A1swAnt95MIFyQlyoniFT/4jyS8YDYwGRgOjgdFYwnFeeTP/P45GwzL/lSW0nXHB2L7GBaOB0cBoYDQwGhj3Zdx8sf7rjOGQqwAAAABJRU5ErkJggg==);
}

.bilianime-area::-webkit-scrollbar-button:vertical:decrement {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVUlEQVQ4T6XMMQoAIQxEUe9/NrsFrzOSIqDxgzu7xSv8ZGySfsHowOjA6MDowOjAmPozFGpfYQw5vn2CsY5TvQtHoOGq3m+PLzA6MDowOjA6ML6nNgFW+wZ6kTk6FAAAAABJRU5ErkJggg==);
}

.bilianime-area::-webkit-scrollbar-button:vertical:decrement:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAVklEQVQ4T6XMwQ3AIAwEQfrvgS5SAn0d8sMSmJXIJY95sPLRJP2C0YHRgdGB0YHRgTH1ZyjUvsIYcnz7BGMdp3oXjkDDVb3fHl9gdGB0YHRgdGB8T20CB+X+675uLU0AAAAASUVORK5CYII=);
}
/*  */
.card-no-bg {
  background: transparent;
}

.card-main {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}
.card-sub1 {
  grid-column: 1 / 3;
}
.card-sub2 {
  grid-column: 3 / 5;
}
.card-more {
  grid-column: 1 / 5;
}
.card-long {
  grid-row: 1 / 3;
}
.card-new {
  grid-column-start: span 1;
}
@media screen and (min-width: 700px) and (max-width: 1000px) {
  .card-main,
  .card-small {
    grid-column: 1 / 5;
  }
  .card-long {
    grid-row: unset;
    grid-column: 1 / 5;
  }
  .card-sub1 {
    grid-column: 1 / 3;
  }

  .card-sub2 {
    grid-column: 3 / 5;
  }
  .card-more {
    grid-row: unset;
    grid-column: 1 / 5;
  }
  .card-new {
    grid-column-start: span 2;
  }
}
@media screen and (max-width: 700px) {
  .card-sub1,
  .card-sub2,
  .card-main,
  .card-small,
  .card-long,
  .card-more {
    grid-row: unset;
    grid-column: 1 / 5;
  }
  .card-new {
    grid-column-start: span 4;
  }
}

</style>
