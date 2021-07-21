// import { LOG_IN } from '../constants';
// export const setUser = (data) => {
//     return {
//         type: LOG_IN,
//         data
//     }
// }
import { LOG_IN, LOG_OUT } from '../constants';
export const setUser = (data) => {
    return {
        type: LOG_IN,
        data
    }
}
export const LogOut = (data) => {
    return {
        type: LOG_OUT,
        data
    }
}
