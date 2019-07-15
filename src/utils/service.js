import requestAll from './http.js';
import apiUrl from './request'

//请求方法
const service = {
    renderPageList(params) {
        return requestAll.get(apiUrl.list, params);
    },
    menuList(params) {
        return requestAll.get(apiUrl.menuList, params);
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
    city(params) {
        return requestAll.get(apiUrl.city, params);
    },
    order(params) {
        return requestAll.get(apiUrl.order, params);
    }
}

export default service
