<template>
    <div class="comment">
        <div class="user">
            <span>{{ props.comment.username }}</span>：
        </div>
        <div>{{ props.comment.content }}</div>
        <!-- 添加删除入口 -->
        <span class="delete" @click="deleteCom">
            <img src="../assets/delete.png">
        </span>
    </div>
</template>

<script>
import { onMounted } from 'vue';
export default {
    name: 'Comment',
    props: {
        comment: Object,
        // 定义调用的父组件的函数deleteFun是函数类型
        deleteFun: Function,
        index: Number,
    },
    setup(props) {
        // onMounted(()=>{
        //     //打印获取props
        //     console.log(props);
        // })
        // 删除点击事件
        const deleteCom = () => {
            if (props.deleteFun) {
                // 调用父组件的deleteFun函数，并将props.index 作为参数传入
                props.deleteFun(props.index);
            }
            
        };
        return {
            props,
            deleteCom,
        }
    }
}
</script>

<style>
.comment {
    position: relative;
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 10px;
    padding-bottom: 10px;
    min-height: 55px;
    font-size: 16px;
}

.comment span {
    color: #00a3cf;
    font-style: italic;
}

.delete {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    display: none;
}

.delete img {
    width: 30px;
}

.comment:hover .delete {
    display: inline;
}
</style>