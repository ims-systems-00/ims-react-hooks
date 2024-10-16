'use strict';

var React = require('react');

function useBuildQueryString(initial) {
  const initialQueryState = {
    required: _buildDefault(initial).required,
    filter: _buildDefault(initial).filter,
    search: _buildDefault(initial).search,
    pagination: _buildDefault(initial).pagination,
  };

  const initialToolState = {
    filter: (initial && initial.filter) || {},
    required: (initial && initial.required) || {},
    search: (initial && initial.search) || {},
    pagination: (initial && initial.pagination) || {
      page: 1,
      size: 10,
    },
  };

  let [query, setQuery] = React.useState(initialQueryState);
  let [toolState, setToolState] = React.useState(initialToolState);

  function fullReset() {
    setQuery(initialQueryState);
    setToolState(initialToolState);
  }

  function _buildDefault(initial) {
    return {
      required:
        initial && initial.required
          ? objectToQuery(initial.required.value)
          : "",
      filter:
        initial && initial.filter ? objectToQuery(initial.filter.value) : "",
      search:
        initial && initial.search ? objectToQuery(initial.search.value) : "",
      pagination:
        initial && initial.pagination
          ? objectToQuery(initial.pagination)
          : objectToQuery({
              page: 1,
              size: 10,
            }),
    };
  }

  function isObject(object) {
    return object !== null && typeof object === "object";
  }
  function objectToQuery(object) {
    if (!object) return "";
    const queryBucket = [];
    function dig(obj, build = "") {
      if (!isObject(obj))
        return queryBucket.push(build + `=${encodeURIComponent(obj)}`);
      const keys = Object.keys(obj);
      for (let key of keys) {
        if (isObject(obj)) {
          let attach = !build
            ? `${key}`
            : !Array.isArray(obj)
            ? `[${key}]`
            : `[]`;
          dig(obj[key], build + attach);
        }
      }
      return obj;
    }
    dig(object);
    return queryBucket.join("&");
  }
  let formatString = (str) => (str ? "&" + str : str);
  // getQuery function will soon be deprecated. it's renamed to getQueryString
  function getQuery() {
    let processedString = "";
    let keys = Object.keys(query);
    for (let key of keys) {
      processedString = processedString
        ? processedString + formatString(query[key])
        : query[key];
    }
    return processedString;
  }
  function getQueryString() {
    return getQuery();
  }
  function handleRequired(requiredQuery) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        required: objectToQuery(requiredQuery.value),
        pagination: objectToQuery({
          page: 1,
          size: toolState?.pagination?.size,
        }),
      };
    });
    _updateRequired(requiredQuery);
    _updatePagination({ page: 1, size: 10 });
  }
  function handleFilter(filterQuery) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        filter: objectToQuery(filterQuery.value),
        pagination: objectToQuery({
          page: 1,
          size: toolState?.pagination?.size,
        }),
      };
    });
    _updateFilter(filterQuery);
    _updatePagination({ page: 1, size: toolState?.pagination?.size });
  }
  function handlePagination(page = 1, size = 10) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        pagination: objectToQuery({ page, size }),
      };
    });
    _updatePagination({
      page,
      size,
    });
  }
  function handleSearch(searchQuery) {
    setQuery((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        search: objectToQuery(searchQuery.value),
        pagination: objectToQuery({
          page: 1,
          size: toolState?.pagination?.size,
        }),
      };
    });
    _updateSearch(searchQuery);
    _updatePagination({ page: 1, size: toolState?.pagination?.size });
  }
  function _updatePagination(pagination) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        pagination,
      };
    });
  }
  function _updateFilter(filter) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        filter,
      };
    });
  }
  function _updateRequired(required) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        required,
      };
    });
  }
  function _updateSearch(search) {
    setToolState((prevState) => {
      /**
       * I'm using JSON to avoid object mutation, this is used only for performence.
       * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
       * basic and simple objects in state.
       */
      return {
        ...JSON.parse(JSON.stringify(prevState)),
        search,
      };
    });
  }
  return {
    query,
    toolState,
    fullReset,
    getQuery,
    getQueryString,
    handleFilter,
    handlePagination,
    handleSearch,
    handleRequired,
  };
}

/**
 * Based on Kendo UI Core expression code <https://github.com/telerik/kendo-ui-core#license-information>
 */

var propertyExpr;
var hasRequiredPropertyExpr;

function requirePropertyExpr () {
	if (hasRequiredPropertyExpr) return propertyExpr;
	hasRequiredPropertyExpr = 1;

	function Cache(maxSize) {
	  this._maxSize = maxSize;
	  this.clear();
	}
	Cache.prototype.clear = function () {
	  this._size = 0;
	  this._values = Object.create(null);
	};
	Cache.prototype.get = function (key) {
	  return this._values[key]
	};
	Cache.prototype.set = function (key, value) {
	  this._size >= this._maxSize && this.clear();
	  if (!(key in this._values)) this._size++;

	  return (this._values[key] = value)
	};

	var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g,
	  DIGIT_REGEX = /^\d+$/,
	  LEAD_DIGIT_REGEX = /^\d/,
	  SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,
	  CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/,
	  MAX_CACHE_SIZE = 512;

	var pathCache = new Cache(MAX_CACHE_SIZE),
	  setCache = new Cache(MAX_CACHE_SIZE),
	  getCache = new Cache(MAX_CACHE_SIZE);

	propertyExpr = {
	  Cache: Cache,

	  split: split,

	  normalizePath: normalizePath,

	  setter: function (path) {
	    var parts = normalizePath(path);

	    return (
	      setCache.get(path) ||
	      setCache.set(path, function setter(obj, value) {
	        var index = 0;
	        var len = parts.length;
	        var data = obj;

	        while (index < len - 1) {
	          var part = parts[index];
	          if (
	            part === '__proto__' ||
	            part === 'constructor' ||
	            part === 'prototype'
	          ) {
	            return obj
	          }

	          data = data[parts[index++]];
	        }
	        data[parts[index]] = value;
	      })
	    )
	  },

	  getter: function (path, safe) {
	    var parts = normalizePath(path);
	    return (
	      getCache.get(path) ||
	      getCache.set(path, function getter(data) {
	        var index = 0,
	          len = parts.length;
	        while (index < len) {
	          if (data != null || !safe) data = data[parts[index++]];
	          else return
	        }
	        return data
	      })
	    )
	  },

	  join: function (segments) {
	    return segments.reduce(function (path, part) {
	      return (
	        path +
	        (isQuoted(part) || DIGIT_REGEX.test(part)
	          ? '[' + part + ']'
	          : (path ? '.' : '') + part)
	      )
	    }, '')
	  },

	  forEach: function (path, cb, thisArg) {
	    forEach(Array.isArray(path) ? path : split(path), cb, thisArg);
	  },
	};

	function normalizePath(path) {
	  return (
	    pathCache.get(path) ||
	    pathCache.set(
	      path,
	      split(path).map(function (part) {
	        return part.replace(CLEAN_QUOTES_REGEX, '$2')
	      })
	    )
	  )
	}

	function split(path) {
	  return path.match(SPLIT_REGEX) || ['']
	}

	function forEach(parts, iter, thisArg) {
	  var len = parts.length,
	    part,
	    idx,
	    isArray,
	    isBracket;

	  for (idx = 0; idx < len; idx++) {
	    part = parts[idx];

	    if (part) {
	      if (shouldBeQuoted(part)) {
	        part = '"' + part + '"';
	      }

	      isBracket = isQuoted(part);
	      isArray = !isBracket && /^\d+$/.test(part);

	      iter.call(thisArg, part, isBracket, isArray, idx, parts);
	    }
	  }
	}

	function isQuoted(str) {
	  return (
	    typeof str === 'string' && str && ["'", '"'].indexOf(str.charAt(0)) !== -1
	  )
	}

	function hasLeadingNumber(part) {
	  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX)
	}

	function hasSpecialChars(part) {
	  return SPEC_CHAR_REGEX.test(part)
	}

	function shouldBeQuoted(part) {
	  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part))
	}
	return propertyExpr;
}

