const {default: axios} = require('axios');

function newsPromise(url){
    return new Promise((resolve, reject)=>{
        axios.get(url).then((res)=>{
            return resolve(res.data);
        }).catch(error =>{
            return reject(error);
        });
    });
}

module.exports = newsPromise;