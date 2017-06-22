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
    Utils.fillInput("columns", "To do,Done");
    Utils.fillInput("gitHubRepo","nacho1014/ScrumMe")
    Utils.clickButton("enviar");
  }

  getElement(name: string) {

    return element(by.name(name)).isPresent();

  }


  getElementById(name: string) {


    return element(by.id(name)).isPresent();

  }

  deleteCard() {

    Utils.clickButton("botonborrar");
  }

  goToBoard() {

    Utils.clickButton("gotoboardsprint1");

  }

  edit() {

    Utils.clickByXpath("/html/body/app-root/div/dashboard/div/div[2]/section/board-card/section/div/div[2]/a[5]/i");
    Utils.fillInputByXpath("/html/body/app-root/div/dashboard/div/div[2]/section/board-card/p-dialog[1]/div/div[2]/createboard/div/form/fieldset/div/input[1]","sprint2");
    Utils.clickByXpath("/html/body/app-root/div/dashboard/div/div[2]/section/board-card/p-dialog[1]/div/div[2]/createboard/div/form/fieldset/div/button");


  }

  sendNotification(toWho: string) {

    Utils.clickButton("collabssprint1");
    browser.driver.sleep(1000);
    Utils.fillInput("mails", toWho);
    Utils.clickButton("addColabsprint1");

  }

  removeMessages() {

    element(by.xpath("/html/body/app-root/div/dashboard/div/div[2]/p-messages/div/a")).click();

  }



}
