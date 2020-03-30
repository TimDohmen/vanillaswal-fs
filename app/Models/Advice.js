
export default class Advice {
  constructor(data) {
    this._id = data._id || data.slip_id
    this.completed = data.completed || false
    this.description = data.description || data.advice
    this.user = data.user

  }

  get Template() {
    return `
<div class="w3-container w3-center">
 <div class="checkbox">
              <label>
              <input type="checkbox" name="checkedAdvice" ${this.completed ? "checked" : ""} onclick="app.adviceController.toggleAdviceStatus('${this._id}')">
              <span>
              ${this.description}</label>
              <button class="btn btn-primary" onclick="app.adviceController.saveAdvice('${this._id}')">
              <span  class="deleteX"> Save Me </span>
              </span> 
              </button>
              </div>
              </div >
</div>

    `
  }
}