<template>
  <img alt="Vue logo" src="./assets/fei.jpg" style=" width: 200px;">
  <TestPart :count="count" @add="add"></TestPart>
  <ChildOne :name="name" @childClick="parentClick"></ChildOne>
  <!-- <customRefTest></customRefTest>
  <markRawTest></markRawTest>
  <getDOM></getDOM>
  <studentPart></studentPart> -->
  <calc></calc>
  <commentApp/>
</template>

<script>
import TestPart from './components/TestPart.vue'
import ChildOne from './components/ChildOne.vue'
import customRefTest from './components/customRefTest.vue'
import markRawTest from './components/markRawTest.vue'
import getDOM from './components/getDOM.vue'
import studentPart from './components/studentPart.vue'
import calc from './components/calc.vue'
import commentApp from './components/commentApp.vue'
import { ref,reactive } from 'vue';
export default {
  name: 'App',
  components: {
    TestPart,
    ChildOne,
    customRefTest,
    markRawTest,
    getDOM,
    studentPart,
    calc,
    commentApp,
  },
  setup(){
    const name = ref('Message from Father!');
    const count = ref(0);
    const add = (num) =>(count.value += num);
    const parentClick = (e) =>{
      console.log(e);
    };
    return {
      count,
      add,
      name,
      parentClick
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
