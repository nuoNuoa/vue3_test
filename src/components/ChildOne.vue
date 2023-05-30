<template>
  <div class="container">
    <button @click="handleClick">{{ props.name }}</button>
  </div>
</template>

<script>
export default {
    props:{
        name:String,
    },
    setup(props,{emit}){
        const handleClick =()=>{
            console.log(props);
            emit('childClick','Message from child');
        };
        return {
            props,
            handleClick,
        }
    }
}
</script>

<style scoped>
.container{
    border: 1px solid #42b983;
}

</style>