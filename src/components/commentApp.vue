<template>
    <div class="container">
        <commentInput @inputinfo="receiveInfo" />
        <commentList :custom="Comments" :deleteFunction="deleteFunction" />
    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import commentInput from './commentInput.vue';
import commentList from './commentList.vue';
export default {
    name: 'commentApp',
    components: {
        commentInput,
        commentList,
    },
    setup() {
        // 存的是评论
        const Comments = ref([]);
        // 加载sessionStorage中的帖子
        const loadData = () => {
            const loadComment = sessionStorage.getItem('comment')
            if (loadComment) {
                // 获取值的时候，再将其转换回来
                Comments.value = JSON.parse(loadComment)
                //控制台打印获取的值，便于测试
                console.log(loadComment);
            }
        }
        // 将贴子存储入sessionStorage中
        const saveData = (comments) => {
            // /我们就需要将数据全部转换为字符串格式，然后再进行存储
            sessionStorage.setItem('comment', JSON.stringify(comments.value))
        }
        //利用事件委托 获取评论
        const receiveInfo = (e) => {
            // 获取评论
            // 补充：当用户名或评论内容为空时，弹出警示框
            if (!e.username) return alert('请输入用户名')
            if (!e.content) return alert('请输入评论内容')
            //向列表中添加新增评论
            Comments.value.push(e);
            //    每次Comments修改，都会重新进行存储
            saveData(Comments)
        };
        // 帖子索引信息index从Comment组件传达到CommentApp组件
        const deleteFunction = (index) => {
            //检测一下是否正确可以获取
            console.log('删除帖子' + index);
            Comments.value.splice(index,1);
            // 删除相关帖子后，重新存储
            saveData(Comments);
        };
        onBeforeMount(() => {
            loadData()
        })
        
        return {
            receiveInfo,
            Comments,
            saveData,
            loadData,
            deleteFunction,
        }
    }
};
</script>

<style>
.container {
    width: 560px;
    margin: 10px auto;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid rgb(219, 219, 219);
    padding: 20px;
}
</style>