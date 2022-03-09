<template>
<div class="nav-block" v-for="(item, index) in navs.others" :key="index">
      <div class="list-header">
        <span class="title" v-text="item.attributes.name"></span>
      </div>
      <div class="nav-list" v-if="item.attributes.sites.data != null">
        <a
          :href="item_1.attributes.url"
          target="_blank"
          :class="{
            'nav-item': true,
            'ef-float': true,
            'nav-item-blurred': bgPrepared && settings.useBlur,
            'nav-item-wide': testSubsites(item_1.attributes),
          }"
          v-for="(item_1, index_1) in item.attributes.sites.data"
          :key="index_1"
        >
          <div
            :class="{
              left: true,
              'left-wide': testSubsites(item_1.attributes),
            }"
          >
            <div class="top">
              <div
                class="icon-area"
                :style="'background-color: ' + item_1.attributes.color"
              >
                <img
                  :class="{
                    icon: true,
                    'icon-no-padding': item_1.attributes.no_padding,
                  }"
                  :src="getIcon(item_1)"
                  alt=""
                  srcset=""
                />
              </div>
              <transition name="fade">
                <div
                  :class="{
                    'btn-modify': true,
                    'add-favor': true,
                    'ef-pudding': true,
                    'icon-button': true,
                  }"
                  v-if="modifyShow"
                  @click.prevent="addFavor(item_1)"
                >
                  <span class="iconfont icon-add"></span>
                </div>
              </transition>
            </div>
            <span
              class="title fix-text-overflow"
              v-text="item_1.attributes.title"
            ></span>
          </div>
          <div class="subsites-list" v-if="testSubsites(item_1.attributes)">
            <a
              :href="item_2.attributes.url"
              target="_blank"
              :class="{
                'subsite-item': true,
                'subsite-item-blurred': bgPrepared && settings.useBlur,
              }"
              v-for="(item_2, index_2) in item_1.attributes.subsites.data"
              :key="index_2"
            >
              <span
                class="title fix-text-overflow"
                v-text="item_2.attributes.title"
              ></span>
            </a>
          </div>
        </a>
      </div>
    </div>
</template>

<script>
export default {
name: "",
components: {},
data() {
return {

};
},
computed: {},
watch: {},
methods: {},
created(){},
mounted(){},
beforeDestroy(){}
};
</script>

<style>
</style>