var propertyExprExports = requirePropertyExpr();

var toposort = {exports: {}};

var hasRequiredToposort;

function requireToposort () {
	if (hasRequiredToposort) return toposort.exports;
	hasRequiredToposort = 1;
	/**
	 * Topological sorting function
	 *
	 * @param {Array} edges
	 * @returns {Array}
	 */

	toposort.exports = function(edges) {
	  return toposort$1(uniqueNodes(edges), edges)
	};

	toposort.exports.array = toposort$1;

	function toposort$1(nodes, edges) {
	  var cursor = nodes.length
	    , sorted = new Array(cursor)
	    , visited = {}
	    , i = cursor
	    // Better data structures make algorithm much faster.
	    , outgoingEdges = makeOutgoingEdges(edges)
	    , nodesHash = makeNodesHash(nodes);

	  // check for unknown nodes
	  edges.forEach(function(edge) {
	    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
	      throw new Error('Unknown node. There is an unknown node in the supplied edges.')
	    }
	  });

	  while (i--) {
	    if (!visited[i]) visit(nodes[i], i, new Set());
	  }

	  return sorted

	  function visit(node, i, predecessors) {
	    if(predecessors.has(node)) {
	      var nodeRep;
	      try {
	        nodeRep = ", node was:" + JSON.stringify(node);
	      } catch(e) {
	        nodeRep = "";
	      }
	      throw new Error('Cyclic dependency' + nodeRep)
	    }

	    if (!nodesHash.has(node)) {
	      throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: '+JSON.stringify(node))
	    }

	    if (visited[i]) return;
	    visited[i] = true;

	    var outgoing = outgoingEdges.get(node) || new Set();
	    outgoing = Array.from(outgoing);

	    if (i = outgoing.length) {
	      predecessors.add(node);
	      do {
	        var child = outgoing[--i];
	        visit(child, nodesHash.get(child), predecessors);
	      } while (i)
	      predecessors.delete(node);
	    }

	    sorted[--cursor] = node;
	  }
	}

	function uniqueNodes(arr){
	  var res = new Set();
	  for (var i = 0, len = arr.length; i < len; i++) {
	    var edge = arr[i];
	    res.add(edge[0]);
	    res.add(edge[1]);
	  }
	  return Array.from(res)
	}

	function makeOutgoingEdges(arr){
	  var edges = new Map();
	  for (var i = 0, len = arr.length; i < len; i++) {
	    var edge = arr[i];
	    if (!edges.has(edge[0])) edges.set(edge[0], new Set());
	    if (!edges.has(edge[1])) edges.set(edge[1], new Set());
	    edges.get(edge[0]).add(edge[1]);
	  }
	  return edges
	}

	function makeNodesHash(arr){
	  var res = new Map();
	  for (var i = 0, len = arr.length; i < len; i++) {
	    res.set(arr[i], i);
	  }
	  return res
	}
	return toposort.exports;
}

requireToposort();

const toString = Object.prototype.toString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString = typeof Symbol !== 'undefined' ? Symbol.prototype.toString : () => '';
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
function printNumber(val) {
  if (val != +val) return 'NaN';
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? '-0' : '' + val;
}
function printSimpleValue(val, quoteStrings = false) {
  if (val == null || val === true || val === false) return '' + val;
  const typeOf = typeof val;
  if (typeOf === 'number') return printNumber(val);
  if (typeOf === 'string') return quoteStrings ? `"${val}"` : val;
  if (typeOf === 'function') return '[Function ' + (val.name || 'anonymous') + ']';
  if (typeOf === 'symbol') return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  const tag = toString.call(val).slice(8, -1);
  if (tag === 'Date') return isNaN(val.getTime()) ? '' + val : val.toISOString(val);
  if (tag === 'Error' || val instanceof Error) return '[' + errorToString.call(val) + ']';
  if (tag === 'RegExp') return regExpToString.call(val);
  return null;
}
function printValue(value, quoteStrings) {
  let result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(value, function (key, value) {
    let result = printSimpleValue(this[key], quoteStrings);
    if (result !== null) return result;
    return value;
  }, 2);
}

function toArray(value) {
  return value == null ? [] : [].concat(value);
}

