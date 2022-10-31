

class zXpath{
    constructor(){
        this.html = document
    }

    getElm(xp){
        let value = this.html.evaluate(xp, this.html).iterateNext();
        return value
    }

    getElmText(xp){
        xp = xp + '/text()'
        let value = this.html.evaluate(xp, this.html, null, XPathResult.STRING_TYPE, null).stringValue;
        return value
    }
}

let zxp = new zXpath()

export default {zxp}