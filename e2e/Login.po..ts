import { Utils } from './utils';
import { browser, element, by } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  navigateToEdit(){

      return browser.get('/signup');
  }

  getHeader() {

    return element(by.name('title')).getText();

  }

  editUser(oldpass,newpass){

    Utils.fillInput("oldpass",oldpass);
    Utils.fillInput("password",newpass);
    Utils.fillInput("passwordAgain",newpass);
    browser.driver.sleep(3000);
    Utils.clickByXpath("/html/body/app-root/div/signup/div/div[2]/form/div/button");

    Utils.clickByXpath("/html/body/app-root/header/div[2]/div[4]/a");
  }

  getErrorElement() {

    let text = element(by.name('error')).getText();
    return text !== null;
  }



  fillForm(user: string, password: string) {
    let input;
    input = element(by.name('email')).click();
    input.clear();
    input.sendKeys(user);
    input = element(by.name('password')).click();
    input.clear();
    input.sendKeys(password);
    
  

  }

  sendForm() {

    element(by.name('sender')).click();

  }

  login(user: string, password: string){

    this.fillForm(user, password);
    this.sendForm();
    browser.driver.sleep(2000);

  }

}
