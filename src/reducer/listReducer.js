//reducer creation 
import * as ACTION_TYPE from '../action/actionType'

const listData=[
                {"type":"Academy Sports","desc":"Packing slip","labelName":"Shipping label","labelId":100},
                {"type":"Academy Sports","desc":"Packing slip","labelName":"Shipping label","labelId":400},
                {"type":"Academy Sports","desc":"Packing slip","labelName":"Shipping label","labelId":500},
                {"type":"Academy Sports","desc":"Packing slip","labelName":"Shipping label","labelId":900},
                {"type":"Academy Sports","desc":"Packing slip","labelName":"Shipping label","labelId":100}
            ]



export default function listReducer(state=[], action) {
    switch (action.type) {
      case ACTION_TYPE.GET_LIST:
        return {
          listData: listData
        };
      default:
        return state;
    }
  }