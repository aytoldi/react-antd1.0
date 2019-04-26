let initState={
    token: localStorage.getItem('token') || '',
    user: {},//解析token之后获取用户的信息
}

function reducer(state=initState,action={}) {
    console.log(action,68);
    if(action.type==='auth_success'){
        return  {...state,token:action.token};
    }
    return state;
}

export default reducer;