
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
              <span onclick="app.adviceController.removeAdvice('${this._id}')" class="deleteX"> X </span>
              </span> 
              </div>
              </div >
</div>

    `
  }
}