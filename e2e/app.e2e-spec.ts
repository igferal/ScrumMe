import { CollabsPage } from './Collabs.po';
import { LoginPage } from './Login.po.';
import { LandingPage } from './Landing.po';
import { browser, element, by } from 'protractor';
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
    browser.driver.sleep(1500);
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

  it('Debe aparecer un mensaje diciendo que ha fallado la peticion', () => {

    browser.driver.sleep(500);
    page.createCard();
    browser.driver.sleep(1000);
    page.sendNotification("A@A.ES");
    browser.driver.sleep(1000);
    expect(element(by.xpath("/html/body/app-root/div/dashboard/div/div[2]/p-messages/div/ul/li/span[1]")).getText()).toBe("Error!");
    page.removeMessages();

  });


  it('Debe aparecer un mensaje diciendo que se ha enviado la petición', () => {

    browser.driver.sleep(500);
    page.sendNotification("testuser2@scrumme.es");
    browser.driver.sleep(1000);
    expect(element(by.xpath("/html/body/app-root/div/dashboard/div/div[2]/p-messages/div/ul/li/span[1]")).getText()).toBe("Completado!");
    page.removeMessages();

  });

});



describe('Collab Page tests', function () {

  let login: LoginPage;
  let dashboard: DashboardPage;
  let collabs: CollabsPage;

  beforeEach(() => {

    login = new LoginPage();
    dashboard = new DashboardPage();
    collabs = new CollabsPage();


  });

  it('Debe aparecer una petición de colaboración', () => {

    login.navigateTo();
    login.login("testuser2@scrumme.es", "scrumme");
    collabs.navigateTo();
    browser.driver.sleep(1500);
    expect(collabs.getHeader("title")).toEqual('Invitaciones a colaborar');
    expect(collabs.getCardHeaderText()).toEqual('sprint1');


  });


  it('Debe desaparecer la petición cuando la declinamos', () => {
    login.navigateTo();
    login.login("testuser2@scrumme.es", "scrumme");
    collabs.navigateTo();
    browser.driver.sleep(1500);
    collabs.declineCollab();
    browser.driver.sleep(500);
    expect(collabs.getCardHeaderTextPresent()).toBeFalsy();
  });


  it('Creamos otra petición al mismo usuario', () => {
    login.navigateTo();
    login.login("testuser@scrumme.es", "scrumme");
    browser.driver.sleep(500);
    dashboard.sendNotification("testuser2@scrumme.es");
    browser.driver.sleep(1000);
    expect(element(by.xpath("/html/body/app-root/div/dashboard/div/div[2]/p-messages/div/ul/li/span[1]")).getText()).toBe("Completado!");
    dashboard.removeMessages();

  });

  it('Debe aparcer la petición en nuestro dashboard si la aceptamos', () => {
    login.navigateTo();
    login.login("testuser2@scrumme.es", "scrumme");
    collabs.navigateTo();
    browser.driver.sleep(2000);
    collabs.acceptCollab()
    dashboard.navigateTo();
    browser.driver.sleep(1500);
    expect(dashboard.getElement("gotoboardsprint1")).toBeTruthy();
    dashboard.deleteCard();

 
 });




});