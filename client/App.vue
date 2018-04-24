<template>
  <div id="app">
    <Header></Header>
    <todo></todo>
    <Footer></Footer>  
    <div class="bg"></div>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import todo from './view/todo/todo.vue'
import Footer from './layout/footer.jsx'

export default {
  data () {
    return {}
  },
  components: {
    Header,
    todo,
    Footer
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    background: #999999;
    opacity: 0.3;
  }
}
</style>