let _Symbol$toStringTag, _Symbol$hasInstance, _Symbol$toStringTag2;
let strReg = /\$\{\s*(\w+)\s*\}/g;
_Symbol$toStringTag = Symbol.toStringTag;
class ValidationErrorNoStack {
  constructor(errorOrErrors, value, field, type) {
    this.name = void 0;
    this.message = void 0;
    this.value = void 0;
    this.path = void 0;
    this.type = void 0;
    this.params = void 0;
    this.errors = void 0;
    this.inner = void 0;
    this[_Symbol$toStringTag] = 'Error';
    this.name = 'ValidationError';
    this.value = value;
    this.path = field;
    this.type = type;
    this.errors = [];
    this.inner = [];
    toArray(errorOrErrors).forEach(err => {
      if (ValidationError.isError(err)) {
        this.errors.push(...err.errors);
        const innerErrors = err.inner.length ? err.inner : [err];
        this.inner.push(...innerErrors);
      } else {
        this.errors.push(err);
      }
    });
    this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
  }
}
_Symbol$hasInstance = Symbol.hasInstance;
_Symbol$toStringTag2 = Symbol.toStringTag;
class ValidationError extends Error {
  static formatError(message, params) {
    const path = params.label || params.path || 'this';
    if (path !== params.path) params = Object.assign({}, params, {
      path
    });
    if (typeof message === 'string') return message.replace(strReg, (_, key) => printValue(params[key]));
    if (typeof message === 'function') return message(params);
    return message;
  }
  static isError(err) {
    return err && err.name === 'ValidationError';
  }
  constructor(errorOrErrors, value, field, type, disableStack) {
    const errorNoStack = new ValidationErrorNoStack(errorOrErrors, value, field, type);
    if (disableStack) {
      return errorNoStack;
    }
    super();
    this.value = void 0;
    this.path = void 0;
    this.type = void 0;
    this.params = void 0;
    this.errors = [];
    this.inner = [];
    this[_Symbol$toStringTag2] = 'Error';
    this.name = errorNoStack.name;
    this.message = errorNoStack.message;
    this.type = errorNoStack.type;
    this.value = errorNoStack.value;
    this.path = errorNoStack.path;
    this.errors = errorNoStack.errors;
    this.inner = errorNoStack.inner;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
  static [_Symbol$hasInstance](inst) {
    return ValidationErrorNoStack[Symbol.hasInstance](inst) || super[Symbol.hasInstance](inst);
  }
}

let mixed = {
  default: '${path} is invalid',
  required: '${path} is a required field',
  defined: '${path} must be defined',
  notNull: '${path} cannot be null',
  oneOf: '${path} must be one of the following values: ${values}',
  notOneOf: '${path} must not be one of the following values: ${values}',
  notType: ({
    path,
    type,
    value,
    originalValue
  }) => {
    const castMsg = originalValue != null && originalValue !== value ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : '.';
    return type !== 'mixed' ? `${path} must be a \`${type}\` type, ` + `but the final value was: \`${printValue(value, true)}\`` + castMsg : `${path} must match the configured type. ` + `The validated value was: \`${printValue(value, true)}\`` + castMsg;
  }
};
let string = {
  length: '${path} must be exactly ${length} characters',
  min: '${path} must be at least ${min} characters',
  max: '${path} must be at most ${max} characters',
  matches: '${path} must match the following: "${regex}"',
  email: '${path} must be a valid email',
  url: '${path} must be a valid URL',
  uuid: '${path} must be a valid UUID',
  datetime: '${path} must be a valid ISO date-time',
  datetime_precision: '${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits',
  datetime_offset: '${path} must be a valid ISO date-time with UTC "Z" timezone',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string'
};
let number = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer'
};
let date = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}'
};
let boolean = {
  isValue: '${path} field must be ${value}'
};
let object = {
  noUnknown: '${path} field has unspecified keys: ${unknown}'
};
let array = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
  length: '${path} must have ${length} items'
};
let tuple = {
  notType: params => {
    const {
      path,
      value,
      spec
    } = params;
    const typeLen = spec.types.length;
    if (Array.isArray(value)) {
      if (value.length < typeLen) return `${path} tuple value has too few items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
      if (value.length > typeLen) return `${path} tuple value has too many items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
    }
    return ValidationError.formatError(mixed.notType, params);
  }
};
Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
  tuple
});

const isSchema = obj => obj && obj.__isYupSchema__;

class Condition {
  static fromOptions(refs, config) {
    if (!config.then && !config.otherwise) throw new TypeError('either `then:` or `otherwise:` is required for `when()` conditions');
    let {
      is,
      then,
      otherwise
    } = config;
    let check = typeof is === 'function' ? is : (...values) => values.every(value => value === is);
    return new Condition(refs, (values, schema) => {
      var _branch;
      let branch = check(...values) ? then : otherwise;
      return (_branch = branch == null ? void 0 : branch(schema)) != null ? _branch : schema;
    });
  }
  constructor(refs, builder) {
    this.fn = void 0;
    this.refs = refs;
    this.refs = refs;
    this.fn = builder;
  }
  resolve(base, options) {
    let values = this.refs.map(ref =>
    // TODO: ? operator here?
    ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context));
    let schema = this.fn(values, base, options);
    if (schema === undefined ||
    // @ts-ignore this can be base
    schema === base) {
      return base;
    }
    if (!isSchema(schema)) throw new TypeError('conditions must return a schema object');
    return schema.resolve(options);
  }
}

