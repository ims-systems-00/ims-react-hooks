'use strict';

var React = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var DEFAULT_PAGE_SIZE = 10;
function useBuildQueryString(initial) {
    var _a;
    var pageKey = "page";
    var pageSizeKey = "size";
    if (initial && initial.pagination && isObject(initial.pagination)) {
        var keys = Object.keys(initial.pagination);
        if (keys[0])
            pageKey = keys[0];
        if (keys[1])
            pageSizeKey = keys[1];
    }
    var initialQueryState = {
        required: _buildDefault(initial).required,
        filter: _buildDefault(initial).filter,
        search: _buildDefault(initial).search,
        pagination: _buildDefault(initial).pagination,
    };
    var initialToolState = {
        filter: (initial && initial.filter) || {},
        required: (initial && initial.required) || {},
        search: (initial && initial.search) || {},
        pagination: (_a = {},
            _a[pageKey] = (initial && initial.pagination && initial.pagination[pageKey]) || 1,
            _a[pageSizeKey] = (initial && initial.pagination && initial.pagination[pageSizeKey]) ||
                DEFAULT_PAGE_SIZE,
            _a),
    };
    var _b = React.useState(initialQueryState), query = _b[0], setQuery = _b[1];
    var _c = React.useState(initialToolState), toolState = _c[0], setToolState = _c[1];
    function fullReset() {
        setQuery(initialQueryState);
        setToolState(initialToolState);
    }
    function _buildDefault(initial) {
        var _a;
        return {
            required: initial && initial.required
                ? objectToQuery(initial.required.value)
                : "",
            filter: initial && initial.filter ? objectToQuery(initial.filter.value) : "",
            search: initial && initial.search ? objectToQuery(initial.search.value) : "",
            pagination: objectToQuery((_a = {},
                _a[pageKey] = (initial && initial.pagination && initial.pagination[pageKey]) || 1,
                _a[pageSizeKey] = (initial && initial.pagination && initial.pagination[pageSizeKey]) ||
                    DEFAULT_PAGE_SIZE,
                _a)),
        };
    }
    function isObject(object) {
        return object !== null && typeof object === "object";
    }
    function objectToQuery(object) {
        if (!object)
            return "";
        var queryBucket = [];
        function dig(obj, build) {
            if (build === void 0) { build = ""; }
            if (!isObject(obj))
                return queryBucket.push(build + "=".concat(encodeURIComponent(obj)));
            var keys = Object.keys(obj);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (isObject(obj)) {
                    var attach = !build
                        ? "".concat(key)
                        : !Array.isArray(obj)
                            ? "[".concat(key, "]")
                            : "[]";
                    dig(obj[key], build + attach);
                }
            }
            return obj;
        }
        dig(object);
        return queryBucket.join("&");
    }
    var formatString = function (str) { return (str ? "&" + str : str); };
    // getQuery function will soon be deprecated. it's renamed to getQueryString
    function getQuery() {
        var processedString = "";
        var keys = Object.keys(query);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
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
        var _a;
        setQuery(function (prevState) {
            var _a;
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { required: objectToQuery(requiredQuery.value), pagination: objectToQuery((_a = {},
                    _a[pageKey] = 1,
                    _a[pageSizeKey] = toolState === null || toolState === void 0 ? void 0 : toolState.pagination[pageSizeKey],
                    _a)) });
        });
        _updateRequired(requiredQuery);
        _updatePagination((_a = {}, _a[pageKey] = 1, _a[pageSizeKey] = DEFAULT_PAGE_SIZE, _a));
    }
    function handleFilter(filterQuery) {
        var _a;
        setQuery(function (prevState) {
            var _a;
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { filter: objectToQuery(filterQuery.value), pagination: objectToQuery((_a = {},
                    _a[pageKey] = 1,
                    _a[pageSizeKey] = toolState === null || toolState === void 0 ? void 0 : toolState.pagination[pageSizeKey],
                    _a)) });
        });
        _updateFilter(filterQuery);
        _updatePagination((_a = {},
            _a[pageKey] = 1,
            _a[pageSizeKey] = toolState === null || toolState === void 0 ? void 0 : toolState.pagination[pageSizeKey],
            _a));
    }
    function handlePagination(page, size) {
        var _a;
        if (page === void 0) { page = 1; }
        setQuery(function (prevState) {
            var _a;
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { pagination: objectToQuery((_a = {},
                    _a[pageKey] = page,
                    _a[pageSizeKey] = size || (prevState === null || prevState === void 0 ? void 0 : prevState.pagination[pageSizeKey]) || DEFAULT_PAGE_SIZE,
                    _a)) });
        });
        _updatePagination((_a = {},
            _a[pageKey] = page,
            _a[pageSizeKey] = size,
            _a));
    }
    function handleSearch(searchQuery) {
        var _a;
        setQuery(function (prevState) {
            var _a;
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { search: objectToQuery(searchQuery.value), pagination: objectToQuery((_a = {},
                    _a[pageKey] = 1,
                    _a[pageSizeKey] = toolState === null || toolState === void 0 ? void 0 : toolState.pagination[pageSizeKey],
                    _a)) });
        });
        _updateSearch(searchQuery);
        _updatePagination((_a = {},
            _a[pageKey] = 1,
            _a[pageSizeKey] = toolState === null || toolState === void 0 ? void 0 : toolState.pagination[pageSizeKey],
            _a));
    }
    function _updatePagination(pagination) {
        setToolState(function (prevState) {
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { pagination: pagination });
        });
    }
    function _updateFilter(filter) {
        setToolState(function (prevState) {
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { filter: filter });
        });
    }
    function _updateRequired(required) {
        setToolState(function (prevState) {
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { required: required });
        });
    }
    function _updateSearch(search) {
        setToolState(function (prevState) {
            /**
             * I'm using JSON to avoid object mutation, this is used only for performence.
             * Date, function, Infinity , Maps , Blobs are not cloned. So be mindfull of using,
             * basic and simple objects in state.
             */
            return __assign(__assign({}, JSON.parse(JSON.stringify(prevState))), { search: search });
        });
    }
    return {
        query: query,
        toolState: toolState,
        fullReset: fullReset,
        getQuery: getQuery,
        getQueryString: getQueryString,
        handleFilter: handleFilter,
        handlePagination: handlePagination,
        handleSearch: handleSearch,
        handleRequired: handleRequired,
    };
}

