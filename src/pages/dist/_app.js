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
exports.__esModule = true;
var material_1 = require("@mui/material");
var UserContext_1 = require("../context/UserContext");
require("../assets/styles/tailwind.css");
var PostsContext_1 = require("../context/PostsContext");
var AnswersContext_1 = require("../context/AnswersContext");
var theme = material_1.createTheme({
    palette: {
        primary: {
            main: '#651cb1'
        },
        secondary: {
            main: '#c725c7'
        }
    }
});
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
require("@fortawesome/fontawesome-svg-core/styles.css"); // Import the CSS
var react_1 = require("react");
fontawesome_svg_core_1.config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    var _b = react_1.useContext(PostsContext_1.PostsContext), allPosts = _b.allPosts, setAllPosts = _b.setAllPosts;
    react_1.useEffect(function () {
        console.log(allPosts);
    }, [allPosts]);
    return (React.createElement(React.Fragment, null, 1 && React.createElement(UserContext_1.UserProvider, null,
        React.createElement(PostsContext_1.PostsProvider, null,
            React.createElement(AnswersContext_1.AnswersProvider, null,
                React.createElement(material_1.ThemeProvider, { theme: theme },
                    React.createElement(Component, __assign({}, pageProps))))))));
}
exports["default"] = MyApp;
//dist
