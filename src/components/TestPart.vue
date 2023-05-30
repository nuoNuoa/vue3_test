<template>
  <div class="hello">
    <p>hhhhhhh</p>
    <p>{{ count }}</p>
    <button @click="addCount">++++++</button>
  </div>
  <div class="watch">
    <h1>watch监听</h1>
    <p>watch监听必须指定一个特定的变量，并且不会默认执行回调函数，
      而是等到监听的变量改变了才会执行。并且你可以得到改变前，和改变后的值</p>
      <p>watchEffect第一次加载时回调函数会执行,回调函数内的响应式变量变化时,回调函数也会被执行,
        watchEffect 像vue2 中immediate:true这个立即执行属性，并响应跟踪其依赖，并在其依赖改变时重新运行该函数</p>
        <p>当watchEffect在组件的setup()函数或生命周期钩子函数被调用时，
          会返回一个新的函数，我们可以通过执行这个函数或者当组件被卸载的时候，来停止监视行为。</p>
          <p>watchEffect的回调方法内有一个很重要的方法,用于清除副作用。它接受的回调函数也接受一个函数
onInvalidate。名字不重要,重要的是它将会在watchEffect监听的变量改变之前被调用一次</p>
    <h1>{{ state.search }}</h1>
    <button @click="handleSearch">改变查询字段</button>
  </div>
</template>

<script>
import { watch,reactive, watchEffect } from 'vue';
// import { watchEffect } from 'vue';
export default {
  name: 'TestPart',
  //通过props接受父组件传递过来的数据，模板中可以直接使用
  props: {
    count:Number,
    add:Function,
  },
  //子组件接收的方法，需要通过emits在options中注册，否则会报警告。
  emits:["add"],
  setup(props,ctx){
    const addCount = () =>{  //此方法被用在子组件的button点击时间上，同时此方法调用了父组件的add方法
      ctx.emit("add",50); //emit是子组件调用父组件传进来的方法，并且带上回调参数
    };
    let timer = null;
    let state = reactive({
      search:Date.now(),
    });
    // watch(
    //   ()=>{
    //     return state.search;
    //   },
    //   (nextData,preData)=>{
    //     console.log("preData",preData);
    //     console.log("nextData",nextData);

    //   }
    // );
    watchEffect(()=>{
      console.log(`watchEffect监听查询字段${state.search}`);
    })
    const handleSearch = ()=>{
      state.search = Date.now();
    }
    return {
      addCount,
      handleSearch,
      state,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  border: 1px solid #42b983;
}
.watch{
    border: 1px solid red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