function useDualStateController() {
    var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var toggle = function () {
        setIsOpen(function (isOpen) { return !isOpen; });
    };
    return {
        isOpen: isOpen,
        toggle: toggle,
    };
}

/**
 * CAUTION: Changing the object strucuture will break the UI if not handled properly.
 * Consult with seniors before making changes.
 */
var defaultPaginationState = {
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
    var _a = React.useState(defaultPaginationState), pagination = _a[0], setPagination = _a[1];
    function updatePaginaion(pagination) {
        if (pagination === void 0) { pagination = defaultPaginationState; }
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
        pagination: pagination,
        updatePaginaion: updatePaginaion,
    };
}

function useProcessing(initializers) {
    var initState = {};
    initializers.forEach(function (process) {
        initState[process.action] = { status: process.status, id: null };
    });
    var _a = React.useState(initState), processing = _a[0], setProcessing = _a[1];
    var dispatch = function (state) {
        setProcessing(function (currentProcesses) {
            var key = Object.keys(state)[0];
            var value = Object.values(state)[0];
            var updatedProcesses = __assign({}, currentProcesses);
            updatedProcesses[key] = value;
            return updatedProcesses;
        });
    };
    return {
        processing: processing,
        dispatch: dispatch,
    };
}

var SUCCESS_TIMEOUT = 2500;
function useClipboard() {
    var _a = React.useState(false), copySuccess = _a[0], setCopySuccess = _a[1];
    var contentElementReference = React.useRef(null);
    function copyFormatedToClipboard() {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!contentElementReference.current) return [3 /*break*/, 5];
                        if (!navigator.clipboard) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.clipboard.write([
                                new ClipboardItem({
                                    "text/html": new Blob([contentElementReference.current.innerHTML], { type: "text/html" }),
                                }),
                            ])];
                    case 2:
                        _a.sent();
                        setCopySuccess(true);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Error copying to clipboard.", err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        setTimeout(function () { return setCopySuccess(false); }, SUCCESS_TIMEOUT);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function copyPlainTextToClipboard(value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!navigator.clipboard) return [3 /*break*/, 2];
                        setCopySuccess(true);
                        return [4 /*yield*/, navigator.clipboard.writeText(value)];
                    case 1:
                        _a.sent();
                        setTimeout(function () { return setCopySuccess(false); }, SUCCESS_TIMEOUT);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    return {
        contentElementReference: contentElementReference,
        copySuccess: copySuccess,
        copyFormatedToClipboard: copyFormatedToClipboard,
        copyPlainTextToClipboard: copyPlainTextToClipboard,
    };
}

exports.useBuildQueryString = useBuildQueryString;
exports.useClipboard = useClipboard;
exports.useDualStateController = useDualStateController;
exports.usePaginationState = usePagination;
exports.useProcessing = useProcessing;
//# sourceMappingURL=index.cjs.js.map
