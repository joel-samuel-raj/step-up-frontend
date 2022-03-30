"use strict";
exports.__esModule = true;
exports.AnswersProvider = exports.AnswersContext = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
exports.AnswersContext = react_1.createContext({ allAnswers: [{}], setAllAnswers: function () { } });
exports.AnswersProvider = function (props) {
    var _a = react_1.useState([{}]), allAnswers = _a[0], setAllAnswers = _a[1];
    react_1.useEffect(function () {
        axios_1["default"].get(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/answers/get").then(function (res) { return setAllAnswers(res.data); });
    }, []);
    return (React.createElement(exports.AnswersContext.Provider, { value: { allAnswers: allAnswers, setAllAnswers: setAllAnswers } }, props.children));
};
