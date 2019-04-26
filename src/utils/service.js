import requestAll from './http.js';
import apiUrl from './request'



const service = {
    renderPageList(params) {
        return requestAll.get(apiUrl.list, params);
    },
    cart() {
        return requestAll.get(apiUrl.cart);
    },
    linkAdd() {
        return requestAll.post(apiUrl.linkAdd);
    },
    linkEdit() {
        return requestAll.get(apiUrl.linkEdit);
    },


}

export default service