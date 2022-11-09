/*
 * @Date: 2022-10-29 16:39:29
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-03 08:20:35
 */
/*
encryption code
original code:https://github.com/xzz2021/myfunction
keyword: auto import function from file
*/


const files = require.context('./', true, /\.js$/)

//对象引入
function importAllModule(_0x20f2a4){const _0x2d389c={};let _0x536206={};for(let _0x5bcc6e of _0x20f2a4['keys']()){_0x2d389c[_0x5bcc6e]=_0x20f2a4(_0x5bcc6e)['default'];}for(let _0x1bcf2e in _0x2d389c){_0x536206={..._0x536206,..._0x2d389c[_0x1bcf2e]};}return _0x536206;}

export let  contentApi = importAllModule(files)




// 文件引入
//  const autoImport = req => files.keys().map(req)
//  autoImport(files)