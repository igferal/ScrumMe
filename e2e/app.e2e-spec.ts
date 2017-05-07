import { LoginPage } from './Login.po.';
import { LandingPage } from './Landing.po';
import { browser } from 'protractor';

describe('Landing Page tests', function () {
  let page: LandingPage;

  beforeEach(() => {

    page = new LandingPage();
  });

  it('Debe aparecer un mensaje que diga Scrumme', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ScrumMe');
  });
});


describe('Login Page tests', function () {
  let page: LoginPage;

  beforeEach(() => {

    page = new LoginPage();
  });

  it('Debe aparecer un mensaje que diga Iniciar Sesión', () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Iniciar sesión');

  });
  it('Debe iniciar sesión aparecer un mensaje que diga Mis tableros', () => {
    page.navigateTo();
    page.fillForm("testuser@scrumme.es", "scrumme");
    page.sendForm();
    browser.driver.sleep(2000);
    expect(page.getHeader()).toEqual('Mis tableros');
  });

  it('No debe iniciar sesión', () => {
    page.navigateTo();
    page.fillForm("testuser@scrumme.es", "nocontraseña");
    page.sendForm();
    browser.driver.sleep(2000);
    page.getErrorElement();
    expect(page.getErrorElement()).toBeTruthy();
    expect(page.getHeader()).toEqual('Iniciar sesión');
  });

});
