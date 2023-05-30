<template>
  <form @keyup.enter="addStudent">
  <p>姓名：</p>
  <input type="text" name="name" v-model="student.name"/>
  <p>年龄：</p>
  <input type="number" name="age" v-model="student.age"/>
  </form>
  <p
  v-for="(item,index) in studentList"
  :key="index"
  @click="removeStudent(index)"
  >
  {{ item.name }}  {{ item.age }}</p>
</template>

<script>
import useAdd from '@/student/add.js';
import useRemove from '@/student/remove.js';
import {reactive, toRefs} from 'vue';
export default {
    setup(){
        const state = reactive({
            studentList:[
                {name:'小红',age:20},
                {name:'小蓝',age:24},
            ],
            student: {
                name: "",
                age: "",
            },
        });
        const {addStudent} = useAdd(state);
        const {removeStudent} = useRemove(state);
        return {
            ...toRefs(state),
            addStudent,
            removeStudent,
        };
    },
};
</script>

<style scoped>

</style>