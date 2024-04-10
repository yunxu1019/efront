<style lang="less" scoped>
// 只支持 less 一种
& {
  color: #fff;
  background: #567;
  height: 100%;
  width: 100%;
  position: relative;
  appearance: none;
}

&,
* {
  box-sizing: border-box;
}
@theight: 54px;
@lwidth: 300px;
.nav {
  height: @theight;
  margin-top: -@theight;
  background: #069;
}
> .menu,
> .main {
  display: inline-block;
  vertical-align: top;
  height: 100%;
}
> .menu {
  background: #000;
  width: @lwidth;
  margin-left: -@lwidth;
  max-width: 600px;
  min-width: @theight;
}
.menu-items {
  padding: 20px 0;
}
> .main {
  width: 100%;
}
& {
  padding: @theight 0 0 @lwidth;
}
> .body {
  width: 100%;
}
button {
  display: block;
  appearance: none;
  width: 100%;
  background: #fff4;
  color: #fff;
  position: relative;
  padding: 10px 16px;
  &:hover {
    background: #9cf4;
  }
  &:active {
    background: #9cf3;
  }
  &.actived {
    color: #39c;
    &:after {
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -20px;
      line-height: 40px;
      bottom: 0;

      padding: 0 10px;
      font-family: "宋体", sans-serif;
      content: ">";
    }
  }
}
.button {
  padding: 0 16px;
}
.title {
  font-size: 20px;
  line-height: 30px;
  padding: 12px 20px;
}
tip {
  display: block;
  position: absolute;
  font-size: 12px;
}
</style>
<template>
  <div1 editable>
    <div class="nav" solid>
      <tip>标题栏</tip>
      <div class="title">蛤蟆坑</div>
    </div>
    <div class="menu">
      <tip>菜单区</tip>
      <div class="menu-items">
        <button
          :class="{ actived: m === activeMenu }"
          @click="go(m.url), (activeMenu = m)"
          v-for="m of menuData"
        >
          {{ m.name }}
        </button>
      </div>
    </div>
    <div2 class="main" ref="content">
      <tip>这个项目是我以前在某些公司上班时为了兼容vue开的，以后不会再维护了，也不准备增加对vue3及后续版本的支持，望知悉。</tip>
    </div2>
  </div1>
</template>
<script>
export default {
  methods: {
    alert,
    go(url) {
      zimoli.go(url, null, this.$refs.content);
    },
  },
  data() {
    var menuData = [
      { name: "你好,世界", url: "/content/你好世界" },
      { name: "你好,开发者", url: "/content/你好开发者" },
    ];
    return {
      activeMenu: menuData[0],
      menuData,
    };
  },
  mounted() {
    this.go(this.activeMenu.url);
  },
  components: {
    div1: moue(grid),
  },
};
</script>
