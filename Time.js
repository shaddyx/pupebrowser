export class Time{
    static sleep(timeout){
        return new Promise((resolve, reject) => {
            setTimeout(resolve, timeout);
        });
    }
}