export class Asserts{
    static equals(a, b, message){
        if ( a != b){
            throw new Error(message || `${a} != ${b}`);
        }
    }
    static assertTrue(a, message){
        if ( !a ){
            throw new Error(message || `${a} is not true`);
        }
    }
}