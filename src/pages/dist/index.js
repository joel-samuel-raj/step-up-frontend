"use strict";
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
var Home = function () {
    var allPosts = react_1.useContext(PostsContext_1.PostsContext).allPosts;
    var answers = react_1.useContext(AnswersContext_1.AnswersContext);
    var user = react_1.useContext(UserContext_1.UserContext);
    var _a = react_1.useReducer(function (x) { return x + 1; }, 0), forceUpdate = _a[1];
    var _b = react_1.useState([{}]), mcq = _b[0], setMcq = _b[1];
    var _c = react_1.useState([{}]), data = _c[0], setData = _c[1];
    var _d = react_1.useState(false), loginModel = _d[0], setLoginModel = _d[1];
    var _e = react_1.useState({ answers: [{ answer: "" }] }), answer = _e[0], setAnswer = _e[1];
    var _f = react_1.useState({}), question = _f[0], setQuestion = _f[1];
    var _g = react_1.useState(0), currentIndex = _g[0], setCurrentIndex = _g[1];
    var _h = react_1.useState({}), existingAnswer = _h[0], setExistingAnswer = _h[1];
    react_1.useEffect(function () {
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
        if (allPosts.length > 0) {
            var arr = allPosts.filter(function (post) { return post.open === true; });
            setData(arr);
            var array = answers.find(function (answer) { return answer.userId === user._id && answer.questionId === question._id; });
            setExistingAnswer(array);
            console.log(existingAnswer);
            forceUpdate();
        }
    }, [allPosts, question, existingAnswer, answers]);
    var handleChange = function (e, j) {
        var array = answer;
        console.log(array['answers'][j] = {
            answer: e
        });
        setAnswer(array);
        console.log(answer);
    };
    var handleSubmit = function (j, object) {
        if (!user.name) {
            setLoginModel(true);
            console.log(loginModel);
            return;
        }
        if (user.name) {
            var obj = {
                userName: user.name,
                userId: user._id,
                questionId: j,
                answers: answer.answers,
                userEmail: user.email,
                userPhone: user.phoneNumber,
                question: object
            };
            axios_1["default"].post(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/answers/post", obj).then(function () { return setQuestion({}); });
            console.log(obj);
        }
    };
    var templateData = function (j) {
        if (question.questions[j].options.length > 0) {
            var arr = question.questions[j].options.map(function (opt, i) {
                return {
                    value: opt.value,
                    answer: false
                };
            });
            // console.log(arr)
            return arr;
        }
        forceUpdate();
    };
    var mcqData = function (data) {
        setMcq(data);
    };
    react_1.useEffect(function () {
        var array = answer;
        array['answers'][currentIndex] = {
            options: mcq
        };
        setAnswer(array);
        console.log(answer);
    }, [currentIndex, mcq]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1["default"], null),
        React.createElement(material_1.Container, { className: "my-4 mt-20" },
            React.createElement("h3", { className: "m-4" }, " Available Quiz \uD83D\uDC47\uD83C\uDFFC "),
            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }, data.map(function (dat, i) { return (React.createElement(material_1.Box, { key: i, onClick: function () { setQuestion(data[i]); console.log(data[i]); }, className: "bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-900 rounded relative" },
                React.createElement("h3", { className: "m-4" },
                    " ",
                    dat.name,
                    " "),
                React.createElement("img", { className: "w-full object-contain rounded", src: dat.image, alt: "" }),
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
                question.questions.map(function (quest, j) { return (React.createElement("div", { onChange: function () { setCurrentIndex(j); }, key: j, className: "p-4" },
                    React.createElement("p", { className: "text-lg" },
                        " ",
                        quest.question,
                        " "),
                    quest.options.length > 0 ? React.createElement(mcq_1["default"], { iconFlag: false, mcqData: mcqData, preData: (existingAnswer === {} || typeof existingAnswer === 'undefined') ? templateData(j) : existingAnswer.options[j] }) : React.createElement("div", { className: "my-4" },
                        React.createElement(rich_markdown_editor_1["default"], { value: (existingAnswer === {} || typeof existingAnswer === 'undefined') ? "" : existingAnswer.answers[j].answer, onChange: function (value) { handleChange(value(), j); setCurrentIndex(j); }, placeholder: "Start Writing Here..." })))); }),
                React.createElement(material_1.Button, { onClick: function () { handleSubmit(question._id, question); } }, " Submit "))),
        React.createElement(material_1.Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'right' }, open: loginModel, autoHideDuration: 6000, onClose: function () { return setLoginModel(false); } },
            React.createElement(material_1.Alert, { onClose: function () { return setLoginModel(false); }, severity: "error", sx: { width: '100%' } }, "Please Login To Submit !"))));
};
exports["default"] = Home;
