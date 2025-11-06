const fs = require('fs').promises;
const path = require('path');

async function readJsonFile(fileName) {
    const filePath = path.join(__dirname, '../data', fileName);
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    return json.data || json;
}

async function writeJsonFile(fileName, data) {
    const filePath = path.join(__dirname, '../data', fileName);
    await fs.writeFile(filePath, JSON.stringify({ data }, null, 4));
}

module.exports = { readJsonFile, writeJsonFile };
