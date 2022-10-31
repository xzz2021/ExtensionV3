class zRegs{
    constructor(){
        this.str = ''
    }

    number(strs){
        let result = undefined
        let regs = strs.match(/\d+\.?\d+/g)
        if(regs != null){
            result = regs
        }
        return result
    }
    

}

let zregs = new zRegs()

export default {zregs}