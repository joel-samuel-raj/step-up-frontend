"use strict";
exports.__esModule = true;
exports.PostsProvider = exports.PostsContext = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
exports.PostsContext = react_1.createContext({ allPosts: [{}], setAllPosts: function () { } });
exports.PostsProvider = function (props) {
    var _a = react_1.useState([{}]), allPosts = _a[0], setAllPosts = _a[1];
    react_1.useEffect(function () {
        axios_1["default"].get(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts/getPosts").then(function (res) {
            setAllPosts(res.data);
            console.log(res.data);
        });
    }, []);
    return (React.createElement(exports.PostsContext.Provider, { value: { allPosts: allPosts, setAllPosts: setAllPosts } }, props.children));
};
//dist
