const testadd = () => {
    console.log('hello world')
    return "hello"
}


const getallNUM = () => {
    let num = document.getElementsByClassName('jTotal')[0].innerText
    return num
}

export default {testadd, getallNUM}
