import * as puppeteer from "puppeteer"
import { Asserts } from "./Asserts.js";
export const Buttons = {
    "right": "right",
    "left": "left"
};
export class Page{
    /** @type {puppeteer.Browser} */
    /** @type {puppeteer.Page} */
    constructor(browser, page){
        this.browser = browser;
        this.page = page;
    }
    async goto(url, params){
        return await this.page.goto(url, params);
    }
    async setViewPort(w, h){
        return await this.page.setViewport({ width: w, height: h });
    }
    async type(selector, text){
        return await this.page.type(selector, text);
    }
    async click(selector, button){
        if (!button){
            button = Buttons.left;
        }
        Asserts.assertTrue(Buttons[button], `No such buton: ${button}`);
        console.log("Clicking selector: " + selector)
        return await this.page.click(selector, {button: button});
    }
    
    async waitForSelector(selector){
        return await this.page.waitForSelector(selector);
    }
    async screenshot(path){
        return this.page.screenshot({path: path});
    }
    async waitForNavigation(){
        return await this.page.waitForNavigation();
    }

    async evaluate(script, args){
        return this.page.evaluate(script, args);
    }
    async getHTML(){
        return this.evaluate(() => document.body.innerHTML);
    }

    async nativeClick(selector, button){
        if (!button){
            button = Buttons.left;
        }
        Asserts.assertTrue(Buttons[button], `No such buton: ${button}`);
        console.log("Native clicking selector: " + selector)
        return await this.evaluate((selector) => {
            var element = document.querySelector(selector);
            if(document.createEvent ) {
                ev = document.createEvent("MouseEvents");
                ev.initMouseEvent("click", true, false, window,0,0,0,0,0,false,false,false,false,2,null);
                element.dispatchEvent(ev);
            } else {
                ev = document.createEventObject();
                ev.button = 2;
                element.fireEvent('onclick', ev);
            }
        }, selector);
    }

}