var  url   = require('url') ;
var  path   = require('path');



class Resolver {
  stack = {} ;

  constructor(){

  }

  register(prefix, dest){
    this.stack[prefix] = { dest: dest };
  }

  resolve(raw : string)  : string
  {
    if(!raw.startsWith("path://"))
      return raw;
    var parsed = url.parse(raw);
    if(! (parsed.host in this.stack))
      throw "Unregistered path : path://" + parsed.host;
    return path.join(this.stack[parsed.host].dest, parsed.path);
  }
}


