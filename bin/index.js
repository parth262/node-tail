const yargs = require('yargs');
const fs = require('fs');

const options  = yargs.usage("Usage: -N <n-lines>")
.option("N", {
    alias: "n-lines", 
    describe: "last n lines", 
    default: 10,
    type: "number"}).argv;

const file_path = "./test.txt";

function readFile(fp, n_lines) {
    fs.readFile(fp, 'utf8', (err, contents) => {
        if(err) {
            readFile(fp, n_lines);
        }
        console.clear();
        const lines = contents.split("\n").slice(-n_lines);
        console.log(lines.join("\n"));
    });
}

readFile(file_path, options.N);

fs.watch(file_path, (event, filename) => {
    if(filename && event === 'change') {
        readFile(file_path, options.N)
    }
})


