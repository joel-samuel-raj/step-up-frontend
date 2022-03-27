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
    var mcqData = _a.mcqData;
    var _b = react_1.useReducer(function (x) { return x + 1; }, 0), forceUpdate = _b[1];
    var _c = react_1.useState([{
            value: "",
            answer: false
        }]), template = _c[0], setTemplate = _c[1];
    var handleCheckChange = function (e, i) {
        if (typeof window !== "undefined") {
            console.log(e.target.checked);
            setTemplate(function (prevTemplates) { return prevTemplates.map(function (item, idx) { return idx === i ? __assign(__assign({}, item), { answer: e.target.checked }) : item; }); });
            console.log(template);
            // forceUpdate()
        }
    };
    var handleInputChange = function (e, i) {
        if (typeof window !== "undefined") {
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
        console.log(template);
        forceUpdate();
    };
    var handleChange = function () {
        console.log({
            options: template
        });
    };
    react_1.useEffect(function () {
        mcqData(template);
    }, [template]);
    react_1.useEffect(function () {
        console.log("template", template);
    }, [template]);
    return (react_1["default"].createElement("div", { onChange: function () { return handleChange(); } },
        react_1["default"].createElement("ul", null, template.map(function (item, i) { return (react_1["default"].createElement("li", { key: i }, react_1["default"].createElement("div", { className: "flex justify-start items-center" },
            react_1["default"].createElement(material_1.Checkbox, { className: "check", checked: item.answer, onClick: function (e) { handleCheckChange(e, i); } }),
            react_1["default"].createElement(material_1.TextField, { variant: "standard", type: "text", className: "bg-transparent", placeholder: "Type...", onChange: function (e) { handleInputChange(e, i); } }),
            react_1["default"].createElement("span", { className: "mx-4 grid gap-1 grid-cols-2" },
                i === template.length - 1 && react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-red-500", onClick: function () { removeField(i); }, icon: free_solid_svg_icons_1.faClose }),
                i === template.length - 1 && react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { className: "text-blue-500", icon: free_solid_svg_icons_1.faAdd, onClick: function () { addField(); } }))))); }))));
}
exports["default"] = Mcq;
