"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var React = require("react");
var material_1 = require("@mui/material");
var Menu_1 = require("@mui/icons-material/Menu");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var link_1 = require("next/link");
var react_1 = require("react");
var axios_1 = require("axios");
var UserContext_1 = require("../context/UserContext");
var router_1 = require("next/router");
var js_cookie_1 = require("js-cookie");
function Navbar(_a) {
    var _this = this;
    var loginModel = _a.loginModel, setloginmodel = _a.setloginmodel;
    var currentUser = react_1.useContext(UserContext_1.UserContext);
    var stratergy = currentUser.stratergy;
    var _b = React.useState(false), drawer = _b[0], setDrawer = _b[1];
    var _c = React.useState(false), modal = _c[0], setModal = _c[1];
    var _d = React.useState(false), createModal = _d[0], setCreateModal = _d[1];
    var _e = React.useState(false), forgotPassword = _e[0], setForgotPassword = _e[1];
    var _f = React.useState(false), log = _f[0], setLog = _f[1];
    var _g = react_1.useState({
        name: "",
        rollNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
        profilePicture: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDM4OS4zNCAzODkuMzQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4OS4zNCAzODkuMzQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxRUE2QzY7IiBkPSJNMzQ3LjQxNSwzMzAuM2MwLDAuMDQsMCwwLjA4LDAsMC4xM2MtNDAuMzcsMzYuNjEtOTMuOTYsNTguOTEtMTUyLjc0LDU4LjkxDQoJYy01OC43OSwwLTExMi4zOC0yMi4zLTE1Mi43NS01OC45MWMwLTAuMDUsMC0wLjA5LDAtMC4xM2MwLTYwLjg5LDM1LjYzLTExMy40NSw4Ny4xNy0xMzcuOThjMTkuMzcsMTkuMzIsNDIuMDUsMjkuNzMsNjUuNTgsMjkuNzMNCgljMjMuNTQsMCw0Ni4yMS0xMC40MSw2NS41OS0yOS43M0MzMTEuODA1LDIxNi44NSwzNDcuNDE1LDI2OS40MSwzNDcuNDE1LDMzMC4zeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZDRDA5RjsiIGQ9Ik0xOTQuNjc1LDBjNDYuNjYsMCw4NC40OSwzNy44Miw4NC40OSw4NC40OGMwLDQ2LjY3LTM3LjgzLDExMC40OS04NC40OSwxMTAuNDkNCglzLTg0LjQ5LTYzLjgyLTg0LjQ5LTExMC40OUMxMTAuMTg1LDM3LjgyLDE0OC4wMTUsMCwxOTQuNjc1LDB6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
    }), newUser = _g[0], setNewUser = _g[1];
    React.useEffect(function () {
        if (!currentUser.data) {
            setLog(true);
        }
    }, [currentUser]);
    var _h = react_1.useState({
        email: "",
        password: ""
    }), user = _h[0], setUser = _h[1];
    var _j = react_1.useState({}), email = _j[0], setEmail = _j[1];
    var onClickHandler = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setNewUser(__assign(__assign({}, newUser), (_a = {}, _a[name] = value, _a)));
    };
    var onClickHandler2 = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setUser(__assign(__assign({}, user), (_a = {}, _a[name] = value, _a)));
    };
    var onClickHandlerPassword = function (e) {
        setEmail({ email: e });
        console.log(email);
    };
    var uploadProfile = function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var profilePicture = e.target.result.toString();
            console.log(profilePicture);
            setNewUser(__assign(__assign({}, newUser), { profilePicture: profilePicture }));
        };
        reader.readAsDataURL(file);
    };
    var createUser = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/local/signin", newUser).then(function () { return router_1["default"].reload(); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var loginUser = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/local/token-login`, user ).then( () => router.reload() )
                return [4 /*yield*/, axios_1["default"].post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/local/token-login", user).then(function (res) {
                        console.log(res.data);
                        localStorage.setItem('local_user', JSON.stringify(res.data));
                        router_1["default"].reload();
                    })];
                case 1:
                    // await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/local/token-login`, user ).then( () => router.reload() )
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var resetPassword = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/local/reset", email).then(function (res) { return alert("Success ! Please check Your Mail !"); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var login = function () {
        return (React.createElement("div", null,
            React.createElement(material_1.Button, { onClick: function () { return setModal(true); }, color: "inherit" }, "Login"),
            React.createElement(material_1.Modal, { className: "flex justify-center items-center p-4", open: modal, onClose: function () { return setModal(false); } },
                React.createElement(material_1.Box, { sx: {
                        '& .MuiTextField-root': { my: 1 }
                    }, className: "relative bg-white py-12 px-4 md:px-16 rounded" },
                    React.createElement("h3", { className: "mb-4" }, " Login with Existing Account "),
                    React.createElement("div", { className: "p-2 flex justify-center items-center w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2", onClick: function () { return setModal(false); } },
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                    React.createElement(material_1.TextField, { color: "primary", name: "email", onBlur: onClickHandler2, className: "w-full my-4", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEnvelope })))
                        }, label: "Email", required: true, type: "email", variant: "outlined" }),
                    React.createElement(material_1.TextField, { color: "primary", name: "password", onBlur: onClickHandler2, className: "w-full", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faLock })))
                        }, label: "Password", required: true, type: "password", variant: "outlined" }),
                    React.createElement(material_1.Button, { variant: "contained", onClick: function () { loginUser(); }, className: "block w-full mx-auto p-1 my-4 mt-8" }, " Login"),
                    React.createElement("div", { className: "w-full flex justify-between my-4" },
                        React.createElement("p", { onClick: function () { setModal(false); setForgotPassword(true); }, className: "cursor-pointer text-sm text-red-800" }, " Forgot Password "),
                        React.createElement("p", { onClick: function () { setModal(false); setCreateModal(true); }, className: "cursor-pointer text-sm text-blue-800" }, " Create Account ")))),
            React.createElement(material_1.Modal, { className: "flex justify-center items-center p-4", open: forgotPassword, onClose: function () { return setForgotPassword(false); } },
                React.createElement(material_1.Box, { sx: {
                        '& .MuiTextField-root': { my: 1 }
                    }, className: "relative bg-white py-12 px-4 md:px-16 rounded" },
                    React.createElement("div", { className: "p-2 flex justify-center items-centerw-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2", onClick: function () { return setForgotPassword(false); } },
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                    React.createElement("p", { className: "text-gray-500" }, " Enter the email registered with this account to get the password reset link"),
                    React.createElement(material_1.TextField, { color: "primary", onBlur: function (e) { return onClickHandlerPassword(e.target.value); }, name: "name", className: "w-full my-4", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEnvelope })))
                        }, label: "email", required: true, type: "email", variant: "outlined" }),
                    React.createElement(material_1.Button, { onClick: function () { resetPassword(); }, className: "block w-full", variant: "contained" }, " Send Reset Link "))),
            React.createElement(material_1.Modal, { className: "flex justify-center items-center p-4", open: createModal, onClose: function () { return setModal(false); } },
                React.createElement(material_1.Box, { sx: {
                        '& .MuiTextField-root': { my: 1 }
                    }, className: "relative bg-white py-12 px-4 md:px-16 rounded" },
                    React.createElement("h3", null, " Create New Account "),
                    React.createElement("div", { className: "flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2", onClick: function () { return setCreateModal(false); } },
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                    React.createElement("div", { className: "my-4 flex" },
                        React.createElement("img", { src: newUser.profilePicture, className: "w-16 h-16 rounded-full", alt: "" }),
                        React.createElement(material_1.Button, { className: "ml-4 relative cursor-pointer" },
                            " Choose Profile Picture",
                            React.createElement("input", { type: "file", onChange: function (e) { uploadProfile(e); }, className: "absolute w-full h-full opacity-0" }))),
                    React.createElement(material_1.TextField, { color: "primary", onBlur: onClickHandler, name: "name", className: "w-full my-4", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser })))
                        }, label: "Name", required: true, type: "text", variant: "outlined" }),
                    React.createElement(material_1.TextField, { color: "primary", onBlur: onClickHandler, name: "phoneNumber", className: "w-full my-4", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPhone })))
                        }, label: "Phone Number", required: true, type: "text", variant: "outlined" }),
                    React.createElement(material_1.TextField, { color: "primary", onBlur: onClickHandler, name: "email", className: "w-full", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEnvelope })))
                        }, label: "Email", required: true, type: "email", variant: "outlined" }),
                    React.createElement(material_1.TextField, { color: "primary", className: "w-full mt-4", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faLock })))
                        }, label: "Password", required: true, type: "password", variant: "outlined" }),
                    React.createElement(material_1.TextField, { color: "primary", onBlur: onClickHandler, name: "password", className: "w-full mt-4", InputProps: {
                            startAdornment: (React.createElement(material_1.InputAdornment, { position: "start" },
                                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faLock })))
                        }, label: "Confirm Password", required: true, type: "password", variant: "outlined" }),
                    React.createElement(material_1.Button, { onClick: function () { return createUser(); }, variant: "contained", className: "block w-full mx-auto p-1 my-4 mt-8" }, " Create Account")))));
    };
    var logout = function () {
        var logoutUser = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(currentUser.stratergy === 'google')) return [3 /*break*/, 2];
                        js_cookie_1["default"].remove("google_acc", {
                            path: "/",
                            domain: "http://step-up-backend.herokuapp.com/"
                        });
                        return [4 /*yield*/, axios_1["default"].get(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/" + stratergy + "/logout").then(function (res) {
                                console.log(res);
                                // router.reload()
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (currentUser.stratergy === 'local') {
                            localStorage.removeItem('local_user');
                            router_1["default"].reload();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        return (React.createElement(React.Fragment, null,
            React.createElement(material_1.Button, { onClick: function () { logoutUser(); }, color: "inherit" }, "Logout")));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(material_1.Box, { className: "mb-20", sx: { flexGrow: 1 } },
            React.createElement(material_1.AppBar, null,
                React.createElement(material_1.Toolbar, null,
                    React.createElement(material_1.IconButton, { size: "large", edge: "start", color: "inherit", "aria-label": "menu", sx: { mr: 2 }, onClick: function () { setDrawer(true); } },
                        React.createElement(Menu_1["default"], null)),
                    React.createElement(material_1.Typography, { onClick: function () { router_1["default"].push("/"); }, variant: "h6", component: "div", sx: { flexGrow: 1 } }, "StepUp Quiz"),
                    log ? logout() : login()))),
        React.createElement(material_1.Box, null,
            React.createElement(material_1.Drawer, { anchor: "left", open: drawer, onClose: function () { return setDrawer(false); } },
                React.createElement(material_1.List, { sx: { width: "100%", padding: "1rem" } },
                    React.createElement(link_1["default"], { href: "/Profile" },
                        React.createElement(material_1.ListItem, { className: "flex items-center justify-center", button: true },
                            React.createElement(material_1.ListItemIcon, null,
                                React.createElement("img", { className: "h-8 rounded-full object-contain", src: currentUser.profilePicture, alt: "" })),
                            React.createElement(material_1.ListItemText, null, " My Profile "))),
                    React.createElement(link_1["default"], { href: "/" },
                        React.createElement(material_1.ListItem, { className: "flex items-center justify-center", button: true },
                            React.createElement(material_1.ListItemText, null, " Home "))),
                    React.createElement(link_1["default"], { href: "/Winners" },
                        React.createElement(material_1.ListItem, { className: "flex items-center justify-center", button: true },
                            React.createElement(material_1.ListItemText, null, " Winners "))),
                    currentUser.isAdmin && (React.createElement(link_1["default"], { href: "/Admin" },
                        React.createElement(material_1.ListItem, { className: "flex items-center justify-center", button: true },
                            React.createElement(material_1.ListItemText, null, " Admin ")))))))));
}
exports["default"] = Navbar;
