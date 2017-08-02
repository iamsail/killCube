let fs = require('fs');
let file = 'notes.json';
// function to encode file data to base64 encoded string
 let base64Encode = (file) => {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
};
fs.readdir('.', function(error, files) {
    let content = "";
    files.forEach((f, index) => {
        if(/^\d/.test(f)) {
            let data = base64Encode(f);
            content += `"${data}",\n`;
        }
    });
    fs.writeFileSync(file, content);
});