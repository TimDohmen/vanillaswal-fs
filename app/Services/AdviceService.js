import Advice from "../models/advice.js";
import store from "../store.js"

//NOTE your service is all set up for the observer pattern but there is still work to be done

// @ts-ignore
const adviceApi = axios.create({
  baseURL: 'http://osrshelper.herokuapp.com/api/advice/',
  timeout: 3000
});


class AdviceService {



  getAdvices() {
    console.log("Getting the Advice List")
    adviceApi.get()
      .then(res => {
        let adviceData = res.data.data.map(a => new Advice(a))
        store.commit('advice', adviceData)
      })
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
