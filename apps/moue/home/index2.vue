<style lang="less" scoped>
& {
  color: #fff;
  background: #ccc;
  height: 100%;
  width: 100%;
  position: relative;
  appearance: none;
}
&,
* {
  box-sizing: border-box;
}
.nav {
  height: 60px;
  margin-top: -60px;
  background: #0cf;
}
> .menu,
> .main {
  display: inline-block;
  vertical-align: top;
  height: 100%;
}
> .menu {
  background: #000;
  width: 200px;
  margin-left: -200px;
  max-width: 600px;
  min-width: 60px;
}
> .main {
  width: 100%;
}
& {
  padding: 60px 0 0 200px;
}
> .body {
  width: 100%;
}
</style>
<template>
  <div1 editable>
    <div class="nav" solid></div>
    <div class="menu"></div>
    <div class="main">
      <btn @click="alert('你好')">abc</btn>
    </div>
  </div1>
</template>
<script>
export default {
  methods: {
    alert
  },
  components: {
    btn: button_test,
    btn: moue(button, "click"),
    div1: moue(grid)
  }
};
</script>