import axios from 'axios';



export const call = async (method, path, data) => {
    const response = await axios[method](`/${path}`, data) // use bracket notation for whatever method is passed (get/post/etc)
}


export default {call};


api.call()