Util = new function() {
  var counter = 0;
  var self = this;

  this.randomize = function(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  };

  this.random = function(lower, upper) {
    var diff = upper - lower;
    var randomAdd = Math.floor((Math.random() * diff));
    return lower + randomAdd;
  }

  this.randomElement = function(array) {
    var index = Util.random(0, array.length);
    return array[index];
  }

  this.incrementingString = function() {
    counter += 1;
    return String(counter);
  }

  this.find = function(array, predicateFunc) {
    var res;
    $.each(array, function(i, el) {
      var found = predicateFunc(el);
      if (found) {
        res = el;
        return false
      }
    });
    return res
  }

  this.findAndDelete = function(array, predicateFunc) {
    var indexToDelete;
    $.each(array, function(i, el) {
      var found = predicateFunc(el);
      if (found) {
        indexToDelete = i;
        return false
      }
    });
    return array.splice(i,1);
  }

  this.objectValues = function(obj) {
    var keys = Object.keys(obj);
    var vals = [];

    for (var i = 0; i < keys.length; i++) {
      vals.push(obj[keys[i]])
    }

    return vals
  }

  this.arraysEqual = function(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  this.randomSortFn = function(a, b) {
    return [a,b][Math.round(Math.random())];
  }

  this.objectSize = function(obj) {
    Object.keys(obj).length
  }
  
  this.objectDiff = function(oldObj, newObj) {
    var oldObj = oldObj || {}
    var newObj = newObj || {}

    var diffObj = {}
    var allKeys = Object.keys(oldObj).concat(Object.keys(newObj));
    allKeys.forEach(function(key) {
      if (!self.equivalent(oldObj[key], newObj[key])) {    
        diffObj[key] = newObj[key]
      } 
    })

    return diffObj  
  }

  this.objectEq = function(obj1, obj2) {    
    var obj1 = obj1 || {}
    var obj2 = obj2 || {}

    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);

    var sameNumberOfKeys = keys1.length == keys2.length;
    
    // return false if any of the values are different
    for (var i = 0; i < keys1.length; i++) {
      var valuesEqual = self.equivalent(obj1[keys1[i]], obj2[keys1[i]]);
      if (!valuesEqual) return false
    }

    return sameNumberOfKeys
  }

  this.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  this.spaceToHyphen = function(string) {
    return string.replace(/\s/g, "-")
  }

  this.spaceToUnderscore = function(string) {
    return string.replace(/\s/g, "_")
  }

  this.guid = function() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  this.extend = function(obj1, obj2) {
    obj1 = obj1 || {}
    obj2 = obj2 || {}
        
    var extended = {}
    Object.keys(obj1).forEach(function(key){
      extended[key] = obj1[key];
    })

    Object.keys(obj2).forEach(function(key) {
      extended[key] = obj2[key];
    })

    return extended
  }

  this.escape = function(string) {
    return ('' + string).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
      // Escape all characters not included in SingleStringCharacters and
      // DoubleStringCharacters on
      // http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
      switch (character) {
        case '"':
        case "'":
        case '\\':
          return '\\' + character
        // Four possible LineTerminator characters need to be escaped:
        case '\n':
          return '\\n'
        case '\r':
          return '\\r'
        case '\u2028':
          return '\\u2028'
        case '\u2029':
          return '\\u2029'
      }
    })  
  }

  this.equivalent = function(val1, val2) {
     return (typeof val1 == typeof val2)
          && (val1 == val2 || (typeof val2 === "object" && self.objectEq(val1, val2)))
  }
}()

ViewUtil = new function() {
  this.fadeOut = function(element) {
    element.fadeOut(400);
  }

  this.fadeIn = function(element) {
    setTimeout(function(){
      element.fadeIn(400);
    }, 420);
  }

  this.isElementInContainerViewportVertically = function(el, container) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= $(container).height();
  }
}();