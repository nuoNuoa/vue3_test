<template>
    <div v-for="(one,index) in props.custom" :key="index" class="commentList">
       <comment :comment="one" :index="index" :deleteFun="deleteFun"/>
    </div>

</template>

<script>
import { ref,onMounted,watch } from 'vue';
import comment from '@/components/commentItem.vue';
export default {
    name: 'commentList',
    components:{
        comment,
    },
    props: {
        custom: {
            type : Array,
            default: () => [],
        },
        // 定义props.deleteFunction是函数类型
        deleteFunction : Function,
    },
    setup (props){
        //deleteFun函数 ，获取帖子index作为参数传给commentApp组件
        const deleteFun = (index) => {
            // 调用父组件的deleteFunction函数，并将index作为参数传入
            if(props.deleteFunction){
                props.deleteFunction(index);
            }
        }
        // let comments = ref([]);
        // onMounted(()=>{
        //     comments = props.custom;
        // });
        // watch(()=>{
        //     comments.value=props.custom;
        // })
        return {
            // comments,
            props,
            deleteFun,
            
        }
    }
};
</script>

<style>
.commentList {
    text-align: center;
    background-color: #fff;
    width: 520px;
    margin: 10px auto;
    font-size: 14px;
}
</style>