let Stack = (function () {
    // 创建一个弱对象
    const items = new WeakMap();
    //创建一个类，模拟出栈进栈
    class Stack {
        constructor() {
            items.set(this,[]);
        }
        //入栈
        push(element){
            let s =items.get(this);
            s.push(element);
        }
        //出栈
        pop(){
            let s = items.get(this);
            return s.pop();
        }
        isEmpty(){
            let s = items.get(this);
            return s.length == 0;
        }
        clear(){
            let s = items.get(this);
            s =[];
        }
        size(){
            let s = items.get(this);
            return s.length;
        }
    }
    return Stack;
})();
export default function binary(Number){
    var remStack = new Stack();
    var rem ;
    var binaryString = '';
    while(Number > 0){
        // 每次获得的余数即为每一位的数字
        rem = Math.floor(Number % 2);
        // 循环入栈
        remStack.push(rem);
        // 每次循环除以2
        Number = Math.floor(Number / 2);
    }
     while(!remStack.isEmpty()){
        //循环出栈，转换为字符串
        binaryString += remStack.pop().toString();
     }
    //  返回二进制结果
    return binaryString;
}