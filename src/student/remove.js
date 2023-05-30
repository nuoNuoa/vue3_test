import { reactive } from "vue";
//state 从studentPart.vue传入
export default function useRemove(state){
    //删除学生方法
    const removeStudent = (_index) =>{
        state.studentList = state.studentList.filter(
            (item,index) => _index !==index
        );
    };
    return {removeStudent};
}