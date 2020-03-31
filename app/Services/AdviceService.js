import Advice from "../Models/Advice.js";
import store from "../store.js"
import ns from "../Services/NotificationService.js"

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
        ns.toast("got advice")
        let adviceData = new Advice(res.data.slip)
        store.commit('advice', [adviceData])
      })
  }
  getMyAdvice() {
    console.log("Getting the Advice List")
    adviceApi.get("Tim/advice")
      .then(res => {
        let adviceData = res.data.map(a => new Advice(a))
        store.commit('myAdvice', adviceData)
      })
  }
  saveAdvice(id) {
    let advice = store.State.advice.find(advice => advice._id == id)
    if (advice) {
      adviceApi.post("Tim/advice", advice)
        .then(res => {
          let newAdvice = store.State.myAdvice
          newAdvice.push(advice)
          store.commit("myAdvice", newAdvice)
        })
        .catch(err => store.commit('error', err.response))
    }
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


  async removeAdvice(adviceId) {
    try {
      await ns.confirmDelete()
      adviceApi.delete(adviceId)
      let index = store.State.myAdvice.findIndex(a => a._id == adviceId)
      store.State.myAdvice.splice(index, 1)
      store.commit('myAdvice', store.State.myAdvice)
    } catch (error) {
      throw new Error(error)
    }
  }

}
const service = new AdviceService();
export default service;
