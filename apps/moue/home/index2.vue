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
}
> .menu,
> .main {
  display: inline-block;
  vertical-align: top;
  height: 100%;
}
> .menu {
  width: 200px;
  margin-left: -200px;
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
  <grid editable>
    <div class="nav"></div>
    <div class="menu"></div>
    <div class="main">
      <btn @click="alert('你好')">abc</btn>
    </div>
  </grid>
</template>
<script>
export default {
  methods: {
    alert
  },
  components: {
    btn: button_test,
    btn: moue(button, "click"),
    grid: moue(grid)
  }
};
</script>