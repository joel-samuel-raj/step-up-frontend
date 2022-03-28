"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Navbar_1 = require("../components/Navbar");
var Questions_1 = require("../components/Postman/Questions");
var UserContext_1 = require("../context/UserContext");
function Admin() {
    var user = react_1.useContext(UserContext_1.UserContext);
    // useEffect( () => {
    //     if ( user && !user.isAdmin ) {
    //         router.push( "/" )
    //     }
    // }, [ user ] )
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Navbar_1["default"], null),
        react_1["default"].createElement("div", null,
            " ",
            user.isAdmin ? (react_1["default"].createElement(Questions_1["default"], null)) : ((react_1["default"].createElement(react_1["default"].Fragment, null))),
            " ")));
}
exports["default"] = Admin;
