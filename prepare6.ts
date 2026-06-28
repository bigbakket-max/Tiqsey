import * as fs from "fs";

let code = fs.readFileSync("src/data/mockData.ts", "utf8");
code = code.replace(/import lindtImage from "[^"]+";/, "const lindtImage = 'lindtImage';");

fs.writeFileSync("src/data/mockDataTemp.ts", code);
