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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var material_1 = require("@mui/material");
var axios_1 = require("axios");
var router_1 = require("next/router");
var react_1 = require("react");
var Create_1 = require("./Create");
var rich_markdown_editor_1 = require("rich-markdown-editor");
var PostsContext_1 = require("../../context/PostsContext");
var AnswersContext_1 = require("../../context/AnswersContext");
function Questions() {
    var _this = this;
    var _a = react_1.useReducer(function (x) { return x + 1; }, 0), forceUpdate = _a[1];
    var allPosts = react_1.useContext(PostsContext_1.PostsContext);
    var allAnswers = react_1.useContext(AnswersContext_1.AnswersContext);
    var _b = react_1.useState(false), model = _b[0], setModel = _b[1];
    var _c = react_1.useState(""), name = _c[0], setName = _c[1];
    var _d = react_1.useState(false), questionsModal = _d[0], setQuestionsModal = _d[1];
    var _e = react_1.useState(false), confirmModal = _e[0], setConfirmModal = _e[1];
    var _f = react_1.useState(false), editModal = _f[0], setEditModal = _f[1];
    var _g = react_1.useState([]), id = _g[0], setId = _g[1];
    var _h = react_1.useState([]), data = _h[0], setData = _h[1];
    var _j = react_1.useState([{}]), mcq = _j[0], setMcq = _j[1];
    var _k = react_1.useState(""), update = _k[0], setUpdate = _k[1];
    var _l = react_1.useState([]), answers = _l[0], setAnswers = _l[1];
    var _m = react_1.useState([]), currentAnswers = _m[0], setCurrentAnswers = _m[1];
    var _o = react_1.useState(new Array(allPosts.length).fill(true)), open = _o[0], setOpen = _o[1];
    react_1.useEffect(function () {
        setAnswers(allAnswers);
    }, [allAnswers]);
    react_1.useEffect(function () {
        setData(allPosts);
        console.log(data);
    }, [allPosts]);
    var mcqData = function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setMcq(data);
            return [2 /*return*/];
        });
    }); };
    var handleClick = function (id) {
        console.log(id);
        var dat = answers.filter(function (answer) { return answer.questionId === id; });
        setCurrentAnswers(dat);
        console.log(dat);
    };
    var handleDelete = function () {
        axios_1["default"].get("/" + process.env.NEXT_PUBLIC_BACKEND_URL + "\n$/posts/delete/" + id.pop()).then(function () {
            router_1["default"].reload();
        });
    };
    var handleQuestion = function (id) {
        var arr = data.find(function (dat) { return dat._id === id; });
        // console.log( arr )
        return arr;
    };
    var handleValidate = function (j, key) {
        var array = currentAnswers;
        if (key === "star") {
            array[j].star = true;
        }
        if (key === "validate") {
            array[j].validate = true;
        }
        setCurrentAnswers(array);
        console.log(currentAnswers);
        axios_1["default"].post("/" + process.env.NEXT_PUBLIC_BACKEND_URL + "\n$/posts/answers/validate/" + currentAnswers[j]._id, currentAnswers[j]);
        forceUpdate();
    };
    var handleSwitch = function (e, i) {
        e.stopPropagation();
        var arr = data;
        arr[i].open = e.target.checked;
        setData(arr);
        console.log(data);
        axios_1["default"].post("/" + process.env.NEXT_PUBLIC_BACKEND_URL + "\n$/posts/update/" + data[i]._id, data[i]);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Container, null,
            react_1["default"].createElement("h3", { className: "m-4" }, " Admin Page ")),
        react_1["default"].createElement(material_1.Container, { className: "py-4 rounded shadow-lg bg-purple_heart-200" },
            react_1["default"].createElement("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4" }, data.map(function (dat, i) { return (react_1["default"].createElement(material_1.Box, { onClick: function () { handleClick(dat._id); }, key: i, className: "bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-500 p-2 rounded relative" },
                react_1["default"].createElement("h4", null,
                    " ",
                    dat.name,
                    " "),
                react_1["default"].createElement(material_1.Switch, { checked: dat.open, onChange: function (e) { return handleSwitch(e, i); } }),
                react_1["default"].createElement("div", { className: "p-2 w-6 flex justify-center items-center h-6 cursor-pointer bg-purple-800 hover:bg-red-600 rounded absolute top-2 right-2", onClick: function () {
                        setConfirmModal(true);
                        setId(function (arr) { return __spreadArrays(arr, [dat._id]); });
                    } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                react_1["default"].createElement("div", { className: "flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-green-500 hover:bg-green-600 rounded absolute top-2 right-10", onClick: function () {
                        setEditModal(true);
                        setUpdate(dat._id);
                    } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faPencil })))); })),
            react_1["default"].createElement(material_1.Button, { className: "mt-4", onClick: function () { setQuestionsModal(true); }, variant: "contained" }, " Create New Quiz ")),
        react_1["default"].createElement(material_1.Container, { className: "mt-4" }, currentAnswers.length > 0 && react_1["default"].createElement(material_1.Box, null, currentAnswers.map(function (ans, j) { return (react_1["default"].createElement("div", { key: j, className: "py-4" },
            " ",
            react_1["default"].createElement(material_1.Accordion, { color: "primary", className: "bg-purple_heart-50" },
                react_1["default"].createElement(material_1.AccordionSummary, { color: "primary", className: "rounded text-purple-900", expandIcon: react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faChevronDown }) },
                    " ",
                    ans.userName,
                    " "),
                react_1["default"].createElement(material_1.AccordionDetails, null,
                    " ",
                    react_1["default"].createElement(material_1.Box, null, handleQuestion(ans.questionId).questions.map(function (quest, k) { return (react_1["default"].createElement("div", { key: k },
                        react_1["default"].createElement("p", { className: "font-bold mt-8" },
                            " ",
                            quest,
                            " "),
                        react_1["default"].createElement("div", { className: "p-2 px-4 mt-4 bg-white rounded" },
                            react_1["default"].createElement(rich_markdown_editor_1["default"], { readOnly: true, value: ans.answers[k] }, " ")),
                        react_1["default"].createElement(material_1.Divider, null))); })),
                    react_1["default"].createElement("div", { className: "flex items-center justify-around" },
                        react_1["default"].createElement(material_1.Button, { className: "mt-4 text-blue-500", onClick: function () { handleValidate(j, "validate"); } }, " Validate "),
                        react_1["default"].createElement(material_1.Button, { className: "mt-4 text-yellow-500", onClick: function () { handleValidate(j, "star"); } }, " Star ")))),
            " ")); }))),
        react_1["default"].createElement(material_1.Container, { className: "my-4" }, currentAnswers.length > 0 && react_1["default"].createElement(material_1.Box, null,
            react_1["default"].createElement(material_1.Divider, { className: "bg-purple_heart-500 rounded-full my-4" }),
            react_1["default"].createElement("h3", { className: "my-4" }, " Potential Winners \u26A1 "),
            currentAnswers.map(function (ans, j) { return (react_1["default"].createElement("div", { key: j }, ans.star && react_1["default"].createElement(material_1.Box, { className: "bg-purple_heart-100 rounded p-2" },
                react_1["default"].createElement("h4", { className: "" },
                    " ",
                    ans.userName,
                    " "),
                react_1["default"].createElement("p", { onClick: function () { return window.location.href = "mailto:" + ans.userEmail + "?body=You have potential to win !"; }, className: "text-blue-500 cursor-pointer hover:underline" },
                    " ",
                    ans.userEmail,
                    " "),
                react_1["default"].createElement("p", { onClick: function () { return window.location.href = "tel:" + ans.userPhone; }, className: "text-blue-500 cursor-pointer hover:underline" },
                    " ",
                    ans.userPhone,
                    " ")))); }),
            " ")),
        react_1["default"].createElement(material_1.Container, { className: "my-4" }, currentAnswers.length > 0 && react_1["default"].createElement(material_1.Box, null,
            react_1["default"].createElement(material_1.Divider, { className: "bg-purple_heart-500 rounded-full my-4" }),
            react_1["default"].createElement("h3", { className: "my-4" }, "  Winners \uD83D\uDD25 "),
            currentAnswers.map(function (ans, j) { return (react_1["default"].createElement("div", { key: j }, ans.validate && react_1["default"].createElement(material_1.Box, { className: "bg-purple_heart-100 rounded p-2" },
                react_1["default"].createElement("h4", { className: "" },
                    " ",
                    ans.userName,
                    " "),
                react_1["default"].createElement("p", { onClick: function () { return window.location.href = "mailto:" + ans.userEmail + "?body=You have potential to win !"; }, className: "text-blue-500 cursor-pointer hover:underline" },
                    " ",
                    ans.userEmail,
                    " "),
                react_1["default"].createElement("p", { onClick: function () { return window.location.href = "tel:" + ans.userPhone; }, className: "text-blue-500 cursor-pointer hover:underline" },
                    " ",
                    ans.userPhone,
                    " ")))); }),
            " ")),
        react_1["default"].createElement(material_1.Modal, { className: "flex justify-center items-center p-4", open: questionsModal, onClose: function () { setQuestionsModal(false); }, style: { overflow: 'scroll' } },
            react_1["default"].createElement(material_1.Box, { className: "bg-white px-4 md:px-16 m-4 md:m-auto md:w-4/5 lg:w-3/5 py-8 rounded relative flex justify-center items-center flex-col" },
                react_1["default"].createElement("div", { className: "flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2", onClick: function () { return setQuestionsModal(false); } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                react_1["default"].createElement(Create_1["default"], null))),
        react_1["default"].createElement(material_1.Modal, { style: { overflow: 'scroll' }, className: "p-4 flex justify-center items-center", open: editModal, onClose: function () { setEditModal(false); } },
            react_1["default"].createElement(material_1.Box, { className: "bg-white px-4 md:px-16 m-4 md:m-auto md:w-4/5 lg:w-3/5 py-8 rounded relative flex justify-center items-center flex-col" },
                react_1["default"].createElement("div", { className: "flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2", onClick: function () { return setEditModal(false); } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                react_1["default"].createElement(Create_1["default"], { id: update }))),
        react_1["default"].createElement(material_1.Modal, { className: "flex justify-center items-center", open: confirmModal, onClose: function () { setConfirmModal(false); } },
            react_1["default"].createElement(material_1.Box, { className: "bg-white px-16 py-8 rounded relative flex justify-center items-center flex-col" },
                react_1["default"].createElement("div", { className: "flex justify-center items-center p-2 w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-2 right-2", onClick: function () { return setConfirmModal(false); } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                react_1["default"].createElement("h4", null, " Are you sure to delele the post ? "),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(material_1.Button, { onClick: function () { handleDelete(); }, className: "text-yellow-500" }, " Yes "),
                    react_1["default"].createElement(material_1.Button, { onClick: function () { setConfirmModal(false); }, className: "text-red-500" }, " No ")))),
        react_1["default"].createElement(material_1.Container, null)));
}
exports["default"] = Questions;
