import Advice from "../Models/Advice.js";
import store from "../store.js"

//NOTE your service is all set up for the observer pattern but there is still work to be done

// @ts-ignore
const adviceApi = axios.create({
  baseURL: 'http://osrshelper.herokuapp.com/api',
  timeout: 3000
});


class AdviceService {
  get AdviceError() {
    return store.State.error
  }


  getAdvice() {
    console.log("Getting the Advice List")
    adviceApi.get("advice")
      .then(res => {
        let adviceData = new Advice(res.data.slip)
        store.commit('advice', [adviceData])
      })
  }


  toggleAdviceStatus(adviceId) {
    let advice = store.State.advice.find(advice => advice._id == adviceId)
    if (advice) {
      if (advice.completed == true) {
        advice.completed = false
      } else {
        advice.completed = true
      }
      adviceApi.put(adviceId, advice)
        .then(res => {
          store.commit("advice", store.State.advice)
        })
        .catch(err => store.commit('error', err.response.data))
      return

    }
  }


  removeAdvice(adviceId) {
    adviceApi.delete(adviceId)
      .then(res => {
        let index = store.State.advice.findIndex(a => a._id == adviceId)
        store.State.advice.splice(index, 1)
        store.commit('advice', store.State.advice)
      })
  }

}
const service = new AdviceService();
export default service;
