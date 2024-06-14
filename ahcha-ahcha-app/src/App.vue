<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Home/Navbar.vue'
</script>

<template>
    <Navbar/>
    <div>
      <RouterView />
    </div>
</template>

<style>
*{
  padding :0px;
  margin : 0px;
  
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 330;
  font-style: normal;
}



</style>

