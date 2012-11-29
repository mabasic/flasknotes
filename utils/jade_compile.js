/*
 * This script takes 2 arguments, first is path to templates dir,
 * and second is path to folder where to put compiled templates.js
 *
 * It scans templates dir, takes all .jade files and compiles them
 * as Jade templates. Then it writes all template functions to
 * single output file templates.js
 */

var fs = require('fs');
var jade = require('jade');

function isJadeTemplate(file) {
    var extension = file.split('.').pop();
    if (extension == "jade" ) {
        return true;
    }
    return false;
}

function getFilename(file) {
    return file.split(".")[0];
}

/*
 * Main
 */
var templatesDir = process.argv[2];
var files = fs.readdirSync(templatesDir);

var functions = {};
var buffer = "";
for (var f in files) {
    var file = files[f];
    if (!isJadeTemplate(file)) continue;

    contents = fs.readFileSync(templatesDir + file);
    options = {
        client:true,
        compileDebug:false,
        filename: templatesDir + file
    }
    compiledFunction = jade.compile(contents, options);
    buffer += "var " + getFilename(file) + " = " + compiledFunction + "\n";
}


outputDir = process.argv[3];
fs.writeFileSync(outputDir + 'templates.js', buffer);

//node utils/jade_compile.js folder gdje se nalaze jade file , folder za file templates.js