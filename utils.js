const fs = require('fs');


function writeDataToFiles(fileName, fileContent) {
    fs.writeFileSync(fileName, JSON.stringify(fileContent), 'utf8');
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';   //the chunk here is the 'Buffer' object 
            req.on('data', (chunk) => {   //sets up the event listener 'data' event listener  
                body += chunk.toString();      
            });

            req.on('end', () => {     //sets up the 'end' event listener 
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {writeDataToFiles, getPostData};