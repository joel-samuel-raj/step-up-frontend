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
var posts_1 = require("../../assets/images/posts");
var PostsContext_1 = require("../../context/PostsContext");
var mcq_1 = require("./mcq");
function Create(_a) {
    var bool = _a.bool, id = _a.id;
    var allPosts = react_1.useContext(PostsContext_1.PostsContext);
    var _b = react_1.useReducer(function (x) { return x + 1; }, 0), forceUpdate = _b[1];
    var _c = react_1.useState([{ question: "question #1" }]), questions = _c[0], setQuestions = _c[1];
    var _d = react_1.useState(new Array(questions.length + 1).fill(false)), isMcq = _d[0], setIsMcq = _d[1];
    var _e = react_1.useState([{}]), mcq = _e[0], setMcq = _e[1];
    var _f = react_1.useState(["question #1"]), editQuestions = _f[0], setEditQuestions = _f[1];
    var _g = react_1.useState(false), createModel = _g[0], setCreateModel = _g[1];
    var _h = react_1.useState(false), next = _h[0], setNext = _h[1];
    var _j = react_1.useState({ image: posts_1.postsImage, questions: questions }), posts = _j[0], setPosts = _j[1];
    var _k = react_1.useState({ image: posts_1.postsImage }), editPosts = _k[0], setEditPosts = _k[1];
    var addQuesion = function (i) {
        if (id) {
            setEditQuestions(function (prev) { return __spreadArrays(prev, [""]); });
        }
        setQuestions(function (prev) { return __spreadArrays(prev, [{ question: "" }]); });
    };
    var handleTyping = function (e) {
        var _a, _b;
        var _c = e.target, name = _c.name, value = _c.value;
        if (id) {
            var obj = __assign(__assign({}, editPosts), (_a = {}, _a[name] = value, _a));
            setEditPosts(obj);
        }
        if (!id) {
            var obj = __assign(__assign({}, posts), (_b = {}, _b[name] = value, _b));
            setPosts(obj);
        }
    };
    var handleImage = function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            setEditPosts(function (prev) { return (__assign(__assign({}, prev), { image: e.target.result })); });
            setPosts(function (prev) { return (__assign(__assign({}, prev), { image: e.target.result })); });
            // forceUpdate()
        };
        reader.readAsDataURL(file);
    };
    // useEffect( () => {
    //     if ( !id ) return
    //     let arr = allPosts.find( ar => ar._id === id )
    //     setEditQuestions( arr!.questions as string[] )
    //     setEditPosts( arr as questionType )
    //     console.log( posts )
    // }, [] )
    var removeQuestion = function (i) {
        if (id) {
            if (editQuestions.length === 1)
                return;
            var array = editQuestions;
            array.pop();
            setEditQuestions(array);
        }
        else {
            if (questions.length === 1)
                return;
            var array = questions;
            array.pop();
            setQuestions(array);
        }
        forceUpdate();
    };
    var questionType = function (i) {
        var bool = isMcq;
        bool[i] = !bool[i];
        setIsMcq(bool);
        var arr = {
            question: questions[i].question,
            options: [{
                    value: "",
                    answer: false
                }]
        };
        var array = questions;
        array[i] = arr;
        setQuestions(array);
        forceUpdate();
        // console.log( questions![ i ].options )
    };
    var handleChange = function (e, i) {
        if (id) {
            var value = e.target.value;
            var array = editQuestions;
            array[i] = value;
            setEditQuestions(array);
            // setEditPosts( ( prev ) => ( { ...prev, questions: editQuestions } ) )
        }
        else {
            var value = e.target.value;
            var array = questions;
            array[i].question = value;
            setQuestions(array);
            setPosts(function (prev) { return (__assign(__assign({}, prev), { questions: questions })); });
        }
        // forceUpdate()
        // console.log( posts )
    };
    var submit = function () {
        if (id) {
            console.log(editPosts);
            console.log(editQuestions);
            axios_1["default"].post(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/update/" + id, editPosts).then(function (res) {
                console.log(res);
                router_1["default"].reload();
            });
            return;
        }
        // axios.post( `${ process.env.NEXT_PUBLIC_BACKEND_URL }/posts/create`, posts ).then( ( res ) => {
        //     console.log( res )
        //     setCreateModel( true )
        //     router.reload()
        // } )
        console.log(posts);
    };
    var mcqData = function (data) {
        setMcq(data);
        console.log(data);
        console.log(mcq);
    };
    react_1.useEffect(function () {
        console.log("mcq", mcq);
    }, [mcq]);
    react_1.useEffect(function () {
        console.log("post", posts);
    }, [posts]);
    var handleMcqChange = function (i) {
        var object = {
            question: questions[i].question,
            options: mcq
        };
        console.log(object);
        var arr = posts;
        arr.questions[i] = object;
        console.log("arr");
        setPosts(arr);
        console.log(posts);
    };
    var fate = function () {
        return id ? editQuestions : questions;
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, ((id && (typeof editPosts.name === 'string')) || (!id)) && (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Container, { className: "my-4" },
            react_1["default"].createElement("h3", { className: "my-4" },
                " ",
                id ? "Edit " + editPosts.name : "Create " + posts.name,
                " "),
            next ? (react_1["default"].createElement(material_1.Box, { sx: {
                    '& .MuiTextField-root': { my: 1 }
                } },
                (id ? editQuestions : questions).map(function (question, i) { return (react_1["default"].createElement("div", { key: i, className: "textBox" },
                    react_1["default"].createElement(material_1.TextField, { autoFocus: true, onChange: function (e) { handleChange(e, i); }, className: "my-2", value: question.question, label: "Question #" + (i + 1), multiline: true, fullWidth: true, InputProps: {
                            endAdornment: (react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(material_1.InputAdornment, { position: "end" }, react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-green-500 cursor-pointer", icon: free_solid_svg_icons_1.faCheckSquare, onClick: function () { questionType(i); } })),
                                react_1["default"].createElement(material_1.InputAdornment, { position: "end" }, i === fate().length - 1 && react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { onClick: function () { addQuesion(i); }, className: "text-blue-600 cursor-pointer", icon: free_solid_svg_icons_1.faAdd })),
                                react_1["default"].createElement(material_1.InputAdornment, { position: "end" }, i === fate().length - 1 &&
                                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-red-600 cursor-pointer", icon: free_solid_svg_icons_1.faClose, onClick: function () { removeQuestion(i); } }))))
                        } }),
                    isMcq[i] && (react_1["default"].createElement("div", { onChange: function () { return handleMcqChange(i); } },
                        react_1["default"].createElement(mcq_1["default"], { mcqData: mcqData }))))); }),
                id ? (react_1["default"].createElement(material_1.Button, { className: "float-left", onClick: function () { submit(); } }, "Confirm Changes")) : (react_1["default"].createElement(material_1.Button, { className: "float-left", onClick: function () { submit(); } }, "Post Quiz")))) : (react_1["default"].createElement(material_1.Box, { sx: {
                    '& .MuiTextField-root': { my: 1 }
                } },
                react_1["default"].createElement(material_1.TextField, { value: editPosts.name, onChange: handleTyping, name: "name", className: "my-4", fullWidth: true, label: "name" }),
                react_1["default"].createElement(material_1.TextField, { value: editPosts.description, onChange: handleTyping, name: "description", className: "my-4", multiline: true, fullWidth: true, label: "description" }),
                react_1["default"].createElement("img", { className: "w-full object-contain", src: id ? editPosts.image : posts.image, alt: "" }),
                react_1["default"].createElement(material_1.Button, { className: "block relative my-4" },
                    " ",
                    react_1["default"].createElement("input", { type: "file", className: "absolute w-full h-full opacity-0 ", onChange: handleImage }),
                    " ",
                    id ? "Update Photo" : "Upload Photo",
                    " "))),
            react_1["default"].createElement("div", { className: "flex justify-end w-full items-center" },
                react_1["default"].createElement("div", { className: "mx-4", onClick: function () { return setNext(false); } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-blue-500 text-lg", icon: free_solid_svg_icons_1.faArrowLeft })),
                react_1["default"].createElement("div", { className: "", onClick: function () { return setNext(true); } },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-blue-500 text-lg", icon: free_solid_svg_icons_1.faArrowRight })))),
        react_1["default"].createElement(material_1.Snackbar, { open: createModel, autoHideDuration: 6000, onClose: function () { setCreateModel(false); } },
            react_1["default"].createElement(material_1.Alert, { onClose: function () { setCreateModel(false); }, severity: "success", sx: { width: '100%' } }, "Post Created Succesfully \uD83D\uDE0D"))))));
}
exports["default"] = Create;
