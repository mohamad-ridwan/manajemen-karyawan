export default function regex(){
    const numberRegex: RegExp = /^\d*$/
    const mailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const stringRegex: RegExp = /\s/g

    return{
        numberRegex,
        mailRegex,
        stringRegex
    }
}