const zpost = async(url,datas) => {
    console.log(datas)
    return new Promise( async(resolve, reject) => {
        fetch(url,{
            method:'post',
            credentials:'include',
            body:JSON.stringify({"urls":datas})
        }).then(( response) => {
            return response.text();
        }).then((res) => {
            console.log("-----res ----",res)
            resolve(res)
        });
    })
}

export default {zpost}