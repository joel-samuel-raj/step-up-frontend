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
var react_1 = require("react");
function Mcq(_a) {
    var mcqData = _a.mcqData, changer = _a.changer, preData = _a.preData, ansData = _a.ansData, iconFlag = _a.iconFlag, readFlag = _a.readFlag, inputFlag = _a.inputFlag;
    var _b = react_1.useReducer(function (x) { return x + 1; }, 0), forceUpdate = _b[1];
    var _c = react_1.useState([{
            value: "",
            answer: false
        }]), template = _c[0], setTemplate = _c[1];
    var _d = react_1.useState(true), flag = _d[0], setFlag = _d[1];
    var _e = react_1.useState(true), write = _e[0], setWrite = _e[1];
    var _f = react_1.useState(true), input = _f[0], setInput = _f[1];
    var _g = react_1.useState({}), correctAns = _g[0], setCorrectAns = _g[1];
    var handleCheckChange = function (e, i) {
        if (typeof window !== "undefined" && write) {
            setTemplate(function (prevTemplates) { return prevTemplates.map(function (item, idx) { return idx === i ? __assign(__assign({}, item), { answer: e.target.checked }) : item; }); });
            forceUpdate();
        }
    };
    var handleInputChange = function (e, i) {
        if (typeof window !== "undefined" && write && input) {
            var newTemplate = __spreadArrays(template);
            newTemplate.splice(i, 1, __assign(__assign({}, template[i]), { value: e.target.value }));
            setTemplate(newTemplate);
            forceUpdate();
        }
    };
    var addField = function () {
        setTemplate(function (prev) {
            return __spreadArrays(prev, [{
                    value: "",
                    answer: false
                }]);
        });
        forceUpdate();
    };
    var removeField = function (i) {
        if (template.length === 1)
            return;
        var array = template;
        array.splice(i, 1);
        setTemplate(array);
        forceUpdate();
    };
    react_1.useEffect(function () {
        mcqData(template);
    }, [template]);
    react_1.useEffect(function () {
        if (preData) {
            setTemplate(preData);
            console.log(template);
            forceUpdate();
        }
    }, __spreadArrays(changer));
    react_1.useEffect(function () {
        if (iconFlag === false) {
            setFlag(iconFlag);
        }
    }, [iconFlag]);
    react_1.useEffect(function () {
        setWrite(!readFlag);
    }, [readFlag]);
    react_1.useEffect(function () {
        setInput(!inputFlag);
    }, [inputFlag]);
    react_1.useEffect(function () {
        setCorrectAns(ansData);
    }, [ansData]);
    var colourChange = function (bool, i) {
        var classes = "m-2 p-2 rounded";
        if (!ansData || (typeof correctAns.options === 'undefined'))
            return "";
        console.log(bool);
        if (bool) {
            return correctAns.options[i].answer === bool ? classes + " bg-green-200" : classes + " bg-red-300";
        }
        if (correctAns.options[i].answer) {
            return classes + " bg-green-200";
        }
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("ul", null, template.length && template.map(function (item, i) { return (react_1["default"].createElement("li", { key: i }, react_1["default"].createElement("div", { className: "flex justify-start items-center" },
            react_1["default"].createElement(material_1.Checkbox, { className: "check", checked: item.answer, onClick: function (e) { handleCheckChange(e, i); } }),
            react_1["default"].createElement("span", { className: colourChange(item.answer, i) },
                react_1["default"].createElement(material_1.TextField, { variant: "standard", type: "text", value: item.value, placeholder: "Type...", onKeyPress: function (e) {
                        if (e.code === "Enter") {
                            addField();
                        }
                    }, onChange: function (e) { handleInputChange(e, i); } })),
            react_1["default"].createElement("span", { className: "mx-4 grid gap-1 grid-cols-2" },
                (i === template.length - 1 && flag) && react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-red-500", onClick: function () { removeField(i); }, icon: free_solid_svg_icons_1.faClose }),
                (i === template.length - 1 && flag) && react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-blue-500", icon: free_solid_svg_icons_1.faAdd, onClick: function () { addField(); } }))))); }))));
}
exports["default"] = Mcq;
