const json2ts = require('json-schema-to-typescript');
const fs = require('fs');
const path = require('path');
const mkdirpsync = require('mkdirpsync');

const outPath = [];

function compileFile(filePath) {
  return json2ts.compileFromFile(filePath, {
    ignoreMinAndMaxItems: true,
    strictIndexSignatures: true,
  });
}

function buildSchemas(baseDir, dir) {
  const files = fs.readdirSync(path.join(...baseDir, ...dir));
  files.sort((lhs, rhs) => {
    const lhsLower = lhs.toLowerCase();
    const rhsLower = rhs.toLowerCase();
    return lhsLower.localeCompare(rhsLower);
  });

  // iterate files and folders
  files.forEach((file) => {
    const filePath = path.join(...baseDir, ...dir, file);
    const stats = fs.statSync(filePath);
    // recursively search through all folders
    if (stats.isDirectory()) {
      buildSchemas(baseDir, [...dir, file]);
    }
    // and build TS-interfaces for *.schema.json files
    else if (stats.isFile() && file.endsWith('.schema.json')) {
      const name = file.replace('.schema.json', '');
      console.log(name, '->', filePath);
      compileFile(filePath)
        .then((ts) => {
          const outFolder = path.join(...outPath, ...dir);
          const outName = path.join(outFolder, name + '.schema.ts');
          console.log('Generated content for', outName, ', writing to file...');
          if (!fs.existsSync(outFolder)) {
            console.log(`generating missing (sub)folder(s) ${outFolder}}`);
            mkdirpsync(outFolder);
          }
          fs.writeFileSync(outName, ts);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    }
  });
}

function main() {
  if (process.argv.length < 4) {
    console.warn('Usage: script <PATH_TO_SCHEMA_BASE>');
    return 1;
  }
  const argPath = path.normalize(process.argv[2]);
  const argOut = path.normalize(process.argv[3]);

  const basePath = argPath.split(path.sep);
  outPath.push(...argOut.split(path.sep));

  buildSchemas(basePath, []);
}
main();
