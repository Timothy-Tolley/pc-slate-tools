"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageUrl = exports.getCdnUrl = exports.getAssetUrl = void 0;
exports.getAssetUrl = function (asset) {
    if (!window['Asset'])
        throw new Error("You have not setup a same asset url for the script to use! Ensure window.Asset has been set with any asset url!");
    var a = window['Asset'];
    var y = a.split('/');
    y.splice(-1, 1);
    y.push(asset);
    return y.join('/');
};
exports.getCdnUrl = function () {
    var y = exports.getAssetUrl('').split('/');
    y.splice(y.length - 4, y.length);
    return y.join('/');
};
exports.getImageUrl = function (src, size) {
    if (!src) {
        //Source not specified / valid, return the no-image image.
        return '//cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif';
    }
    size = "" + size; //Convert to string
    if (!size.endsWith('x'))
        size += 'x';
    var removeProtocol = function (path) { return path.replace(/http(s)?:/, ''); };
    if (!size)
        return src;
    if (size === 'master')
        return removeProtocol(size);
    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    if (!match)
        return null;
    var prefix = src.split(match[0]);
    var suffix = match[0];
    return removeProtocol(prefix[0] + "_" + (size + suffix));
};
//# sourceMappingURL=index.js.map