/**
 * ducktype
 *
 * Data validation using a ducktype interface. For JavaScript and Node.js.
 *
 * Load
 *    var ducktype = require('ducktype');
 *
 * Syntax:
 *     ducktype(type)
 *     ducktype(type, options)
 *     ducktype(type1, type2, ...)
 *     ducktype(type1, type2, ..., options)
 *
 * Where:
 *    type    is a type description
 *    options is an object with properties:
 *        name: String      (optional)
 *        optional: Boolean (optional)
 *        nullable: Boolean (optional)
 */
(function () {
  /**
   * Duck type constructor
   * @param {{name: String, test: Function}} options
   * @constructor DuckType
   */
  function DuckType (options) {
    this.name = options.name;
    this.test = options.test;
  }

  /**
   * Test whether an object matches this DuckType
   * @param {*} object
   * @returns {boolean} match
   */
  DuckType.prototype.test = function (object) {
    return false;
  };

  /**
   * Test whether an object matches this DuckType.
   * Throws a TypeError when the object does not match.
   * @param {*} object
   */
  DuckType.prototype.validate = function (object) {
    if (!this.test(object)) {
      throw new TypeError(object + ' is not a valid ' + (this.name || 'type'));
    }
  };

  /**
   * Create a new duck type. Syntax:
   *     ducktype(type)
   *     ducktype(type, options)
   *     ducktype(type1, type2, ...)
   *     ducktype(type1, type2, ..., options)
   *
   * Where:
   *    type    is a type description
   *    options is an object with properties:
   *        name: String      (optional)
   *        optional: Boolean (optional)
   *        nullable: Boolean (optional)
   *
   * @param {*...} args
   * @return {DuckType} ducktype
   */
  function ducktype (args) {
    var newDucktype;
    var type = null;
    var types = null;
    var options = null;
    var test, tests;

    // process arguments
    if (arguments.length == 0) {
      throw new SyntaxError('Parameter type missing');
    }
    else if (arguments.length == 1) {
      type = arguments[0];
    }
    else {
      types = [];
      for (var i = 0, ii = arguments.length; i < ii; i++) {
        // TODO: checking the last argument to be an object is a little tricky
        if ((i == ii - 1) && arguments[i].constructor === Object) {
          options = arguments[i];
        }
        else {
          types[i] = arguments[i];
        }
      }

      if (types.length == 1) {
        type = types[0];
        types = null;
      }
    }

    // create a duck type
    if (types) {
      tests = types.map(function (type) {
        return ducktype(type).test;
      });
      newDucktype = new DuckType({
        name: options && options.name || null,
        test: function test (object) {
          for (var i = 0, ii = tests.length; i < ii; i++) {
            if (tests[i](object)) {
              return true;
            }
          }
          return false;
        }
      });
    }
    else if (type === Array) {
      newDucktype = ducktype.array;
    }
    else if (type === Boolean) {
      newDucktype = ducktype.boolean;
    }
    else if (type === Date) {
      newDucktype = ducktype.date;
    }
    else if (type === Function) {
      newDucktype = ducktype.function;
    }
    else if (type === Number) {
      newDucktype = ducktype.number;
    }
    else if (type === Object) {
      newDucktype = ducktype.object;
    }
    else if (type === String) {
      newDucktype = ducktype.string;
    }
    else if (type === RegExp) {
      newDucktype = ducktype.regexp;
    }
    else if (type === null) {
      newDucktype = ducktype['null'];
    }
    else if (type === undefined) {
      newDucktype = ducktype['undefined'];
    }
    // TODO: add types null, undefined
    else if (type instanceof DuckType) {
      newDucktype = type; // already a duck type
    }
    else if (type instanceof Object) {
      tests = {};
      for (var prop in type) {
        if (type.hasOwnProperty(prop)) {
          tests[prop] = ducktype(type[prop]).test;
        }
      }

      newDucktype = new DuckType({
        name: options && options.name || null,
        test: function test (object) {
          for (var prop in tests) {
            if (tests.hasOwnProperty(prop)) {
              if (!tests[prop](object[prop])) {
                return false;
              }
            }
          }
          return true;
        }
      });
    }
    else {
      // a build-int type expected such as Number, String, Date, ...
      // TODO: optimize by generating the function as new Function(str)
      newDucktype = new DuckType({
        name: options && options.name || null,
        test: function test (object) {
          return (object instanceof type);
        }
      });
    }

    // process options
    if (options && ((options.optional !== undefined) || (options.nullable !== undefined))) {
      var optional = (options.optional !== undefined) ? options.optional : false;
      var nullable = (options.nullable !== undefined) ? options.nullable : false;
      // TODO: option strict

      test = newDucktype.test;
      newDucktype = new DuckType({
        name: options && options.name || newDucktype.name || null,
        test: function (object) {
          return test(object) ||
              ((object === null) && nullable) ||
              ((object === undefined) && optional);
        }
      });
    }

    // return the created ducktype
    return newDucktype;
  }

  // TODO: implement a parser implements js type annotations

  // TODO: implement non-strict tests and an option strict: Boolean

  // type Array
  ducktype.array = new DuckType({
    name: 'Array',
    test: function isArray(object) {
      return Array.isArray(object);
    }
  });

  // type Boolean
  ducktype.boolean = new DuckType({
    name: 'Boolean',
    test: function isBoolean(object) {
      return ((object instanceof Boolean) || (typeof object === 'boolean'));
    }
  });

  // type Date
  ducktype.date = new DuckType({
    name: 'Date',
    test: function isDate(object) {
      return (object instanceof Date);
    }
  });

  // type Function
  ducktype.function = new DuckType({
    name: 'Function',
    test: function isFunction(object) {
      return ((object instanceof Function) || (typeof object === 'function'));
    }
  });

  // type Number
  ducktype.number = new DuckType({
    name: 'Number',
    test: function isNumber(object) {
      return ((object instanceof Number) || (typeof object === 'number'));
    }
  });

  // type Object
  ducktype.object = new DuckType({
    name: 'Object',
    test: function isObject(object) {
      return ((object instanceof Object) && (object.constructor === Object));
    }
  });

  // type RegExp
  ducktype.regexp = new DuckType({
    name: 'RegExp',
    test: function isRegExp(object) {
      return (object instanceof RegExp);
    }
  });

  // type String
  ducktype.string = new DuckType({
    name: 'String',
    test: function isString(object) {
      return ((object instanceof String) || (typeof object === 'string'));
    }
  });

  // type null
  ducktype['null'] = new DuckType({
    name: 'null',
    test: function isNull(object) {
      return (object === null);
    }
  });

  // type undefined
  ducktype['undefined'] = new DuckType({
    name: 'undefined',
    test: function isUndefined(object) {
      return (object === undefined);
    }
  });

  // TODO: add types like url, phone number, email, postcode, ...

  /**
   * Shims for older JavaScript engines
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
   */
  if(!Array.isArray) {
    Array.isArray = function (vArg) {
      return Object.prototype.toString.call(vArg) === '[object Array]';
    };
  }

  /**
   * CommonJS module exports
   */
  if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = ducktype;
  }
  if (typeof exports !== 'undefined') {
    exports = ducktype;
  }

  /**
   * AMD module exports
   */
  if (typeof(require) != 'undefined' && typeof(define) != 'undefined') {
    define(function () {
      return ducktype;
    });
  }

  /**
   * Browser exports
   */
  if (typeof(window) != 'undefined') {
    window['ducktype'] = ducktype;
  }
})();

