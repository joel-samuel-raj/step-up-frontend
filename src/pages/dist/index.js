"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var Navbar_1 = require("../components/Navbar");
var mcq_1 = require("../components/Postman/mcq");
var react_1 = require("react");
var axios_1 = require("axios");
var UserContext_1 = require("../context/UserContext");
var rich_markdown_editor_1 = require("rich-markdown-editor");
var PostsContext_1 = require("../context/PostsContext");
var AnswersContext_1 = require("../context/AnswersContext");
var ulid_1 = require("ulid");
var router_1 = require("next/router");
var Home = function () {
    var allPosts = react_1.useContext(PostsContext_1.PostsContext).allPosts;
    var _a = react_1.useContext(AnswersContext_1.AnswersContext), allAnswers = _a.allAnswers, setAllAnswers = _a.setAllAnswers;
    var user = react_1.useContext(UserContext_1.UserContext);
    var _b = react_1.useReducer(function (x) { return x + 1; }, 0), forceUpdate = _b[1];
    var _c = react_1.useState([{}]), mcq = _c[0], setMcq = _c[1];
    var _d = react_1.useState([{}]), data = _d[0], setData = _d[1];
    var _e = react_1.useState(false), loginModel = _e[0], setLoginModel = _e[1];
    var _f = react_1.useState({ answers: [{ answer: "" }] }), answer = _f[0], setAnswer = _f[1];
    var _g = react_1.useState({}), question = _g[0], setQuestion = _g[1];
    var _h = react_1.useState(0), currentIndex = _h[0], setCurrentIndex = _h[1];
    var _j = react_1.useState(false), clicked = _j[0], setClicked = _j[1];
    var _k = react_1.useState({}), existingAnswer = _k[0], setExistingAnswer = _k[1];
    react_1.useEffect(function () {
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
        if (allPosts.length > 0) {
            var arr = allPosts.filter(function (post) { return post.open === true; });
            // console.log(question)
            setData(arr);
            forceUpdate();
        }
    }, [allPosts, question, allAnswers, answer]);
    react_1.useEffect(function () {
        var array = allAnswers.find(function (answer) { return answer.userId === user._id && answer.questionId === question._id; });
        setExistingAnswer(array);
        if (array) {
            if (array._id) {
                setAnswer(array);
            }
        }
        console.log(answer);
        // console.log( array )
        forceUpdate();
    }, [question, existingAnswer, answer]);
    var handleChange = function (e, j) {
        var array = answer;
        array['answers'][j] = {
            answer: e
        };
        setAnswer(array);
        console.log(answer);
    };
    var handleSubmit = function (j, object, flag) {
        if (!flag && question.questions.length === answer.answers.length) {
            alert("Fill all the Fields to submit !");
            return;
        }
        if (!user.name) {
            setLoginModel(true);
            console.log(loginModel);
            return;
        }
        if (user.name) {
            var obj_1 = {
                ulid: ulid_1.ulid(),
                userName: user.name,
                userId: user._id,
                questionId: j,
                answers: answer.answers,
                userEmail: user.email,
                userPhone: user.phoneNumber,
                progress: flag,
                question: object
            };
            if (!(existingAnswer === {} || existingAnswer === undefined)) {
                axios_1["default"].post(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/answers/update/" + existingAnswer.ulid, obj_1).then(function () {
                    setQuestion({});
                    setAllAnswers(function (prev) { return (__spreadArrays(prev, [obj_1])); });
                    router_1["default"].reload();
                });
                return;
            }
            axios_1["default"].post(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/answers/post", obj_1).then(function () {
                setQuestion({});
                setAllAnswers(function (prev) { return (__spreadArrays(prev, [obj_1])); });
                router_1["default"].reload();
            });
            console.log("obj");
        }
    };
    var editorValue = function (j) {
        if (!(existingAnswer === {} || existingAnswer === undefined)) {
            if (existingAnswer.answers) {
                if (existingAnswer.answers[j]) {
                    return existingAnswer.answers[j].answer;
                }
                else {
                    return " ";
                }
            }
        }
        else {
            console.log(existingAnswer);
            return " ";
        }
    };
    var templateData = function (j) {
        if (question.questions[j].options.length > 0) {
            if (!(existingAnswer === {} || typeof existingAnswer === 'undefined')) {
                if (existingAnswer.answers) {
                    if (existingAnswer.answers[j]) {
                        if (existingAnswer.answers[j].options) {
                            if (existingAnswer.answers[j].options.length > 1) {
                                var arr = existingAnswer.answers[j].options;
                                console.log(arr);
                                return arr;
                            }
                        }
                    }
                }
            }
            else {
                var arr = question.questions[j].options.map(function (opt, i) {
                    return {
                        value: opt.value,
                        answer: false
                    };
                });
                return arr;
            }
        }
        // forceUpdate()
    };
    var mcqData = function (data) {
        setMcq(data);
    };
    react_1.useEffect(function () {
        if (answer && clicked) {
            var array = answer;
            array['answers'][currentIndex] = {
                options: mcq
            };
            setAnswer(array);
            console.log(answer);
        }
    }, [currentIndex, mcq, question]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1["default"], null),
        React.createElement(material_1.Container, { className: "my-4 mt-20" },
            React.createElement("h3", { className: "m-4" }, " Available Quiz \uD83D\uDC47\uD83C\uDFFC "),
            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }, data.map(function (dat, i) { return (React.createElement(material_1.Box, { key: i, onClick: function () { setQuestion(data[i]); }, className: "bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-900 rounded relative" },
                React.createElement("h3", { className: "m-4" },
                    " ",
                    dat.name,
                    " "),
                React.createElement("img", { className: "w-full object-contain rounded", src: process.env.NEXT_PUBLIC_BACKEND_URL + "/" + dat._id + ".jpg", alt: "" }),
                React.createElement(material_1.Divider, { className: "m-4 bg-purple-900" }),
                React.createElement("p", { className: "m-4" },
                    " ",
                    dat.description,
                    " "))); }))),
        question._id && React.createElement(material_1.Container, { className: "mt-12 mb-4" },
            React.createElement("h3", { className: "my-4" }, " Take Quiz \u2705 "),
            React.createElement("div", { className: "py-8 px-2 rounded shadow-lg border-2 border-purple-500" },
                React.createElement("h3", { className: "text-center" },
                    " ",
                    question.name,
                    " "),
                question.questions.map(function (quest, j) { return (React.createElement("div", { onChange: function () { setCurrentIndex(j); setClicked(true); }, key: j, className: "p-4" },
                    React.createElement("p", { className: "text-lg" },
                        " ",
                        quest.question,
                        " "),
                    quest.options.length > 1 ? React.createElement(mcq_1["default"], { iconFlag: false, inputFlag: false, mcqData: mcqData, changer: [question._id, existingAnswer], preData: templateData(j) }) : React.createElement("div", { className: "my-4" },
                        React.createElement(rich_markdown_editor_1["default"], { value: editorValue(j), onChange: function (value) { handleChange(value(), j); setCurrentIndex(j); }, placeholder: "Start Writing Here..." })))); }),
                React.createElement("div", { className: "flex m-4" },
                    React.createElement(material_1.Button, { variant: "contained", className: "bg-green-500 mr-4", onClick: function () { handleSubmit(question._id, question, false); } }, " Submit "),
                    React.createElement(material_1.Button, { onClick: function () { handleSubmit(question._id, question, true); } }, " Save Progress ")))),
        React.createElement(material_1.Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'right' }, open: loginModel, autoHideDuration: 6000, onClose: function () { return setLoginModel(false); } },
            React.createElement(material_1.Alert, { onClose: function () { return setLoginModel(false); }, severity: "error", sx: { width: '100%' } }, "Please Login To Submit !"))));
};
exports["default"] = Home;
//dist
