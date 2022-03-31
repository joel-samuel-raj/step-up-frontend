"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var Navbar_1 = require("../components/Navbar");
var AnswersContext_1 = require("../context/AnswersContext");
function Winners() {
    var allAnswers = react_1.useContext(AnswersContext_1.AnswersContext).allAnswers;
    var _a = react_1.useState([]), answers = _a[0], setAnswers = _a[1];
    react_1.useEffect(function () {
        setAnswers(allAnswers.filter(function (answer) { return answer.validate === true; }));
    }, [allAnswers]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Navbar_1["default"], null),
        react_1["default"].createElement(material_1.Container, null,
            react_1["default"].createElement("h3", null, " Winners so Far \u26A1 "),
            answers.length > 0 && (react_1["default"].createElement(material_1.Box, { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded" }, answers.map(function (answer, i) { return (react_1["default"].createElement("div", { className: "relative my-4", key: i },
                react_1["default"].createElement("div", { className: "relative rounded" },
                    react_1["default"].createElement("div", { className: "top-0 bottom-0 left-0 right-0 bg-purple_heart-500 absolute z-10 opacity-80 rounded" }),
                    react_1["default"].createElement("img", { src: process.env.NEXT_PUBLIC_BACKEND_URL + "/" + answer.questionId + ".jpg", alt: "" })),
                react_1["default"].createElement("div", { className: "absolute text-white z-20 top-4 left-4" },
                    react_1["default"].createElement("h3", null,
                        " ",
                        answer.userName,
                        " "),
                    react_1["default"].createElement("h4", { className: "italic" },
                        " ",
                        answer.question.name,
                        " ")))); }))))));
}
exports["default"] = Winners;
//dist
