<template>
  <div class="container">
    <button @click="getRef">触发get</button>
    <button @click="setRef">触发set</button>
    <p>ref:{{ msg }}</p>
    <p>我们看到页面打开的同时,就会触发get(),在触发set()后,视图中中的msg会在trigger()触发
后变化,并且我们可以发现,变化后msg显示出来的值set()中重新所定义的
</p>
  </div>
</template>

<script>
import { customRef } from 'vue';
export default {
    setup(){
        function TestcustomRef(value){
        return customRef((track,trigger) => {
            return {
                get(){
                    track();
                    //触发get后，控制台打印信息
                    console.log('get' + value);
                    return value;
                },
                set(newValue){
                    value = newValue + 'set';
                    //触发set后，控制台打印信息
                    console.log('set' + value);
                    //可以通过这一步控制视图更新时间
                    setTimeout(()=>{
                        trigger();
                    },1000)
                },
            };
        });
    }
    const msg = TestcustomRef('原始值');
    const setRef = () =>{
        msg.value = '更新设置值';
    };
    const getRef = () => {
        console.log(msg.value);;
    };
    return {
        setRef,
        getRef,
        msg,
    };
    },
}
</script>

<style scoped>
.container{
    border: 1px solid blue;
}
</style>