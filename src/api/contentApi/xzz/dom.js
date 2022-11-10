/*
 * @Date: 2022-11-03 08:24:20
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-09 18:00:16
 */

// 本页定义->>DOM操作<<-相关封装方法




//获取选中文本
const getSelectedText = () => window.getSelection().toString();

//隐藏元素
const hide = (ele) => (ele.style.display = 'none');
const hide2 = (ele) => (ele.style.visibility = 'hidden');
const hide3 = (ele) => (ele.hidden = true)


//刷新当前页
const reload = () => location.reload()


//跳转至另一页面
const goTo = (url) => (location.href = url)


//替换DOM节点
const replace = (ele, newEle) => ele.parentNode.replaceChild(newEle, ele)


//滚动到页面顶部
const goToTop = () => window.scrollTo(0, 0)


//用于弹窗背景穿透阻止body滚动方案,务必关联执行
const preventScroll = (dom) => {jq(dom).css({ "overflow-x":"hidden", "overflow-y":"hidden" })}
const permitScroll = (dom) => {jq(dom).css({ "overflow-x":"auto", "overflow-y":"auto" })}








