
const state = {
    postForm: {},
}

const mutations = {
        updataPageCont(state,payload){
            console.log(payload)
            state.postForm =payload;
        }
}

const actions = {
    
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

