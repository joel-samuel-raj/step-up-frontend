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
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Home = function () {
    var allPosts = react_1.useContext(PostsContext_1.PostsContext).allPosts;
    var _a = react_1.useContext(AnswersContext_1.AnswersContext), allAnswers = _a.allAnswers, setAllAnswers = _a.setAllAnswers;
    var user = react_1.useContext(UserContext_1.UserContext);
    var _b = react_1.useReducer(function (x) { return x + 1; }, 0), forceUpdate = _b[1];
    var _c = react_1.useState([{}]), mcq = _c[0], setMcq = _c[1];
    var _d = react_1.useState([{}]), data = _d[0], setData = _d[1];
    var _e = react_1.useState(false), loginModel = _e[0], setLoginModel = _e[1];
    var _f = react_1.useState(false), loginModel1 = _f[0], setLoginModel1 = _f[1];
    var _g = react_1.useState(false), responseModel = _g[0], setResponseModel = _g[1];
    var _h = react_1.useState({ answers: [{ answer: "" }] }), answer = _h[0], setAnswer = _h[1];
    var _j = react_1.useState({}), question = _j[0], setQuestion = _j[1];
    var _k = react_1.useState(0), currentIndex = _k[0], setCurrentIndex = _k[1];
    var _l = react_1.useState(-1), currentQuestion = _l[0], setCurrentQuestion = _l[1];
    var _m = react_1.useState(false), clicked = _m[0], setClicked = _m[1];
    var _o = react_1.useState(new Array(1000).fill(false)), answerModal = _o[0], setAnswerModal = _o[1];
    var _p = react_1.useState({}), existingAnswer = _p[0], setExistingAnswer = _p[1];
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
        if (!user.name) {
            setLoginModel(true);
            console.log(loginModel);
            return;
        }
        if (!flag && !(question.questions.length === answer.answers.length)) {
            console.log(question.questions.length === answer.answers.length);
            alert("Please fill answer all the questions to submit !");
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
            setResponseModel(true);
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
                    return;
                }
            }
        }
        else {
            console.log(existingAnswer);
            return;
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
    var handleModalClose = function (i) {
        setAnswerModal(function (prev) { return prev.map(function (pre, j) { return j === i ? false : pre; }); });
        console.log(answerModal);
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
            React.createElement("div", { className: "grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }, data.map(function (dat, i) {
                console.log(dat);
                return (React.createElement(material_1.Box, { key: i, onClick: !user.name ? function () {
                        setLoginModel(true);
                    } : function () {
                        setQuestion(data[i]);
                        setAnswerModal(function (prev) { return prev.map(function (pre, l) {
                            return l === i ? true : pre;
                        }); });
                        setCurrentQuestion(i);
                        console.log(answerModal, currentQuestion);
                    }, className: "bg-gradient-to-tr cursor-pointer text-white from-purple-400 to-purple-900 rounded relative" },
                    React.createElement("h3", { className: "m-4" },
                        " ",
                        dat.name,
                        " "),
                    React.createElement("img", { className: "w-full object-contain rounded", src: dat.image, alt: "" }),
                    React.createElement(material_1.Divider, { className: "m-4 bg-purple-900" }),
                    React.createElement("p", { className: "m-4" },
                        " ",
                        dat.description,
                        " ")));
            }))),
        currentQuestion >= 0 && React.createElement(material_1.Modal, { className: "flex justify-center", open: answerModal[currentQuestion], onClose: function () { return handleModalClose(currentQuestion); } },
            React.createElement(material_1.Modal, { className: "flex justify-center", open: answerModal[currentQuestion], onClose: function () { return handleModalClose(currentQuestion); } },
                React.createElement(material_1.Box, { style: { overflow: "auto" }, className: "w-11/12 relative bg-white m-4 p-4 lg:px-12 h-11/12" },
                    React.createElement("div", { className: "p-2 flex justify-center items-center w-6 h-6 cursor-pointer bg-red-500 hover:bg-red-600 rounded absolute top-4 right-2", onClick: function () { return handleModalClose(currentQuestion); } },
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-white text-lg", icon: free_solid_svg_icons_1.faClose })),
                    React.createElement("h3", { className: "my-4" }, " Take Quiz \u2705 "),
                    React.createElement("div", { className: "py-8 px-2 rounded shadow-lg w-full border-2 border-purple-500" },
                        React.createElement("h3", { className: "text-center" },
                            " ",
                            question.name,
                            " "),
                        question.questions.map(function (quest, j) { return (React.createElement("div", { onChange: function () { setCurrentIndex(j); setClicked(true); }, key: j, className: "p-4" },
                            React.createElement(material_1.TextField, { variant: "standard", label: "Question #" + (j + 1), className: "whitespace-pre-line w-full", fullWidth: true, multiline: true, value: quest.question }),
                            quest.options.length > 1 ? React.createElement(mcq_1["default"], { iconFlag: false, inputFlag: true, mcqData: mcqData, changer: [question._id, existingAnswer], preData: templateData(j) }) : React.createElement("div", { className: "my-4" },
                                React.createElement(rich_markdown_editor_1["default"], { value: editorValue(j), onChange: function (value) { handleChange(value(), j); setCurrentIndex(j); }, placeholder: "Start Writing Here..." })))); }),
                        React.createElement("div", { className: "flex m-4" },
                            React.createElement("div", { className: "mr-4" },
                                React.createElement(material_1.Button, { variant: "contained", className: "bg-green-500", onClick: function () { handleSubmit(question._id, question, false); } }, " Submit ")),
                            React.createElement(material_1.Button, { variant: "outlined", onClick: function () { handleSubmit(question._id, question, true); } }, " Save Progress ")))))),
        React.createElement(material_1.Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'right' }, open: responseModel, autoHideDuration: 6000, onClose: function () { return setResponseModel(false); } },
            React.createElement(material_1.Alert, { onClose: function () { return setLoginModel(false); }, severity: "success", sx: { width: '100%' } }, "Response saved successfully !")),
        React.createElement(material_1.Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'right' }, open: loginModel, autoHideDuration: 6000, onClose: function () { return setLoginModel(false); } },
            React.createElement(material_1.Alert, { onClose: function () { return setLoginModel(false); }, severity: "warning", sx: { width: '100%' } }, "Please login to continue !"))));
};
exports["default"] = Home;
//dist
