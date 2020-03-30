import AdviceService from "../Services/AdviceService.js";
import store from "../store.js";
// import _ns from "../Services/NotificationService.js"


//TODO Create the render function
function _drawAdvice() {
  console.log("hi from advice");
  let counter = 0
  let template = ''
  let advice = store.State.advice
  // console.log("from draw", advice)
  // debugger
  advice.forEach(a => {
    template += a.Template
    counter++
  })
  // document.getElementById('counter').innerHTML = counter.toString()
  document.getElementById('advice').innerHTML = template

  template = ""
  let myAdvice = store.State.myAdvice
  myAdvice.forEach(a => {
    template += a.Template
    // counter++
  })
  document.getElementById('myAdvice').innerHTML = template

}


//NOTE Keep an eye on your console for any of these errors
function _drawError() {
  console.error('[TODO ERROR]', AdviceService.AdviceError)
}

export default class AdviceController {
  constructor() {
    store.subscribe('advice', _drawAdvice)
    store.subscribe("myAdvice", _drawAdvice)
    AdviceService.getMyAdvice()
    AdviceService.getAdvice()
  }

  saveAdvice(id) {
    // _ns.toast("Ello")
    AdviceService.saveAdvice(id)
  }

  toggleAdviceStatus(adviceId) {
    // _ns.toast("Ello")
    AdviceService.toggleAdviceStatus(adviceId)
  }

  removeAdvice(adviceId) {
    AdviceService.removeAdvice(adviceId)
  }



}
