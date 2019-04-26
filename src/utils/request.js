let mockUrl = 'https://www.easy-mock.com/mock/5c8b7fad0e11997fba90a52f/ERP/';
let request = {
    userLogin: mockUrl+'userLogin',
    register: 'mockUrl+register',
    list: mockUrl+'pagenation/list',
    cart: mockUrl+'cart',
    linkAdd: mockUrl+'linkAdd',
    linkEdit: mockUrl+'linkEdit',
}

/*
let obj = {};
for (let val in request) {
    obj[val] = `${mockUrl}${val}`
}
*/

export default {...request};