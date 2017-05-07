import { browser, element, by } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getHeader() {

    return element(by.name('title')).getText();

  }

  getErrorElement() {

    let text = element(by.name('error')).getText();
    return text !== null;
  }

  fillForm(user: string, password: string) {
    let input;
    input = element(by.name('email')).click();
    input.sendKeys(user);
    input = element(by.name('password')).click();
    input.sendKeys(password);

  }

  sendForm() {

    element(by.name('sender')).click();

  }

}
