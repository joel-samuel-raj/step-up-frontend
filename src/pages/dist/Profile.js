"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var Navbar_1 = require("../components/Navbar");
var UserContext_1 = require("../context/UserContext");
var Questions_1 = require("../components/Postman/Questions");
var material_1 = require("@mui/material");
var AnswersContext_1 = require("../context/AnswersContext");
var Profile = function () {
    var user = react_1.useContext(UserContext_1.UserContext);
    var allAnswers = react_1.useContext(AnswersContext_1.AnswersContext).allAnswers;
    var admin = function () {
        if (user.isAdmin) {
            return react_1["default"].createElement(Questions_1["default"], null);
        }
    };
    var answers = allAnswers.filter(function (answer) { return answer.userId === user._id; });
    var _a = react_1.useState([{}]), ans = _a[0], setAns = _a[1];
    react_1.useEffect(function () {
        var arr = allAnswers.filter(function (answer) { return answer.userId === user._id; });
        console.log(arr);
        setAns(function (prev) { return (__spreadArrays(arr)); });
        console.log(ans);
    }, [allAnswers]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Navbar_1["default"], null),
        ans.length > 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            " ",
            ans[0].question && (react_1["default"].createElement(material_1.Container, { className: "my-6 py-6 border-b-2 border-purple-900 rounded" },
                react_1["default"].createElement("h3", null, " All Responses \uD83D\uDCDA "),
                ans.map(function (answer, i) { return (react_1["default"].createElement("div", { key: i },
                    react_1["default"].createElement("p", null,
                        " ",
                        '👉🏼' + answer.question.name,
                        " "))); }))),
            ans[0].question && (react_1["default"].createElement(material_1.Container, { className: "my-6 py-6 border-b-2 border-purple-900 rounded" },
                react_1["default"].createElement("h3", null, " Watch List \u2B50 "),
                ans.map(function (answer, i) {
                    if (answer.star) {
                        return (react_1["default"].createElement("div", { key: i },
                            react_1["default"].createElement("p", null,
                                " ",
                                '👉🏼' + answer.question.name,
                                " ")));
                    }
                }))),
            ans[0].question && (react_1["default"].createElement(material_1.Container, { className: "my-6 py-6 border-b-2 border-purple-900 rounded" },
                react_1["default"].createElement("h3", null, " Winning Responses \uD83D\uDE0D "),
                ans.map(function (answer, i) {
                    if (answer.validate) {
                        return (react_1["default"].createElement("div", { key: i },
                            react_1["default"].createElement("p", null,
                                " ",
                                '👉🏼' + answer.question.name,
                                " ")));
                    }
                }))),
            " ")) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(material_1.Container, null,
                react_1["default"].createElement("h2", null, " Submit a Response ! "))))));
};
exports["default"] = Profile;
