export const getAssetUrl = (asset:string):string => {
  if(!window['Asset']) throw new Error("You have not setup a same asset url for the script to use! Ensure window.Asset has been set with any asset url!");

  let a = window['Asset'];
  let y = a.split('/');
  y.splice(-1, 1);
  y.push(asset)
  return y.join('/');
};

export const getCdnUrl = ():string => {
  let y = getAssetUrl('').split('/');
  y.splice(y.length-4, y.length);
  return y.join('/');
};

export const getImageUrl = (src:string|null, size:string|number):string => {
  if(!src) {
    //Source not specified / valid, return the no-image image.
    return '//cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif';
  }

  size = `${size}`;//Convert to string
  if(!size.endsWith('x')) size += 'x';

  let removeProtocol = (path:string) => path.replace(/http(s)?:/, '');
  if(!size) return src;
  if(size === 'master') return removeProtocol(size);


  var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
  if (!match) return null;

  let prefix = src.split(match[0]);
  let suffix = match[0];
  return removeProtocol(`${prefix[0]}_${size+suffix}`);
};
