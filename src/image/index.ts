import { handlize, escapeString } from './../string/';
import { getAssetUrl, getImageUrl } from './../url/';

export const generatePicture = (image:string|null, width:number=1400, sizes:number[]=[ 500, 750, 1000], clazz?:string, alt?:string, attributes?:string, lazy?:boolean, lazyExpand?:number) => {
  attributes = attributes && attributes.length ? attributes : null;

  let ratios = [ 1, 2, 4 ];
  //TODO: Maybe we can enable some way of fetching the information about the
  //image here. (Mainly the image src, alt and dimensions if we can)
  let x = '<picture>';
  sizes.forEach((s,i) => {
    x += '<source media="(';
    if(i != (sizes.length-1)) {
      x += 'max-width';
    } else {
      x += 'min-width';
    }

    x += `:${s}px)" ${lazy ? `data-srcset` : `srcset`} ="`;

    ratios.forEach((r,y) => {
      x += getImageUrl(image, s*r);
      if(r != 1) x += ` ${r}x`;
      if(y < (ratios.length-1)) x += ', ';
    });

    if(alt) return x += `" ${lazy ? `data-sizes="auto"` : ``} alt="${alt}" />`;
    x += `" ${lazy ? `data-sizes="auto"` : ``} />`;
  });

  x += `<img ${lazy ? `data-src` : `src`}="${getImageUrl(image,width)}" `
  if(alt) x += `alt="${escapeString(alt)}" `;
  if (clazz) x += `class="${clazz} ${lazy ? `lazyload` : ``}"`;
  if(attributes) x+= `${attributes} `;
  x += ` ${lazyExpand ? `data-expand="${lazyExpand}"` : ``}/></picture>`;
  return x;
}

export const generateIcon = (icon:string,clazz:string="",title:string="",alt:string="",attributes:string="") => {
  let iconHandle = handlize(icon);
  clazz = `o-icon o-icon--${iconHandle} ${clazz}`;

  return `<img
    class="${clazz}" ${alt?'alt="'+escapeString(alt)+'"':''}
    src="${getAssetUrl(`icon-${icon}.svg`)}"
    ${title?'title="'+escapeString(title)+'"':''} ${attributes} data-icon
  />`;
};
