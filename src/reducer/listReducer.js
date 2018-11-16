//reducer creation 
import * as ACTION_TYPE from '../action/actionType'
import _ from 'underscore';

const listData = [
  { "type": "Academy Sports", "desc": "Packing slip", "labelName": "Shipping label", "labelId": 100 },
  { "type": "Dicks", "desc": "Packing slip", "labelName": "Shipping label dicks", "labelId": 400 },
  { "type": "Sports", "desc": "Packing slip", "labelName": "Shipping label sports", "labelId": 500 },
  { "type": "Zed Sports", "desc": "Packing slip", "labelName": "Shipping label zed", "labelId": 900 },
  { "type": "Cad Sports", "desc": "Packing slip", "labelName": "Shipping label cad", "labelId": 100 }
];
export default function listReducer(state = [], action) {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST:
      var data;
      if (action.sortOrder === 1) {
        data = _.sortBy(listData, 'type');
        return {
          listData: data
        };
      } else {
        data = _.sortBy(listData, 'type');
        data.reverse();
        return {
          listData: data
        };
      }
    default:
      return state;
  }
}