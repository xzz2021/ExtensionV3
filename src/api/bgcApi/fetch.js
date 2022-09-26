

const qs = require('qs')

    //对Fetch的封装：让其支持params/请求主体的格式化/请求地址的公共前缀 

let baseURL = '',
inital = {
    method: 'GET',
    params: null,
    body: null,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
	credentials: 'include', // include, *same-origin, omit
	cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    redirect: 'follow',
    referrerPolicy: 'no-referrer-when-downgrade' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

// 校验是否为纯粹的对象
const isPlainObject = function isPlainObject(obj) {
var proto, Ctor;
if (!obj || typeof obj !== "object") return false;
proto = Object.getPrototypeOf(obj);
if (!proto) return true;
Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
return typeof Ctor === "function" && Ctor === Object;//构造函数是Object
};

// -----------------------------发送数据请求-------------------------------
const myfetch = (url, config) => {
    return  new Promise((resolve, reject) => {
// 合并配置项{不要去更改inital中的内容}
(config == null || typeof config !== "object") ? config = {}: ''//确保config肯定是对象
if (config.headers && isPlainObject(config.headers)) {
    // 单独的给HEADERS先进行深度合并
    config.headers = Object.assign({}, inital.headers, config.headers);
}
let {
    method,
    params,
    body,
    headers,
    credentials,
    responseType,
    cache,
    redirect,
    referrerPolicy
} = Object.assign({}, inital, config);//合并config

// 处理URL{格式校验 & 公共前缀 & 拼接params中的信息到URL的末尾}
if (typeof url !== "string") throw new TypeError( ` ${url} is not an string! ` )
if (!/^http(s?):\/\//i.test(url)) url = baseURL + url //判断是不是以http或者https开头,如果不是,就用baseurl拼起来
if (params != null) {//不是null和undefined,存在params
    if (isPlainObject(params)) {
        params = qs.stringify(params);
    }
    url +=  `${url.includes('?')?'&':'?'}${params}` ;//拼接
}

// 处理请求主体的数据格式{根据headers中的Content-Type处理成为指定的格式}
if (body != null) {
    if (isPlainObject(body)) {
        let contentType = headers['Content-Type']
        if (contentType.includes('urlencoded')) body = qs.stringify(body);
        // if (contentType.includes('urlencoded')) body = body;
        if (contentType.includes('json')) body = JSON.stringify(body);
    }
}
// body = JSON.stringify(body);


// 基于fetch请求数据
// method = method.toUpperCase();
// responseType = responseType.toUpperCase();
config = {
    method,
    credentials,
    cache,
    headers,
    body,
    redirect,
    referrerPolicy
};
//   /^(POST|PUT|PATCH)$/i.test(method) ? config.body = body : config.body = null;
//-----------------------配置代理url-------------------manifest.json的match配置对应的接口域名,则不需要代理服务器-----
//  let url2 = `http://xzz2022.top:666/${url}`
console.log('config: ', config);
 fetch(url, config).then((response) => {
    let {
        status,
        statusText
    } = response;
    if (response.ok) {
        let result;
        switch (responseType) {
            case 'TEXT':
                result = response.text();
                break;
            case 'JSON':
                result = response.json();
                break;
            case 'BLOB':
                result = response.blob();
                break;
            case 'ARRAYBUFFER':
                result = response.arrayBuffer();
                break;
            default: 
                result = response.json();
            break;
        }
        return result;
    }else{
        reject('ERROR CODE 异常', status, '-----异常提示----',statusText)
        // throw new TypeError('ERROR CODE 异常', status)
    }
}).then(res => {
    console.log('res: --------------------', res);
    resolve(res)

}).catch((reason) => {
    reject(('网络接口请求异常-------具体原因是:',reason))
    //--------------走代理url后不存在浏览器安全策略拦截,但是会有请求异常直接报错的可能-------需要优化上面整体的reject的逻辑--------------

})
    })}

export default {myfetch}