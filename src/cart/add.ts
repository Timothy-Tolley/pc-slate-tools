import * as $ from 'jquery';
import {
  addTask, removeTask, nextTask,
  addFinishTrigger, errorQueue
} from './queue';
import { ON_ITEM_ADDED } from './events';

export interface LineItemProperties {
  [key:string]:string
};

//Promise Flavour
export const addToCart = (variant:number, quantity:number=1, properties?:LineItemProperties) => {
  return new Promise((resolve,reject) => {
    addToCartCB(variant, quantity, properties, resolve, reject);
  });
}

//Callback flavour
export const addToCartCB = (variant:number, quantity:number=1, properties?:LineItemProperties, callback?:any, errorCallback?:any) => {
  let o:any = {
    variant,
    quantity,
    callback,
    errorCallback,
    url :'/cart/add.js',
    dataType: "json",
    method: 'POST',
    data: {
      id: variant,
      quantity: quantity,
      properties
    },
    action: 'add'
  };

  o.success = function(data) {
    if(this.callback) this.callback(data);
    addFinishTrigger({ event: ON_ITEM_ADDED, data});
    removeTask(this);
    nextTask();
  }.bind(o);

  o.error = function(e,i,a) {
    if(typeof this.errorCallback === "function") {
      this.errorCallback(e ? e.responseJSON || e : 'Unknown Error');
    }
    removeTask(this);
    errorQueue();
  }.bind(o);

  o.task = function() {
    $.ajax(this);
  }.bind(o);

  addTask(o);
}
