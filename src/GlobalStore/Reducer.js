const global_state ={
    
    login: false,
    loading:false,
    loginmessage:"",
    role:"",
    username:""
       
};
const reducer = (state = global_state, action) => {
    const newState = {...state};

        if(action.type === 'loading')
    {
        newState.loading= true;
    }

    if(action.type === 'login')
    {
        newState.loading= false;
        newState.login= true;
        newState.role=action.role;
        newState.username=action.username;
    }
    if(action.type === 'logout')
    {
        newState.login= false;
    }
    if(action.type === 'wrongpassword')
    {
        newState.loginmessage="YOU HAVE ENTERED WRONG PASSWORD";
        newState.loading= false;
    }

    return newState;
}

export default reducer;