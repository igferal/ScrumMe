import { LoginPage } from './Login.po.';
import { LandingPage } from './Landing.po';
import { browser } from 'protractor';
import { DashboardPage } from "./Dashboard.po";

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
    page.login("testuser@scrumme.es", "scrumme");
    expect(page.getHeader()).toEqual('Mis tableros');
  });

  it('No debe iniciar sesión', () => {
    page.navigateTo();
    page.login("testuser@scrumme.es", "nocontraseña");
    page.getErrorElement();
    expect(page.getErrorElement()).toBeTruthy();
    expect(page.getHeader()).toEqual('Iniciar sesión');
  });

});

describe('Dashboard Page tests', function () {
  let login: LoginPage;
  let page: DashboardPage;


  beforeEach(() => {

    login = new LoginPage();
    page = new DashboardPage();
    login.navigateTo();
    login.login("testuser@scrumme.es", "scrumme");
    

  });

  it('Debe aparecer una nueva carta de tablon', () => {
    
    browser.driver.sleep(500);
    page.createCard();
    browser.driver.sleep(1000);
    expect(page.getElement("gotoboardsprint1")).toBeTruthy();

  });

    it('Debe crear un tablero con las columnas indicadas', () => {
    
    browser.driver.sleep(1500);
    page.goToBoard();
    browser.driver.sleep(1000);
    expect(page.getElementById("columnTo do")).toBeTruthy();
        expect(page.getElementById("columnDone")).toBeTruthy();



  });


  it('Debe desaparecer la carta del tablon cuando la borro', () => {

    browser.driver.sleep(1000);
    page.deleteCard();
    browser.driver.sleep(1000);
    expect(page.getElement("sprint1")).toBeFalsy();

  });



});

