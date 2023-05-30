<template>
    <section id="app" class="calculator">
        <input type="text" v-model="inputValue" placeholder="0" disabled="disabled" ref="one" />
        <!-- 计算机主体 -->
        <!-- 用事件委托获取和存储元素 -->
        <div class="container" @click="handleBtnClick">
            <button class="NumBtn NumBtn-1">AC</button>
            <button class="NumBtn NumBtn-2">C</button>
            <button class="NumBtn NumBtn-3">B</button>
            <button class="NumBtn NumBtn-4">/</button>
            <button class="NumBtn NumBtn-5">7</button>
            <button class="NumBtn NumBtn-6">8</button>
            <button class="NumBtn NumBtn-7">9</button>
            <button class="NumBtn NumBtn-8">*</button>
            <button class="NumBtn NumBtn-9">4</button>
            <button class="NumBtn NumBtn-10">5</button>
            <button class="NumBtn NumBtn-11">6</button>
            <button class="NumBtn NumBtn-12">-</button>
            <button class="NumBtn NumBtn-13">1</button>
            <button class="NumBtn NumBtn-14">2</button>
            <button class="NumBtn NumBtn-15">3</button>
            <button class="NumBtn NumBtn-16">+</button>
            <button class="NumBtn NumBtn-17">0</button>
            <button class="NumBtn NumBtn-18">.</button>
            <button class="NumBtn NumBtn-19">=</button>
        </div>
    </section>
</template>

