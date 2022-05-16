import { get } from 'superagent'

export const getApiCall = (url) => {
    return new Promise((resolve, reject) => {
        get(url, (err, res) => {
            if (res?.body) {
                resolve(res.body);
            }
            reject(err);
        });
    });
}