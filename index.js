Buffer.prototype.indexOf = function(str) { 
  if (typeof str !== 'string' || str.length === 0 || str.length > this.length) return -1; 
  var search = str.split("").map(function(el) { return el.charCodeAt(0); }), 
      searchLen = search.length, 
      ret = -1, i, j, len; 
  for (i=0,len=this.length; i<len; ++i) { 
    if (this[i] == search[0] && (len-i) >= searchLen) { 
      if (searchLen > 1) { 
        for (j=1; j<searchLen; ++j) { 
          if (this[i+j] != search[j]) 
            break; 
          else if (j == searchLen-1) { 
            ret = i; 
            break; 
          } 
        } 
      } else 
        ret = i; 
      if (ret > -1) 
        break; 
    } 
  } 
  return ret; 
};

///////

var fs = require('fs');
require("tinycolor");

////

var info = {
	arch: "unknown"
};

//

var filename = process.argv[2]; // replace with process.argv[1] when executed as a global module
fs.readFile(filename, function(err, result) {
	var index = result.indexOf("PE"),
		archIdentifier = result[index + 4].toString(16).toLowerCase();
	
	switch (archIdentifier) {
		case "4c":
			info.arch = "32 bit";
			break;
		case "64":
			info.arch = "64 bit";
			break;
	}

	done();
});

function done() {
	Object.keys(info).map(function(key, i) {
		console.log((key + ":").inverse + " " + info[key]);
	});
}