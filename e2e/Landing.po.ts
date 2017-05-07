import { browser, element, by } from 'protractor';

export class LandingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {

    return element(by.name('title')).getText();
  }
}
