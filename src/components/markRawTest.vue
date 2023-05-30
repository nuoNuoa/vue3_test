<template>
  <div class="container">
    <p>markRaw()方法标记一个对象,使其永远不会被转换为代理(Proxy),而是返回对象本身。</p>
    <p>isReactive():当我们想要判断一个某个值是否为reactive()创建出来的对象,我们可以使用
isReative()函数。</p>
    <p>{{ msg.value }}</p>
    <p>{{ op.value }}</p>
    <button @click="setmsg">set</button>
  </div>
</template>

<script>
import { isReactive, markRaw,reactive,toRaw } from 'vue';
export default {
setup(){
    const msg = markRaw({
        value:'markraw',
    });
    //作为参照
    const op = reactive ({
        value : 'reactive',
    });
    //toRaw()方法
    // const foo = {};
    //创建一个响应式对象
    // const reactiveFoo = reactive(foo);
    // console.log(toRaw(reactiveFoo) === foo);//true
    const setmsg = ()=>{
        console.log('markRaw' + isReactive(msg));
        console.log('reactive' + isReactive(op));
        msg.value ='';
        console.log(msg);
        console.log(op);
    }
    return {
        msg,
        op,
        setmsg,
    }
}
}
</script>

<style scoped>

</style>