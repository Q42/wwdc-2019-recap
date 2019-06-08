const fs = require("fs");
const files = fs.readdirSync("docs");
const docs = files.filter((name) => name.endsWith(".md")).reduce((list, name) => {
    return [...list, {
        name: name.replace(".md", ""),
        body: fs.readFileSync(`docs/${name}`, { encoding: "utf8" }),
    }];
}, []);
fs.writeFileSync("docs.json", JSON.stringify(docs, null, 2));