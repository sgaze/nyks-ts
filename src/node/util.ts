var util   = require('util'),
    nCrypto = require('crypto');

declare module 'util'{
  export function md5(str) ;
 // export function parseargs(argv) ;
}

util.md5 = function(str){
  return nCrypto.createHash('md5').update(str).digest('hex');
}

/*util.parseargs = function(argv){
  var args = [], dict = {},
      k, v, r, e = new RegExp("^--?([a-z_0-9/:-]+)(?:=(.*))?", "i");

  Array.each(argv, function(arg){
    if(!arg.startsWith('-')) {
      args.push(arg);
    } else if(e.test(arg)) {
      r = e.exec(arg);
      k = r[1], v = r[2] === undefined ? true : r[2];
      if(dict[v] !== undefined) {
        if(typeOf(dict[k]) != "array") dict[k] = [dict[k]];
        dict[k].push(v);
      } else dict[k] = v;
    }
  });

  return {args:args, dict:dict};
}*/
