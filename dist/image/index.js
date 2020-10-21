"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIcon = exports.generatePicture = void 0;
var string_1 = require("./../string/");
var url_1 = require("./../url/");
exports.generatePicture = function (image, width, sizes, clazz, alt, attributes, lazy, lazyExpand) {
    if (width === void 0) { width = 1400; }
    if (sizes === void 0) { sizes = [500, 750, 1000]; }
    attributes = attributes && attributes.length ? attributes : null;
    var ratios = [1, 2, 4];
    //TODO: Maybe we can enable some way of fetching the information about the
    //image here. (Mainly the image src, alt and dimensions if we can)
    var x = '<picture>';
    sizes.forEach(function (s, i) {
        x += '<source media="(';
        if (i != (sizes.length - 1)) {
            x += 'max-width';
        }
        else {
            x += 'min-width';
        }
        x += ":" + s + "px)\" " + (lazy ? "data-srcset" : "srcset") + " =\"";
        ratios.forEach(function (r, y) {
            x += url_1.getImageUrl(image, s * r);
            if (r != 1)
                x += " " + r + "x";
            if (y < (ratios.length - 1))
                x += ', ';
        });
        if (alt)
            return x += "\" " + (lazy ? "data-sizes=\"auto\"" : "") + " alt=\"" + alt + "\" />";
        x += "\" " + (lazy ? "data-sizes=\"auto\"" : "") + " />";
    });
    x += "<img " + (lazy ? "data-src" : "src") + "=\"" + url_1.getImageUrl(image, width) + "\" ";
    if (alt)
        x += "alt=\"" + string_1.escapeString(alt) + "\" ";
    if (clazz)
        x += "class=\"" + clazz + " " + (lazy ? "lazyload" : "") + "\"";
    if (attributes)
        x += attributes + " ";
    x += " " + (lazyExpand ? "data-expand=\"" + lazyExpand + "\"" : "") + "/></picture>";
    return x;
};
exports.generateIcon = function (icon, clazz, title, alt, attributes) {
    if (clazz === void 0) { clazz = ""; }
    if (title === void 0) { title = ""; }
    if (alt === void 0) { alt = ""; }
    if (attributes === void 0) { attributes = ""; }
    var iconHandle = string_1.handlize(icon);
    clazz = "o-icon o-icon--" + iconHandle + " " + clazz;
    return "<img\n    class=\"" + clazz + "\" " + (alt ? 'alt="' + string_1.escapeString(alt) + '"' : '') + "\n    src=\"" + url_1.getAssetUrl("icon-" + icon + ".svg") + "\"\n    " + (title ? 'title="' + string_1.escapeString(title) + '"' : '') + " " + attributes + " data-icon\n  />";
};
//# sourceMappingURL=index.js.map