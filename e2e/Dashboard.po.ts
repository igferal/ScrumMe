import { Utils } from './utils';
import { browser, element, by } from 'protractor';

export class DashboardPage {

  navigateTo() {
    return browser.get('/dashboard');
  }

  createCard() {


    Utils.clickButton("createboard");
    browser.driver.sleep(500);
    Utils.fillInput("name", "sprint1");
    Utils.fillInput("date", "12/12/2017");
    Utils.fillInput("columns", "To do");
    Utils.clickButton("enviar");

  }

  getCard() {

    return element(by.name("sprint1")) !== null

  }

  deleteCard() {

    Utils.clickButton("botonborrar");
  }

}
