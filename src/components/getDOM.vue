<template>
  <div class="container">
    <p>在Vue3中我们通过提供的ref方法定义与页面元素上reef相对应的一个响应式对象,同时传入一个null。</p>
    <p ref="p">获取DOM</p>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue';
export default {
    setup(){
        const p = ref(null);
        onMounted(()=>{
            //初始渲染后，DOM元素将被分配给ref
            //p.value是原生DOM对象
            console.log(p.value);
        });
        return {
            p,
        };
    },
}
</script>

<style scoped>
.container{
    border: 1px solid blue;
}
</style>