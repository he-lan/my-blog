const common = {
    state: {
        showEdit: false,
        editId: 0,
        searchBlogs: [],
        searchType: false,
        // window.sessionStorage.getItem("name")设置为默认值，则刷新页面时去session里面找保存的相关数据
        userName: window.sessionStorage.getItem('userName'),
        token: window.sessionStorage.getItem('token'),
        userId: window.sessionStorage.getItem('userId'),
        role: false,
    },
    mutations: {
        SET_SHOWEDIT: (state, val) => {
            state.showEdit = val;
        },
        SET_EDITID: (state, val) => {
            state.editId = val;
        },
        SET_SEARCHBLOGS: (state, val) => {
            state.searchBlogs = val;
        },
        SET_SEARCHTYPE: (state, val) => {
            state.searchType = val;
        },
        SET_USERNAME: (state, val) => {
            state.userName = val;
        },
        SET_TOKEN: (state, val) => {
            state.token = val;
        },
        SET_USERID: (state, val) => {
            state.userId = val;
        },
        SET_ROLE: (state, val) => {
            state.role = val;
        },
    }
}

export default common