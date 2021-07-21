// import { LOG_IN } from '../constants';
// const initialState = { user: null };
// export default (state = initialState, action) => {
//     if (action.type === LOG_IN) {
//         return {
//             ...state,
//             user: action.data
//         };
//     }
//     return { ...state };
// };
import { LOG_IN, LOG_OUT } from '../constants';
const initialState = { user: null };
export default (state = initialState, action) => {
    switch (action.type) {
        case  LOG_IN  :
            return {
                ...state,
                user: action.data
            }

        case LOG_OUT:
            return {
                ...state,
                user: null
            }
    }
    return { ...state };
}



