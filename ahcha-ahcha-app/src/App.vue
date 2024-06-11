<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
    
    <Navbar/>

    <div>
      <RouterView />
    </div>

</template>

<style scoped>
*{
  padding :0px;
  margin : 0px;
}
</style>

