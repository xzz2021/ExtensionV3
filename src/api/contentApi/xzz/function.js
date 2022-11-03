/*
 * @Date: 2022-11-03 08:47:46
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-03 09:18:56
 */


// 本页定义->>函数方法<<-相关封装方法



//箱子处理器,-------管道过滤函数
const boxHandler = (x) => ({ next: (f) => boxHandler(f(x)), done: (f) => f(x) });

//例如需要转换result
// const getPercentNumber = (str) =>
//     boxHandler(str)
//         .next((str) => str.replace(/\%/, ''))
//         .next((str) => parseFloat(str))
//         .done((res) => res * 0.01);

// getPercentNumber('53%'); // 0.53



//函数组合器,把任意个函数加入管道执行

const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x)

//函数组合器,把任意个函数加入管道且依次从左到右执行
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);


//无论调用多少次,只会执行一次的一次性函数
const once = (fn) => ( (ran = false) => () => ran ? fn : ((ran = !ran), (fn = fn())) )()

// let n = 0;
// const incOnce = once(() => n++)
// incOnce(); // n = 1
// incOnce(); // n = 1








//未知场景
// const unary = (fn) => (arg) => fn(arg);

//未知场景
// const sum = (x, y) => x + y;
// const inc = partial(sum, 1);
// inc(9); // 10

// const partial =
// (fn, ...a) =>
// (...b) =>
//     fn(...a, ...b);