const prefixes = {
  context: '$',
  value: '.'
};
class Reference {
  constructor(key, options = {}) {
    this.key = void 0;
    this.isContext = void 0;
    this.isValue = void 0;
    this.isSibling = void 0;
    this.path = void 0;
    this.getter = void 0;
    this.map = void 0;
    if (typeof key !== 'string') throw new TypeError('ref must be a string, got: ' + key);
    this.key = key.trim();
    if (key === '') throw new TypeError('ref must be a non-empty string');
    this.isContext = this.key[0] === prefixes.context;
    this.isValue = this.key[0] === prefixes.value;
    this.isSibling = !this.isContext && !this.isValue;
    let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : '';
    this.path = this.key.slice(prefix.length);
    this.getter = this.path && propertyExprExports.getter(this.path, true);
    this.map = options.map;
  }
  getValue(value, parent, context) {
    let result = this.isContext ? context : this.isValue ? value : parent;
    if (this.getter) result = this.getter(result || {});
    if (this.map) result = this.map(result);
    return result;
  }

  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(value, options) {
    return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: 'ref',
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(value) {
    return value && value.__isYupRef;
  }
}

// @ts-ignore
Reference.prototype.__isYupRef = true;

const isAbsent = value => value == null;

function createValidation(config) {
  function validate({
    value,
    path = '',
    options,
    originalValue,
    schema
  }, panic, next) {
    const {
      name,
      test,
      params,
      message,
      skipAbsent
    } = config;
    let {
      parent,
      context,
      abortEarly = schema.spec.abortEarly,
      disableStackTrace = schema.spec.disableStackTrace
    } = options;
    function resolve(item) {
      return Reference.isRef(item) ? item.getValue(value, parent, context) : item;
    }
    function createError(overrides = {}) {
      const nextParams = Object.assign({
        value,
        originalValue,
        label: schema.spec.label,
        path: overrides.path || path,
        spec: schema.spec,
        disableStackTrace: overrides.disableStackTrace || disableStackTrace
      }, params, overrides.params);
      for (const key of Object.keys(nextParams)) nextParams[key] = resolve(nextParams[key]);
      const error = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name, nextParams.disableStackTrace);
      error.params = nextParams;
      return error;
    }
    const invalid = abortEarly ? panic : next;
    let ctx = {
      path,
      parent,
      type: name,
      from: options.from,
      createError,
      resolve,
      options,
      originalValue,
      schema
    };
    const handleResult = validOrError => {
      if (ValidationError.isError(validOrError)) invalid(validOrError);else if (!validOrError) invalid(createError());else next(null);
    };
    const handleError = err => {
      if (ValidationError.isError(err)) invalid(err);else panic(err);
    };
    const shouldSkip = skipAbsent && isAbsent(value);
    if (shouldSkip) {
      return handleResult(true);
    }
    let result;
    try {
      var _result;
      result = test.call(ctx, value, ctx);
      if (typeof ((_result = result) == null ? void 0 : _result.then) === 'function') {
        if (options.sync) {
          throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. ` + `This test will finish after the validate call has returned`);
        }
        return Promise.resolve(result).then(handleResult, handleError);
      }
    } catch (err) {
      handleError(err);
      return;
    }
    handleResult(result);
  }
  validate.OPTIONS = config;
  return validate;
}

function getIn(schema, path, value, context = value) {
  let parent, lastPart, lastPartDebug;

  // root path: ''
  if (!path) return {
    parent,
    parentPath: path,
    schema
  };
  propertyExprExports.forEach(path, (_part, isBracket, isArray) => {
    let part = isBracket ? _part.slice(1, _part.length - 1) : _part;
    schema = schema.resolve({
      context,
      parent,
      value
    });
    let isTuple = schema.type === 'tuple';
    let idx = isArray ? parseInt(part, 10) : 0;
    if (schema.innerType || isTuple) {
      if (isTuple && !isArray) throw new Error(`Yup.reach cannot implicitly index into a tuple type. the path part "${lastPartDebug}" must contain an index to the tuple element, e.g. "${lastPartDebug}[0]"`);
      if (value && idx >= value.length) {
        throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. ` + `because there is no value at that index. `);
      }
      parent = value;
      value = value && value[idx];
      schema = isTuple ? schema.spec.types[idx] : schema.innerType;
    }

    // sometimes the array index part of a path doesn't exist: "nested.arr.child"
    // in these cases the current part is the next schema and should be processed
    // in this iteration. For cases where the index signature is included this
    // check will fail and we'll handle the `child` part on the next iteration like normal
    if (!isArray) {
      if (!schema.fields || !schema.fields[part]) throw new Error(`The schema does not contain the path: ${path}. ` + `(failed at: ${lastPartDebug} which is a type: "${schema.type}")`);
      parent = value;
      value = value && value[part];
      schema = schema.fields[part];
    }
    lastPart = part;
    lastPartDebug = isBracket ? '[' + _part + ']' : '.' + _part;
  });
  return {
    schema,
    parent,
    parentPath: lastPart
  };
}
function reach(obj, path, value, context) {
  return getIn(obj, path, value, context).schema;
}

class ReferenceSet extends Set {
  describe() {
    const description = [];
    for (const item of this.values()) {
      description.push(Reference.isRef(item) ? item.describe() : item);
    }
    return description;
  }
  resolveAll(resolve) {
    let result = [];
    for (const item of this.values()) {
      result.push(resolve(item));
    }
    return result;
  }
  clone() {
    return new ReferenceSet(this.values());
  }
  merge(newItems, removeItems) {
    const next = this.clone();
    newItems.forEach(value => next.add(value));
    removeItems.forEach(value => next.delete(value));
    return next;
  }
}

// tweaked from https://github.com/Kelin2025/nanoclone/blob/0abeb7635bda9b68ef2277093f76dbe3bf3948e1/src/index.js
function clone(src, seen = new Map()) {
  if (isSchema(src) || !src || typeof src !== 'object') return src;
  if (seen.has(src)) return seen.get(src);
  let copy;
  if (src instanceof Date) {
    // Date
    copy = new Date(src.getTime());
    seen.set(src, copy);
  } else if (src instanceof RegExp) {
    // RegExp
    copy = new RegExp(src);
    seen.set(src, copy);
  } else if (Array.isArray(src)) {
    // Array
    copy = new Array(src.length);
    seen.set(src, copy);
    for (let i = 0; i < src.length; i++) copy[i] = clone(src[i], seen);
  } else if (src instanceof Map) {
    // Map
    copy = new Map();
    seen.set(src, copy);
    for (const [k, v] of src.entries()) copy.set(k, clone(v, seen));
  } else if (src instanceof Set) {
    // Set
    copy = new Set();
    seen.set(src, copy);
    for (const v of src) copy.add(clone(v, seen));
  } else if (src instanceof Object) {
    // Object
    copy = {};
    seen.set(src, copy);
    for (const [k, v] of Object.entries(src)) copy[k] = clone(v, seen);
  } else {
    throw Error(`Unable to clone ${src}`);
  }
  return copy;
}

// If `CustomSchemaMeta` isn't extended with any keys, we'll fall back to a
// loose Record definition allowing free form usage.
class Schema {
  constructor(options) {
    this.type = void 0;
    this.deps = [];
    this.tests = void 0;
    this.transforms = void 0;
    this.conditions = [];
    this._mutate = void 0;
    this.internalTests = {};
    this._whitelist = new ReferenceSet();
    this._blacklist = new ReferenceSet();
    this.exclusiveTests = Object.create(null);
    this._typeCheck = void 0;
    this.spec = void 0;
    this.tests = [];
    this.transforms = [];
    this.withMutation(() => {
      this.typeError(mixed.notType);
    });
    this.type = options.type;
    this._typeCheck = options.check;
    this.spec = Object.assign({
      strip: false,
      strict: false,
      abortEarly: true,
      recursive: true,
      disableStackTrace: false,
      nullable: false,
      optional: true,
      coerce: true
    }, options == null ? void 0 : options.spec);
    this.withMutation(s => {
      s.nonNullable();
    });
  }

