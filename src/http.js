import * as b from "./business.js";

export default () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: new b.default.BaseCustomer() });
        }, 100);
    });
}

export function errAsync() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("ERROR!!!");
        }, 100);
    });
}

export const success = new Promise(resolve => {
    setTimeout(() => {
        resolve("success!");
    }, 100);
});