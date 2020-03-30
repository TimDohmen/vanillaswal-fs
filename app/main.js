import AdviceController from "./Controllers/AdviceController.js";


class App {
  adviceController = new AdviceController();
}

window["app"] = new App();
