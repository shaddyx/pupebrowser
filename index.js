import {Browser} from "./Browser.js"
import {Time} from "./Time.js"
import fs from "fs";
(async function(){
    let a = new Browser({headless: false});
    const pg = await a.newPage("http://google.com", {waitUntil: 'load', timeout: 10000});
    try{
        await pg.waitForSelector("[type='submit']");
        console.log("waiting for navigation..");
        //await pg.waitForNavigation();
        console.log("Typing...");
        await pg.type("[type='text']", "test search");
        fs.writeFileSync("out0.html", await pg.getHTML());
        console.log("clicking...");
        await pg.nativeClick('#tsf > div:nth-child(2) > div.A8SBwf > div.FPdoLc.tfB0Bf > center > input.gNO89b');
        console.log("screenshot...");
        await pg.screenshot("1.png");
        await Time.sleep(1000);
        console.log("html...");
        fs.writeFileSync("out.html", await pg.getHTML());
    } finally{
        await a.close();
    }
})().then( o=> {
    console.log("Finished");
});

