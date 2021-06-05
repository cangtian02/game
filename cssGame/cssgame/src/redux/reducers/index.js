import { combineReducers } from 'redux';
import { SET_MASK_FLAG } from './../actions/index';

const maskFlag = (state = false, action) => {
    switch (action.type) {
        case SET_MASK_FLAG:
            return action.maskFlag;
        default:
            return state;
    }
};

export default combineReducers({
    maskFlag,
});
