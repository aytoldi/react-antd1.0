let mockUrl = 'https://www.easy-mock.com/mock/5c8b7fad0e11997fba90a52f/ERP/';
//请求路径
let request = {
    userLogin: mockUrl + 'userLogin',
    register: mockUrl + 'register',
    list: mockUrl + 'pagenation/list',
    cart: mockUrl + 'cart',
    linkAdd: mockUrl + 'linkAdd',
    linkEdit: mockUrl + 'linkEdit',
    //城市
    city: mockUrl + 'city',
    order: mockUrl + 'order',
    menuList:mockUrl+'menuList'
}

/*
let obj = {};
for (let val in request) {
    obj[val] = `${mockUrl}${val}`
}
*/

export default {...request};
