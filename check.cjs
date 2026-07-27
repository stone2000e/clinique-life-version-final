const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const assetsDir = path.join(process.cwd(), 'src', 'assets');
const assetFiles = walk(assetsDir).map(f => path.relative(process.cwd(), f).replace(/\\/g, '/'));

const srcFiles = walk(path.join(process.cwd(), 'src')).filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css'));

srcFiles.forEach(src => {
    const content = fs.readFileSync(src, 'utf-8');
    // Match import ... from ".../assets/..."; or url(".../assets/...")
    const regex = /(?:from\s+['"]|import\s+['"]|url\(['"]?)(.*?assets.*?)(?:['"]\)?)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const importPath = match[1];
        const parts = importPath.split('/');
        const fileName = parts[parts.length - 1];
        
        const exactMatch = assetFiles.find(a => a.endsWith('/' + fileName));
        if (!exactMatch) {
            const looseMatch = assetFiles.find(a => a.toLowerCase().endsWith('/' + fileName.toLowerCase()));
            if (looseMatch) {
                console.log(`CASE_MISMATCH: File ${src} imports '${fileName}' but actual file is '${path.basename(looseMatch)}'`);
            } else {
                console.log(`MISSING_FILE: File ${src} imports '${fileName}' which does not exist in assets`);
            }
        }
    }
});
