import AdviceService from "../Services/AdviceService.js";
import store from "../store.js";
import _ns from "../Services/NotificationService.js"


//TODO Create the render function
function _drawAdvice() {
  console.log("hi from advice");
  let counter = 0
  let template = ''
  let advice = store.State.advice
  // console.log("from draw", advice)
  advice.forEach(a => {
    template += a.Template
    counter++
  })
  document.getElementById('counter').innerHTML = counter.toString()
  document.getElementById('advice').innerHTML = template
}


//NOTE Keep an eye on your console for any of these errors
function _drawError() {
  console.error('[TODO ERROR]', AdviceService.AdviceError)
}

export default class AdviceController {
  constructor() {
    store.subscribe('advice', _drawAdvice)
    AdviceService.getAdvice()
  }

  addAdvice(e) {
    e.preventDefault()
    _ns.toast("Ello")
    var form = e.target
    AdviceService.addAdvice()
  }

  toggleAdviceStatus(adviceId) {
    _ns.toast("Ello")
    AdviceService.toggleAdviceStatus(adviceId)
  }

  removeAdvice(adviceId) {
    AdviceService.removeAdvice(adviceId)
  }



}
