const fs = require('fs/promises');
const path = require('path');

async function* walk(dir) {
    for await (const d of await fs.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) {
            yield* walk(entry); // Recursively call and yield from the subdirectory
        } else if (d.isFile()) {
            yield entry; // Yield the file path
        }
    }
}

(async () => {
    const directoryPath = './node_modules'; // Replace with your path
    console.log(`--- Files in ${directoryPath} ---`);
    for await (const p of walk(directoryPath)) {
        console.log(p);
    }
})();
