"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
exports.__esModule = true;
exports.UserProvider = exports.UserContext = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
var jwt_decode_1 = require("jwt-decode");
var posts_1 = require("../assets/images/posts");
exports.UserContext = react_1.createContext({});
exports.UserProvider = function (props) {
    var _a = react_1.useState({
        name: "",
        rollNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
        isAdmin: false,
        profilePicture: posts_1.postsImage,
        data: "unauthenticated"
    }), user = _a[0], setuser = _a[1];
    react_1.useEffect(function () {
        var getuser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var localToken, user_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localToken = localStorage.getItem('local_user');
                        if (localToken) {
                            user_1 = jwt_decode_1["default"](JSON.parse(localToken).access_token);
                            setuser(user_1);
                            if (user_1.data === 'wrong password') {
                                alert('Wrong Password Please Try Again !');
                            }
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, axios_1["default"].get(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google/users", {
                                withCredentials: true
                            }).then(function (res) {
                                if (Object.keys(res.data).length > 0) {
                                    setuser(res.data);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        getuser();
    }, []);
    return (react_1["default"].createElement(exports.UserContext.Provider, { value: user }, props.children));
};
//dist
