const files = require.context('./', true, /\.js$/)
// const Modules = {};
// function importAll() {
    
    // files.keys().forEach((key) => (Modules[key] = files(key)));
// }

function importAllModule(files) {
    const map = {}
    let tmp = {}
    for (let key of files.keys()) {
        map[key] = files(key).default
    }
    for (let key in map) {
        tmp = {
            ...tmp,
            ...map[key]
        }
    }
    return tmp
}

export let  allApi = importAllModule(files)

