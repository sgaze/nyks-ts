interface BooleanConstructor{
    validate(str : string) : boolean
}

Boolean.validate = function(str : string){
    str = str.toLowerCase();
    return str && str != "false" && str != "no" && str != "n" && str != "f";
}

