import { combineReducers } from "redux";
import { RECEIVE_ANNOTATIONS, SWITCH_ACTIVE_SELECTION } from "./actions";


function annotationReducer (state = null, action)
{
    switch (action.type)
    {
        case (RECEIVE_ANNOTATIONS):
            return action.payload;
        default:
            return state;
    }
}

function activeSelectionReducer (state = "", action)
{
    switch (action.type)
    {
        case (SWITCH_ACTIVE_SELECTION):
            return action.payload;
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    annotations: annotationReducer,
    activeSelection: activeSelectionReducer
});

export default rootReducer
