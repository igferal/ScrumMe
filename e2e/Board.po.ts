import { Board } from './../src/app/model/board';
import { Utils } from './utils';
import { browser, element, by } from 'protractor';
import { protractor } from "protractor/built/ptor";

export class BoardPage {

    createCol() {

        Utils.clickButton("createCol");
        browser.driver.sleep(500);
        Utils.fillInputByXpath("/html/body/app-root/div/list/div/p-dialog/div/div[2]/createcolumn/form/input", "nuevaColumna");
        element(by.xpath("/html/body/app-root/div/list/div/p-dialog/div/div[2]/createcolumn/form/button")).click();

    }

    getElementById(name: string) {


        return element(by.id(name)).isPresent();

    }


    getElementTextById(name: string) {


        console.log(element(by.id(name)).getText());

    }

    getElementByXpath(xpath: string) {

        return element(by.id(xpath)).isPresent();

    }

    getElementTextByXpath(xpath: string) {

        return element(by.xpath(xpath)).getText();

    }

    editColumn() {

        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[3]/div/app-column/header/i");
        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[3]/div/app-column/header/p-menu/div/ul/li[1]/a");
        browser.driver.sleep(500);
        Utils.fillInputByXpath("/html/body/app-root/div/list/div/p-dialog[4]/div/div[2]/createcolumn/form/input", "editada");
        browser.driver.sleep(500);
        element(by.xpath("/html/body/app-root/div/list/div/p-dialog[4]/div/div[2]/createcolumn/form/button")).click();

    }

    deleteColumn() {

        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[3]/div/app-column/header/i");
        browser.driver.sleep(500);
        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[3]/div/app-column/header/p-menu/div/ul/li[2]/a");


    }

    createTask() {

        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[1]/div/app-column/header/i");
        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[1]/div/app-column/header/p-menu/div/ul/li[3]/a");
        Utils.fillInputByXpath("/html/body/app-root/div/list/div/p-dialog[2]/div/div[2]/createtask/form/input[1]", "T1");
        Utils.fillInputByXpath("/html/body/app-root/div/list/div/p-dialog[2]/div/div[2]/createtask/form/input[2]", "10");
        Utils.fillInputByXpath("/html/body/app-root/div/list/div/p-dialog[2]/div/div[2]/createtask/form/textarea", "Tarea de prueba");
        browser.driver.sleep(500);
        Utils.clickByXpath("/html/body/app-root/div/list/div/p-dialog[2]/div/div[2]/createtask/form/button");

    }



    editTask() {

        Utils.clickByXpath("//*[@id=\"noteKey\"]/header/i");
        Utils.clickByXpath("//*[@id=\"T1\"]/div/ul/li[1]/a");
        Utils.fillInputByXpath("/html/body/app-root/div/list/div/p-dialog[6]/div/div[2]/note-extended/section/header/input", "T1updated");
        Utils.clickButton("edit")
        
    }

    deleteTask(taskid :string) {
        Utils.clickByXpath("//*[@id=\"noteKey\"]/header/i");
        Utils.clickByXpath("//*[@id=\""+taskid+"\"]/div/ul/li[2]/a");
    }

    cargarHoras() {

        Utils.clickByXpath("//*[@id=\"noteKey\"]/header/i");
        Utils.clickByXpath("//*[@id=\"T1\"]/div/ul/li[3]/a");
        Utils.fillInput("inputCargarHoras", "5");
        Utils.clickButton("cargarHoras")

    }

    cerrarTarea() {

        Utils.clickByXpath("//*[@id=\"noteKey\"]/header/i");
        Utils.clickByXpath("//*[@id=\"T1\"]/div/ul/li[4]/a");

    }

    abrirIntegracionGit(){

        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[1]/div/app-column/header/i");
        Utils.clickByXpath("/html/body/app-root/div/list/div/section/div[1]/div/app-column/header/p-menu/div/ul/li[4]/a");
        browser.driver.sleep(500);
        Utils.clickByXpath("/html/body/app-root/div/list/div/p-dialog[3]/div/div[2]/github-issues/div/table/tbody/tr[2]/td[4]/button");
        Utils.clickByXpath("/html/body/app-root/div/list/div/p-dialog[3]/div/div[1]/a/span"); 

    }



}

