<style>
& {
  text-align: center;
  padding: 60px 0;
}
</style>
<template>
  <div>
    <btn @click="alert('你好，一线开发者', 'success')">你好，世界</btn>
  </div>
</template>
<script>
export default {
  methods: {
    alert,
  },
  components: {
    btn: moue(button, "click"),
  },
};
</script>