  // TODO: remove
  get _type() {
    return this.type;
  }
  clone(spec) {
    if (this._mutate) {
      if (spec) Object.assign(this.spec, spec);
      return this;
    }

    // if the nested value is a schema we can skip cloning, since
    // they are already immutable
    const next = Object.create(Object.getPrototypeOf(this));

    // @ts-expect-error this is readonly
    next.type = this.type;
    next._typeCheck = this._typeCheck;
    next._whitelist = this._whitelist.clone();
    next._blacklist = this._blacklist.clone();
    next.internalTests = Object.assign({}, this.internalTests);
    next.exclusiveTests = Object.assign({}, this.exclusiveTests);

    // @ts-expect-error this is readonly
    next.deps = [...this.deps];
    next.conditions = [...this.conditions];
    next.tests = [...this.tests];
    next.transforms = [...this.transforms];
    next.spec = clone(Object.assign({}, this.spec, spec));
    return next;
  }
  label(label) {
    let next = this.clone();
    next.spec.label = label;
    return next;
  }
  meta(...args) {
    if (args.length === 0) return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
  withMutation(fn) {
    let before = this._mutate;
    this._mutate = true;
    let result = fn(this);
    this._mutate = before;
    return result;
  }
  concat(schema) {
    if (!schema || schema === this) return this;
    if (schema.type !== this.type && this.type !== 'mixed') throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema.type}`);
    let base = this;
    let combined = schema.clone();
    const mergedSpec = Object.assign({}, base.spec, combined.spec);
    combined.spec = mergedSpec;
    combined.internalTests = Object.assign({}, base.internalTests, combined.internalTests);

    // manually merge the blacklist/whitelist (the other `schema` takes
    // precedence in case of conflicts)
    combined._whitelist = base._whitelist.merge(schema._whitelist, schema._blacklist);
    combined._blacklist = base._blacklist.merge(schema._blacklist, schema._whitelist);

    // start with the current tests
    combined.tests = base.tests;
    combined.exclusiveTests = base.exclusiveTests;

    // manually add the new tests to ensure
    // the deduping logic is consistent
    combined.withMutation(next => {
      schema.tests.forEach(fn => {
        next.test(fn.OPTIONS);
      });
    });
    combined.transforms = [...base.transforms, ...combined.transforms];
    return combined;
  }
  isType(v) {
    if (v == null) {
      if (this.spec.nullable && v === null) return true;
      if (this.spec.optional && v === undefined) return true;
      return false;
    }
    return this._typeCheck(v);
  }
  resolve(options) {
    let schema = this;
    if (schema.conditions.length) {
      let conditions = schema.conditions;
      schema = schema.clone();
      schema.conditions = [];
      schema = conditions.reduce((prevSchema, condition) => condition.resolve(prevSchema, options), schema);
      schema = schema.resolve(options);
    }
    return schema;
  }
  resolveOptions(options) {
    var _options$strict, _options$abortEarly, _options$recursive, _options$disableStack;
    return Object.assign({}, options, {
      from: options.from || [],
      strict: (_options$strict = options.strict) != null ? _options$strict : this.spec.strict,
      abortEarly: (_options$abortEarly = options.abortEarly) != null ? _options$abortEarly : this.spec.abortEarly,
      recursive: (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive,
      disableStackTrace: (_options$disableStack = options.disableStackTrace) != null ? _options$disableStack : this.spec.disableStackTrace
    });
  }

  /**
   * Run the configured transform pipeline over an input value.
   */

  cast(value, options = {}) {
    let resolvedSchema = this.resolve(Object.assign({
      value
    }, options));
    let allowOptionality = options.assert === 'ignore-optionality';
    let result = resolvedSchema._cast(value, options);
    if (options.assert !== false && !resolvedSchema.isType(result)) {
      if (allowOptionality && isAbsent(result)) {
        return result;
      }
      let formattedValue = printValue(value);
      let formattedResult = printValue(result);
      throw new TypeError(`The value of ${options.path || 'field'} could not be cast to a value ` + `that satisfies the schema type: "${resolvedSchema.type}". \n\n` + `attempted value: ${formattedValue} \n` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ''));
    }
    return result;
  }
  _cast(rawValue, options) {
    let value = rawValue === undefined ? rawValue : this.transforms.reduce((prevValue, fn) => fn.call(this, prevValue, rawValue, this), rawValue);
    if (value === undefined) {
      value = this.getDefault(options);
    }
    return value;
  }
  _validate(_value, options = {}, panic, next) {
    let {
      path,
      originalValue = _value,
      strict = this.spec.strict
    } = options;
    let value = _value;
    if (!strict) {
      value = this._cast(value, Object.assign({
        assert: false
      }, options));
    }
    let initialTests = [];
    for (let test of Object.values(this.internalTests)) {
      if (test) initialTests.push(test);
    }
    this.runTests({
      path,
      value,
      originalValue,
      options,
      tests: initialTests
    }, panic, initialErrors => {
      // even if we aren't ending early we can't proceed further if the types aren't correct
      if (initialErrors.length) {
        return next(initialErrors, value);
      }
      this.runTests({
        path,
        value,
        originalValue,
        options,
        tests: this.tests
      }, panic, next);
    });
  }

  /**
   * Executes a set of validations, either schema, produced Tests or a nested
   * schema validate result.
   */
  runTests(runOptions, panic, next) {
    let fired = false;
    let {
      tests,
      value,
      originalValue,
      path,
      options
    } = runOptions;
    let panicOnce = arg => {
      if (fired) return;
      fired = true;
      panic(arg, value);
    };
    let nextOnce = arg => {
      if (fired) return;
      fired = true;
      next(arg, value);
    };
    let count = tests.length;
    let nestedErrors = [];
    if (!count) return nextOnce([]);
    let args = {
      value,
      originalValue,
      path,
      options,
      schema: this
    };
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      test(args, panicOnce, function finishTestRun(err) {
        if (err) {
          Array.isArray(err) ? nestedErrors.push(...err) : nestedErrors.push(err);
        }
        if (--count <= 0) {
          nextOnce(nestedErrors);
        }
      });
    }
  }
  asNestedTest({
    key,
    index,
    parent,
    parentPath,
    originalParent,
    options
  }) {
    const k = key != null ? key : index;
    if (k == null) {
      throw TypeError('Must include `key` or `index` for nested validations');
    }
    const isIndex = typeof k === 'number';
    let value = parent[k];
    const testOptions = Object.assign({}, options, {
      // Nested validations fields are always strict:
      //    1. parent isn't strict so the casting will also have cast inner values
      //    2. parent is strict in which case the nested values weren't cast either
      strict: true,
      parent,
      value,
      originalValue: originalParent[k],
      // FIXME: tests depend on `index` being passed around deeply,
      //   we should not let the options.key/index bleed through
      key: undefined,
      // index: undefined,
      [isIndex ? 'index' : 'key']: k,
      path: isIndex || k.includes('.') ? `${parentPath || ''}[${isIndex ? k : `"${k}"`}]` : (parentPath ? `${parentPath}.` : '') + key
    });
    return (_, panic, next) => this.resolve(testOptions)._validate(value, testOptions, panic, next);
  }
  validate(value, options) {
    var _options$disableStack2;
    let schema = this.resolve(Object.assign({}, options, {
      value
    }));
    let disableStackTrace = (_options$disableStack2 = options == null ? void 0 : options.disableStackTrace) != null ? _options$disableStack2 : schema.spec.disableStackTrace;
    return new Promise((resolve, reject) => schema._validate(value, options, (error, parsed) => {
      if (ValidationError.isError(error)) error.value = parsed;
      reject(error);
    }, (errors, validated) => {
      if (errors.length) reject(new ValidationError(errors, validated, undefined, undefined, disableStackTrace));else resolve(validated);
    }));
  }
  validateSync(value, options) {
    var _options$disableStack3;
    let schema = this.resolve(Object.assign({}, options, {
      value
    }));
    let result;
    let disableStackTrace = (_options$disableStack3 = options == null ? void 0 : options.disableStackTrace) != null ? _options$disableStack3 : schema.spec.disableStackTrace;
    schema._validate(value, Object.assign({}, options, {
      sync: true
    }), (error, parsed) => {
      if (ValidationError.isError(error)) error.value = parsed;
      throw error;
    }, (errors, validated) => {
      if (errors.length) throw new ValidationError(errors, value, undefined, undefined, disableStackTrace);
      result = validated;
    });
    return result;
  }
  isValid(value, options) {
    return this.validate(value, options).then(() => true, err => {
      if (ValidationError.isError(err)) return false;
      throw err;
    });
  }
  isValidSync(value, options) {
    try {
      this.validateSync(value, options);
      return true;
    } catch (err) {
      if (ValidationError.isError(err)) return false;
      throw err;
    }
  }
  _getDefault(options) {
    let defaultValue = this.spec.default;
    if (defaultValue == null) {
      return defaultValue;
    }
    return typeof defaultValue === 'function' ? defaultValue.call(this, options) : clone(defaultValue);
  }
  getDefault(options
  // If schema is defaulted we know it's at least not undefined
  ) {
    let schema = this.resolve(options || {});
    return schema._getDefault(options);
  }
  default(def) {
    if (arguments.length === 0) {
      return this._getDefault();
    }
    let next = this.clone({
      default: def
    });
    return next;
  }
  strict(isStrict = true) {
    return this.clone({
      strict: isStrict
    });
  }
  nullability(nullable, message) {
    const next = this.clone({
      nullable
    });
    next.internalTests.nullable = createValidation({
      message,
      name: 'nullable',
      test(value) {
        return value === null ? this.schema.spec.nullable : true;
      }
    });
    return next;
  }
  optionality(optional, message) {
    const next = this.clone({
      optional
    });
    next.internalTests.optionality = createValidation({
      message,
      name: 'optionality',
      test(value) {
        return value === undefined ? this.schema.spec.optional : true;
      }
    });
    return next;
  }
  optional() {
    return this.optionality(true);
  }
  defined(message = mixed.defined) {
    return this.optionality(false, message);
  }
  nullable() {
    return this.nullability(true);
  }
  nonNullable(message = mixed.notNull) {
    return this.nullability(false, message);
  }
  required(message = mixed.required) {
    return this.clone().withMutation(next => next.nonNullable(message).defined(message));
  }
  notRequired() {
    return this.clone().withMutation(next => next.nullable().optional());
  }
  transform(fn) {
    let next = this.clone();
    next.transforms.push(fn);
    return next;
  }

  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */

  test(...args) {
    let opts;
    if (args.length === 1) {
      if (typeof args[0] === 'function') {
        opts = {
          test: args[0]
        };
      } else {
        opts = args[0];
      }
    } else if (args.length === 2) {
      opts = {
        name: args[0],
        test: args[1]
      };
    } else {
      opts = {
        name: args[0],
        message: args[1],
        test: args[2]
      };
    }
    if (opts.message === undefined) opts.message = mixed.default;
    if (typeof opts.test !== 'function') throw new TypeError('`test` is a required parameters');
    let next = this.clone();
    let validate = createValidation(opts);
    let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;
    if (opts.exclusive) {
      if (!opts.name) throw new TypeError('Exclusive tests must provide a unique `name` identifying the test');
    }
    if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;
    next.tests = next.tests.filter(fn => {
      if (fn.OPTIONS.name === opts.name) {
        if (isExclusive) return false;
        if (fn.OPTIONS.test === validate.OPTIONS.test) return false;
      }
      return true;
    });
    next.tests.push(validate);
    return next;
  }
  when(keys, options) {
    if (!Array.isArray(keys) && typeof keys !== 'string') {
      options = keys;
      keys = '.';
    }
    let next = this.clone();
    let deps = toArray(keys).map(key => new Reference(key));
    deps.forEach(dep => {
      // @ts-ignore readonly array
      if (dep.isSibling) next.deps.push(dep.key);
    });
    next.conditions.push(typeof options === 'function' ? new Condition(deps, options) : Condition.fromOptions(deps, options));
    return next;
  }
  typeError(message) {
    let next = this.clone();
    next.internalTests.typeError = createValidation({
      message,
      name: 'typeError',
      skipAbsent: true,
      test(value) {
        if (!this.schema._typeCheck(value)) return this.createError({
          params: {
            type: this.schema.type
          }
        });
        return true;
      }
    });
    return next;
  }
  oneOf(enums, message = mixed.oneOf) {
    let next = this.clone();
    enums.forEach(val => {
      next._whitelist.add(val);
      next._blacklist.delete(val);
    });
    next.internalTests.whiteList = createValidation({
      message,
      name: 'oneOf',
      skipAbsent: true,
      test(value) {
        let valids = this.schema._whitelist;
        let resolved = valids.resolveAll(this.resolve);
        return resolved.includes(value) ? true : this.createError({
          params: {
            values: Array.from(valids).join(', '),
            resolved
          }
        });
      }
    });
    return next;
  }
  notOneOf(enums, message = mixed.notOneOf) {
    let next = this.clone();
    enums.forEach(val => {
      next._blacklist.add(val);
      next._whitelist.delete(val);
    });
    next.internalTests.blacklist = createValidation({
      message,
      name: 'notOneOf',
      test(value) {
        let invalids = this.schema._blacklist;
        let resolved = invalids.resolveAll(this.resolve);
        if (resolved.includes(value)) return this.createError({
          params: {
            values: Array.from(invalids).join(', '),
            resolved
          }
        });
        return true;
      }
    });
    return next;
  }
  strip(strip = true) {
    let next = this.clone();
    next.spec.strip = strip;
    return next;
  }

  /**
   * Return a serialized description of the schema including validations, flags, types etc.
   *
   * @param options Provide any needed context for resolving runtime schema alterations (lazy, when conditions, etc).
   */
  describe(options) {
    const next = (options ? this.resolve(options) : this).clone();
    const {
      label,
      meta,
      optional,
      nullable
    } = next.spec;
    const description = {
      meta,
      label,
      optional,
      nullable,
      default: next.getDefault(options),
      type: next.type,
      oneOf: next._whitelist.describe(),
      notOneOf: next._blacklist.describe(),
      tests: next.tests.map(fn => ({
        name: fn.OPTIONS.name,
        params: fn.OPTIONS.params
      })).filter((n, idx, list) => list.findIndex(c => c.name === n.name) === idx)
    };
    return description;
  }
}
// @ts-expect-error
Schema.prototype.__isYupSchema__ = true;
for (const method of ['validate', 'validateSync']) Schema.prototype[`${method}At`] = function (path, value, options = {}) {
  const {
    parent,
    parentPath,
    schema
  } = getIn(this, path, value, options.context);
  return schema[method](parent && parent[parentPath], Object.assign({}, options, {
    parent,
    path
  }));
};
for (const alias of ['equals', 'is']) Schema.prototype[alias] = Schema.prototype.oneOf;
for (const alias of ['not', 'nope']) Schema.prototype[alias] = Schema.prototype.notOneOf;

/**
 * This file is a modified version of the file from the following repository:
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * NON-CONFORMANT EDITION.
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 */

// prettier-ignore
//                1 YYYY                2 MM        3 DD              4 HH     5 mm        6 ss           7 msec         8 Z 9 ±   10 tzHH    11 tzmm
const isoReg = /^(\d{4}|[+-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,.](\d{1,}))?)?(?:(Z)|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;
function parseIsoDate(date) {
  const struct = parseDateStruct(date);
  if (!struct) return Date.parse ? Date.parse(date) : Number.NaN;

  // timestamps without timezone identifiers should be considered local time
  if (struct.z === undefined && struct.plusMinus === undefined) {
    return new Date(struct.year, struct.month, struct.day, struct.hour, struct.minute, struct.second, struct.millisecond).valueOf();
  }
  let totalMinutesOffset = 0;
  if (struct.z !== 'Z' && struct.plusMinus !== undefined) {
    totalMinutesOffset = struct.hourOffset * 60 + struct.minuteOffset;
    if (struct.plusMinus === '+') totalMinutesOffset = 0 - totalMinutesOffset;
  }
  return Date.UTC(struct.year, struct.month, struct.day, struct.hour, struct.minute + totalMinutesOffset, struct.second, struct.millisecond);
}
function parseDateStruct(date) {
  var _regexResult$7$length, _regexResult$;
  const regexResult = isoReg.exec(date);
  if (!regexResult) return null;

  // use of toNumber() avoids NaN timestamps caused by “undefined”
  // values being passed to Date constructor
  return {
    year: toNumber(regexResult[1]),
    month: toNumber(regexResult[2], 1) - 1,
    day: toNumber(regexResult[3], 1),
    hour: toNumber(regexResult[4]),
    minute: toNumber(regexResult[5]),
    second: toNumber(regexResult[6]),
    millisecond: regexResult[7] ?
    // allow arbitrary sub-second precision beyond milliseconds
    toNumber(regexResult[7].substring(0, 3)) : 0,
    precision: (_regexResult$7$length = (_regexResult$ = regexResult[7]) == null ? void 0 : _regexResult$.length) != null ? _regexResult$7$length : undefined,
    z: regexResult[8] || undefined,
    plusMinus: regexResult[9] || undefined,
    hourOffset: toNumber(regexResult[10]),
    minuteOffset: toNumber(regexResult[11])
  };
}
function toNumber(str, defaultValue = 0) {
  return Number(str) || defaultValue;
}

//
// Number Interfaces
//

let invalidDate = new Date('');
let isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';
class DateSchema extends Schema {
  constructor() {
    super({
      type: 'date',
      check(v) {
        return isDate(v) && !isNaN(v.getTime());
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        // null -> InvalidDate isn't useful; treat all nulls as null and let it fail on
        // nullability check vs TypeErrors
        if (!ctx.spec.coerce || ctx.isType(value) || value === null) return value;
        value = parseIsoDate(value);

        // 0 is a valid timestamp equivalent to 1970-01-01T00:00:00Z(unix epoch) or before.
        return !isNaN(value) ? new Date(value) : DateSchema.INVALID_DATE;
      });
    });
  }
  prepareParam(ref, name) {
    let param;
    if (!Reference.isRef(ref)) {
      let cast = this.cast(ref);
      if (!this._typeCheck(cast)) throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
      param = cast;
    } else {
      param = ref;
    }
    return param;
  }
  min(min, message = date.min) {
    let limit = this.prepareParam(min, 'min');
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      test(value) {
        return value >= this.resolve(limit);
      }
    });
  }
  max(max, message = date.max) {
    let limit = this.prepareParam(max, 'max');
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value <= this.resolve(limit);
      }
    });
  }
}
DateSchema.INVALID_DATE = invalidDate;

const byString = function (object, accessString) {
  accessString = accessString.replace(/\[(\w+)\]/g, ".$1");
  accessString = accessString.replace(/^\./, "");
  let accessKeys = accessString.split(".");
  for (let i = 0, n = accessKeys.length; i < n; ++i) {
    let key = accessKeys[i];
    if (key in object) {
      object = object[key];
    } else {
      return;
    }
  }
  return object;
};
Object.byString = byString;
function useForm(initdataModel, schema) {
  const [dataModel, setDataModel] = React.useState(initdataModel);
  const [validationErrors, setValidationErrors] = React.useState({});
  const [isBusy, setIsBusy] = React.useState(false);
  const validate = async () => {
    const options = { abortEarly: false, context: schema.cast(dataModel) };
    const errors = {};
    try {
      await schema.validate(dataModel, options);
      return null;
    } catch (err) {
      err.inner.forEach((item) => {
        errors[item.path] = item.message;
      });
      return errors;
    }
  };
  const validateProperty = async (field, value) => {
    const errors = { ...validationErrors };
    try {
      const objSchema = reach(schema, field);
      await objSchema.validate(value);
      /**
       * if reached this block after promise it means validation success.
       * remove the errors if there is any regarding this field.
       */
      delete errors[field];
    } catch (err) {
      /**
       * invalid input detected. update with proper error message on the
       * respective field.
       */
      errors[field] = err.message;
    } finally {
      /**
       * finally we are just setting the erros to state.
       */
      setValidationErrors(errors);
    }
  };
  const handleSubmit = async (e, doSubmit, reset = true, options = {}) => {
    e.preventDefault();
    const errors = await validate();
    if (errors) return setValidationErrors(errors);
    // Form submission logic here ....
    function submission() {
      return new Promise(async (resolve, reject) => {
        try {
          await doSubmit(dataModel, e);
          if (reset) resetForm();
          return resolve();
        } catch (err) {
          return reject(err);
        }
      });
    }
    try {
      setIsBusy(true);
      await submission();
    } catch (err) {
      console.log(err);
    }
    setIsBusy(false);
  };
  const handleChange = ({ field, value }) => {
    const data = { ...dataModel };
    data[field] = value;
    setDataModel(data);
    validateProperty(field, value);
  };
  const resetForm = () => {
    setDataModel(initdataModel);
    setValidationErrors({});
  };
  const _isObject = (object) => object !== null && typeof object === "object";
  const _deepEqual = (referenceObject, testObject) => {
    const referenceKeys = Object.keys(referenceObject);
    const testKeys = Object.keys(testObject);
    if (referenceKeys.length !== testKeys.length) return false;
    for (const key of referenceKeys) {
      const referenceValue = referenceObject[key];
      const testValue = testObject[key];
      const hasProperties = _isObject(referenceValue);
      if (!hasProperties && referenceValue !== testValue) return false;
      if (hasProperties && !_deepEqual(referenceValue, testValue)) return false;
    }
    return true;
  };
  const hasUnsavedData = () => !_deepEqual(initdataModel, dataModel);
  const isFormValid = () => Object.keys(validationErrors).length === 0;
  React.useEffect(() => {
    console.log("datamodel", dataModel);
    console.log("validation error:", validationErrors);
  }, [dataModel, validationErrors]);
  /** validation runner is required the first time the form renders. */
  React.useEffect(() => {
    // (async function () {
    //   const errors = await validate();
    //   if (errors) return setValidationErrors(errors);
    // })();
  }, []);
  function initiateDataModel(dataModel) {
    setDataModel(dataModel);
  }
  return {
    dataModel,
    validationErrors,
    isBusy,
    handleChange,
    handleSubmit,
    initiateDataModel,
    isFormValid,
    resetForm,
    hasUnsavedData,
  };
}

function useDualStateController() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return {
    isOpen,
    toggle,
  };
}

/**
 * CAUTION: Changing the object strucuture will break the UI if not handled properly.
 * Consult with seniors before making changes.
 */
const defaultPaginationState = {
  currentPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
  size: 10,
  totalPages: 0,
  totalResults: 0,
};
function usePagination() {
  const [pagination, setPagination] = React.useState(defaultPaginationState);
  function updatePaginaion(pagination = defaultPaginationState) {
    if (typeof pagination.currentPage !== "number")
      throw new Error("currentPage must be a number");
    if (typeof pagination.hasNextPage !== "boolean")
      throw new Error("currentPage must be a number");
    if (typeof pagination.hasPrevPage !== "boolean")
      throw new Error("hasPrevPage must be a boolean");
    if (typeof pagination.nextPage !== "number" && pagination.nextPage !== null)
      throw new Error("nextPage must be a number or null");
    if (typeof pagination.prevPage !== "number" && pagination.prevPage !== null)
      throw new Error("prevPage must be a number or null");
    if (typeof pagination.size !== "number")
      throw new Error("size must be a number");
    if (typeof pagination.totalPages !== "number")
      throw new Error("totalPages must be a number");
    if (typeof pagination.totalResults !== "number")
      throw new Error("totalResults must be a number");
    setPagination(pagination);
  }
  return {
    pagination,
    updatePaginaion,
  };
}

function useProcessing(initializers) {
  let initState = {};
  initializers.forEach((process) => {
    initState[process.action] = { status: process.status, id: null };
  });
  let [processing, setProcessing] = React.useState(initState);
  let dispatch = (state) => {
    setProcessing((currentProcesses) => {
      let key = Object.keys(state)[0];
      let value = Object.values(state)[0];
      let updatedProcesses = { ...currentProcesses };
      updatedProcesses[key] = value;
      return updatedProcesses;
    });
  };
  return {
    processing,
    dispatch,
  };
}

const SUCCESS_TIMEOUT = 2500;
function useClipboard() {
  const [copySuccess, setCopySuccess] = React.useState(false);
  const contentElementReference = React.useRef(null);
  async function copyFormatedToClipboard() {
    if (contentElementReference.current) {
      /** create a range to select contents that will be copied. */
      // const range = document.createRange();
      // range.selectNodeContents(contentElementReference.current);
      /** copy the contents to clipboard. */
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "text/html": new Blob(
                [contentElementReference.current.innerHTML],
                {
                  type: "text/html",
                }
              ),
            }),
          ]);
          setCopySuccess(true);
          console.log("Contentns copied.");
        } catch (err) {
          console.log("Error copying to clipboard.");
          console.log(err);
        }
        setTimeout(() => setCopySuccess(false), SUCCESS_TIMEOUT);
      }
    }
  }
  async function copyPlainTextToClipBoard(value, cb = () => {}) {
    if (navigator.clipboard) {
      setCopySuccess(true);
      await navigator.clipboard.writeText(value);
      setTimeout(() => setCopySuccess(false), SUCCESS_TIMEOUT);
    }
  }
  return {
    contentElementReference,
    copySuccess,
    copyFormatedToClipboard,
    copyPlainTextToClipBoard,
  };
}

exports.useBuildQueryString = useBuildQueryString;
exports.useClipboard = useClipboard;
exports.useDualStateController = useDualStateController;
exports.useForm = useForm;
exports.usePaginationState = usePagination;
exports.useProcessing = useProcessing;
//# sourceMappingURL=index.cjs.js.map