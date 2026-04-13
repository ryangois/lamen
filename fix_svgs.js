const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const dir = 'public/assets/zodiac';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

async function processAll() {
    const { svgPathBbox } = await import('svg-path-bbox');
    for (const file of files) {
        const p = path.join(dir, file);
        const content = fs.readFileSync(p, 'utf8');
        
        try {
            const parser = new xml2js.Parser();
            const result = await parser.parseStringPromise(content);
            
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            
            // recursive function to find all paths
            function findPaths(obj) {
                if (!obj) return;
                if (obj.path) {
                    obj.path.forEach(pathNode => {
                        if (pathNode.$ && pathNode.$.d) {
                            const [x0, y0, x1, y1] = svgPathBbox(pathNode.$.d);
                            if (x0 < minX) minX = x0;
                            if (y0 < minY) minY = y0;
                            if (x1 > maxX) maxX = x1;
                            if (y1 > maxY) maxY = y1;
                        }
                    });
                }
                for (const key in obj) {
                    if (typeof obj[key] === 'object') {
                        findPaths(obj[key]);
                    }
                }
            }
            
            findPaths(result);
            
            if (minX !== Infinity) {
                const width = maxX - minX;
                const height = maxY - minY;
                
                // Set the exact viewbox
                if (result.svg && result.svg.$) {
                    result.svg.$.viewBox = `${minX} ${minY} ${width} ${height}`;
                }
                
                const builder = new xml2js.Builder();
                const newXml = builder.buildObject(result);
                // Also ensure white fills are kept explicitly
                const finalXml = newXml.replace(/fill="#000000"/g, 'fill="#ffffff"').replace(/fill="none"/g, 'fill="#ffffff"'); 
                fs.writeFileSync(p, finalXml);
            }
            
        } catch (e) {
            console.error("Error processing " + file, e);
        }
    }
}

processAll();