<script>
import calculate from '@/service/calculator.js'
import binary from '@/service/binary.js'
import { ref } from 'vue';
export default {

    setup() {
        const inputValue = ref(''); //输入框内容
        const ClickNumberContent = ref(''); //存储拼接的元素，也就是整个式子
        const record = ref(false); //用于区分操作数还是操作符，操作数为false，操作符为true
        const lastBtn = ref([]); //ref用于存储定义数组，用于存储每个元素对应的record
        const flag = ref(false); //用来判断是否已经进行了计算，false表示没有进行计算，true表示已经进行计算
        const result = ref([]); //存储第一次计算的结果

        const handleBtnClick = (e) => { //点击事件函数
            // 获取点击元素
            let ClickNumber = e.target.innerHTML;
            // 如果获取的元素是数字  不能出现0开头的正整数
            if (!isNaN(ClickNumber)) {
                //将ClickNumber的内容直接拼接至ClickNumberContent中
                ClickNumberContent.value += ClickNumber;
                // // 将获取的元素显示的“屏幕”中
                inputValue.value = ClickNumberContent.value;
                if (!isNaN(ClickNumberContent.value)) {
                    let re = /^[0]\d/;
                    if (re.test(ClickNumberContent.value)) {
                        ClickNumberContent.value = ClickNumberContent.value.substring(1);
                        inputValue.value = ClickNumberContent.value;
                    }
                } else {
                    // 取ClickNumberContent最后一个数字或者小数
                    let re = /\d+(\.\d+)?$/;
                    let lastNum = ClickNumberContent.value.match(re);
                    let index = lastNum.index;
                    // 只有整数才能进入到下面条件句中，会忽略小数
                    re = /^[0]\d/;
                    if (re.test(lastNum[0])) {
                        ClickNumberContent.value =
                            ClickNumberContent.value.substring(0, index) +
                            ClickNumberContent.value.substring(index + 1);
                        inputValue.value = ClickNumberContent.value;
                    }
                }
            }
            // 如果获取的元素是操作符  “+-*/”
            if (
                ClickNumber === '+' ||
                ClickNumber === '-' ||
                ClickNumber === '*' ||
                ClickNumber === '/'
            ) {
                //首先将record 置为 true 表明获取元素为操作符
                record.value = true;
                // 如果之前没有输入操作数，则表明第一个操作数是默认的0 ，所以需要将ClickNumberContent 补一个0进去
                if (!ClickNumberContent.value) {
                    ClickNumberContent = '0';
                }
                // 如果上一个输入元素也为操作符（即连续点击加减乘除运算符按钮时），则使用后输入的操作符覆盖之前的
                if (lastBtn.value[lastBtn.value.length - 1]) {
                    ClickNumberContent.value = ClickNumberContent.value.substring(
                        0,
                        ClickNumberContent.value.length - 1
                    );
                }
                //将每次获取的元素逐一拼接在ClickNumberContent中
                ClickNumberContent.value += ClickNumber;
                //将获取的元素显示的“屏幕中”
                inputValue.value = ClickNumberContent.value;
            }
            //区别存储每个输入元素的类别
            lastBtn.value.push(record.value);
            //将record还原
            if (record.value) record.value = false;
            // console.log(lastBtn.value);
            //按等于号时，将结果显示出来，并将结果缓存起来
            if (ClickNumber === "=") {
                inputValue.value = calculate(ClickNumberContent.value) + '';
                // 将计算结果存入result
                result.value.push(inputValue.value);
                // 将flag置为true
                flag.value = true;
                // 我们只需要记录上一次的ClickNumber,也就是结果
                lastBtn.value = lastBtn.value.splice(lastBtn.value.length - 1, 1);
            }

            //小数计算
            // 当点击“.”时，总体上分为ClickNumberContent不为空和为空两种情况
            if (ClickNumber === '.') {
                //如果之前有输入的数
                if (ClickNumberContent.value) {
                    //如果之前的内容中没有小数点，且有数字，那么直接为数字加上小数点
                    if (
                        !isNaN(ClickNumberContent.value) &&
                        ClickNumberContent.value.indexOf('.') === -1
                    ) {
                        ClickNumberContent.value += ClickNumber;
                        inputValue.value = ClickNumberContent.value;
                    } else if (
                        isNaN(ClickNumberContent.value) &&
                        lastBtn.value[lastBtn.value.length - 2]
                    ) {
                        // 如果之前的内容不是纯数字， 目前一位是操作符
                        ClickNumberContent.value += '0.';
                        inputValue.value = ClickNumberContent.value;
                    } else if (
                        isNaN(ClickNumberContent.value) &&
                        !lastBtn.value[lastBtn.value.length - 2]
                    ) {
                        //如果之前的内容不是纯数字， 目前一位是操作数，那么取ClickNumberContent 最后一个数字或者小数
                        var re1 = /\d+(\.\d+)?$/;
                        var lastNum1 = ClickNumberContent.value.match(re1);
                        console.log(lastNum1);
                        if (lastNum1[0].indexOf('.') === -1) {
                            ClickNumberContent.value += ClickNumber;
                            inputValue.value = ClickNumberContent.value;
                        }
                    }
                    else {
                        ClickNumberContent.value = '0.';
                        inputValue.value = ClickNumberContent.value;
                    }
                }
            }

            // 如果之前已经有计算结果
            if (flag.value) {
                // 如果直接点击加减乘除运算符，将ClickNumberContent清空，并且将结果赋值给ClickNumberContent
                if (
                    ClickNumber === '+' ||
                    ClickNumber === '-' ||
                    ClickNumber === '*' ||
                    ClickNumber === '/'
                ) {
                    // 式子内容修改为 结果 + 新输入的操作符
                    ClickNumberContent.value = result.value[result.value.length - 1] + ClickNumber;
                    inputValue.value = ClickNumberContent.value;
                    //flag复原
                    flag.value = false;
                }
                // 如果直接点击数字按钮，就是新的一轮运算
                if (!isNaN(ClickNumber)) {
                    // 式子内容修改为  新输入的数字
                    ClickNumberContent.value = ClickNumber;
                    inputValue.value = ClickNumberContent.value;
                    flag.value = false;
                }
                //小数运算补充
                if (ClickNumber === '.') {
                    ClickNumberContent.value = '0.';
                    inputValue.value = ClickNumberContent.value;
                    //将flag复原
                    flag.value = false;
                }
            }
            // 清空与删除
            // 当点击'AC'时，初始化所有数据
            if (ClickNumber === 'AC') {
                inputValue.value = '';
                ClickNumberContent.value = '';
                lastBtn.value = [];
                result.value = [];
                flag.value = false;
            }
            //当点击'C'时，可以逐一删除信息
            if (ClickNumber === 'C') {
                //如果是计算出的答案，想要回退删除，需要把flag 改变
                if (flag.value) {
                    flag.value = false;
                }
                //删除最后一位
                ClickNumberContent.value = ClickNumberContent.value.substring(0, ClickNumberContent.value.length - 1);
                inputValue.value = ClickNumberContent.value;
            }

            if (ClickNumber === 'B') {
                if (!isNaN(inputValue.value)) inputValue.value = binary(inputValue.value);
            }
        };
        return {
            inputValue,
            handleBtnClick,
            lastBtn,
            ClickNumberContent,
            record
        }
    }
}
</script>

<style>
.calculator {
    width: 340px;
    margin: 50px auto;
}

.calculator input {
    box-sizing: border-box;
    border-radius: 2%;
    padding: 0 6px;
    width: 340px;
    height: 60px;
    font-size: 32px;
    color: rgb(48, 42, 42);
    background: #e7e7e7;
    text-align: right;
    outline: none;
    /*使字体往左缩进200像素*/
    text-indent: -200px;
}

/*处理placeholder的颜色*/
::-webkit-input-placeholder {
    color: rgb(48, 42, 42);
}

.calculator .container {
    display: grid;
    grid-template-rows: repeat(5, 65px);
    /*五行，每行宽度为65px*/
    grid-template-columns: repeat(4, 85px);
    /*四列，每列宽度为85px*/
    width: 50%;
}

.NumBtn {
    color: rgb(48, 42, 42);
    text-align: center;
    border: 1px soClickNumber #bbb;
    outline: none;
    font-size: 33px;
    border-radius: 10%;
    background: #ccc;
    cursor: pointer;
}

.NumBtn-17 {
    grid-column-start: span 2;
    /*数字0 按钮占用两列的宽度 */
}
</style>