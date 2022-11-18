/*
 * @Date: 2022-11-05 15:11:47
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-10 17:47:52
 */




//比较2个对象是否相同
const isObjEqual = (...objects) => objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]))

//检验是否为空对象
const isEmpty = (obj) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
const isEmpty2 = (obj) => JSON.stringify(obj) === '{}'

//浅拷贝对象
const shallowCopy = obj => Object.assign({}, obj)
// const shallowCopy2 = obj => {...obj}

//简单数据类型浅拷贝会直接拷贝数据
//复杂数据类型浅拷贝只是拷贝内存空间指向,修改数据会影响原始数据,因为是同一个内存空间(如内部存在不同属性值会直接覆盖,因为是直接改内存指向)
//复杂数据类型直接赋值是浅拷贝,会改变其内存指向,而打点操作或者遍历则是深拷贝
//深拷贝会直接完整复制所有数据(且内部不同属性都会保留,因为是在它自己的内存空间复制属性)

//创建一个没有原型__proto__的空对象
const map = Object.create(null)


//提取对象数组内所有对象指定键的值组成新数组
const pluck = (objs, property) => objs.map((obj) => obj[property])
// pluck( [ { name: 'John', age: 20 }, { name: 'Smith', age: 25 }, { name: 'Peter', age: 30 } ], 'name' ) // ['John', 'Smith', 'Peter']

//剔除对象内部的指定属性
const omit = (obj, keys) =>  Object.keys(obj).filter((k) => !keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {})
// omit({ a: '1', b: '2', c: '3' }, ['a', 'b']); // { c: '3' }

//提取对象内部的指定属性
const pick = (obj, keys) => Object.keys(obj).filter((k) => keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {})
// pick({ a: '1', b: '2', c: '3' }, ['a', 'b']) // { a: '1', b: '2' }

//获取嵌套对象内部指定键的值
const getValue = (path, obj) => path.split('.').reduce((acc, c) => acc && acc[c], obj)
// getValue('a.b', { a: { b: 'Hello World' } }) // 'Hello World';

//重命名对象的键名
const renameKeys = (keysMap, obj) => Object.keys(obj).reduce((acc, key) => ({ ...acc, ...{ [keysMap[key] || key]: obj[key] } }), {})
// const obj = { a: 1, b: 2, c: 3 };
// const keysMap = { a: 'd', b: 'e', c: 'f' };
// renameKeys(keysMap, obj); // { d: 1, e: 2, f: 3 }

//通过对象的属性进行排序,即按键名排序
const sort = (obj) => Object.keys(obj).sort().reduce((p, c) => ((p[c] = obj[c]), p), {})

//转换对象的键和值
const invert = (obj) => Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {})
// invert({ a: '1', b: '2', c: '3' }); // { 1: 'a', 2: 'b', 3: 'c' }

//移除对象内所有值为null和undefind属性
const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})

//未知场景
const toObj = (arr) => Object.fromEntries(arr)
// toObj([ ['a', 1], ['b', 2], ['c', 3], ]); // { a: 1, b: 2, c: 3 }