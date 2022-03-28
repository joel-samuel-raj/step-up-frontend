"use strict";
exports.__esModule = true;
exports.AnswersProvider = exports.AnswersContext = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
exports.AnswersContext = react_1.createContext([{}]);
exports.AnswersProvider = function (props) {
    var _a = react_1.useState([{}]), answers = _a[0], setAnswers = _a[1];
    react_1.useEffect(function () {
        axios_1["default"].get(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/answers/get").then(function (res) { return setAnswers(res.data); });
    }, []);
    return (React.createElement(exports.AnswersContext.Provider, { value: answers }, props.children));
};
