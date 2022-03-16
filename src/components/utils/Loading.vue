<template>
  <div class="loading-inner">
    <div class="inner-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
:root{
    --loading-spinner-color: #3c9dff;
}
.loading-inner {
  --bg-color: #fff;
  /* background: var(--bg-color); */
  width:100%;
  height: 100%;
  /* width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10012; */
  /* position:absolute; */
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (prefers-color-scheme: dark) {
  :root {
    --loading-spinner-color: #3c9dff;
  }
  .loading {
    --bg-color: #000;
  }
}

.sk-transparent {
  color: transparent !important;
}

.sk-opacity {
  opacity: 0 !important;
}

.sk-text-14-2857 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eee 0,
    #eee 85.7143%,
    transparent 0
  ) !important;
  background-size: 100% 1.4rem;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text--4-5455 {
  background-image: linear-gradient(
    transparent -4.5455%,
    #eee 0,
    #eee 104.5455%,
    transparent 0
  ) !important;
  background-size: 100% 6.875rem;
  position: relative !important;
}

.sk-image {
  background: #efefef !important;
}

.sk-rect {
  border-radius: 0;
}

.sk-pseudo::after,
.sk-pseudo::before {
  background: #efefef !important;
  color: transparent !important;
  border-color: transparent !important;
}

.sk-pseudo-rect::after,
.sk-pseudo-rect::before {
  border-radius: 0 !important;
}

.sk-pseudo-circle::after,
.sk-pseudo-circle::before {
  border-radius: 50% !important;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

.inner-loading-spinner {
  /* top: 50%; */
  /* margin-top: -1.5rem; */
  /* width: 100%; */
  text-align: center;
  /* position: fixed; */
}

.inner-loading-spinner .circular {
  height: 3rem;
  width: 3rem;
  animation: 2s linear infinite loading-rotate;
}

.inner-loading-spinner .path {
  animation: 1.5s ease-in-out infinite loading-dash;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 5;
  stroke: var(--loading-spinner-color);
  stroke-linecap: round;
}
</style>