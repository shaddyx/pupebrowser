import puppeteer from "puppeteer"
import {Page} from "./Page.js"

export class Browser{
    constructor(params){
        this.params = params || {};
        this.params.defaultNavigationTimeout = this.params.defaultNavigationTimeout || 30000;
    }

    async init(){
        this.browser = await puppeteer.launch(this.params);
    }
    /**
     * 
     * @param {string} url 
     * @returns {Page}
     */
    async newPage(url, params){
        if (!this.browser){
            await this.init();
        }
        console.log(`opening page ${url}`);
        const page = new Page(this, await this.browser.newPage());
        //await page.setDefaultNavigationTimeout(this.params.defaultNavigationTimeout);
        if (url){
            await page.goto(url, params);
        }
        return page;
    }
    
    async close(){
        console.log("closing browser");
        this.browser && this.browser.close();
    }
}
