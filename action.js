// Requires and variable definition
const log = require('loglevel')
const fs = require('fs')
const core = require('@actions/core');

// Set default log level or read the environment setting
log.setLevel(process.env.LOG_LEVEL || 'info')

const packageName = core.getInput('PACKAGE_NAME', { required: false });
if (packageName == undefined || packageName.length == 0){
    log.info("PACKAGE_NAME is missing")
    process.exit(0)
}
log.info("incrementing package: " + packageName)

const filename = "sfdx-project.json"
let file = JSON.parse(fs.readFileSync(filename))

file.packageDirectories.forEach(packageDirectory => {
    if(packageDirectory.package != packageName) {
        return;
    }

    let currentVersionArray = packageDirectory.versionNumber.split(".")
    let currentMinorVersionNumber = parseInt(currentVersionArray[1])
    let newMinorVersionNumber = currentMinorVersionNumber + 1

    let versionName = "ver " + currentVersionArray[0] + "." + newMinorVersionNumber + "." + currentVersionArray[2]
    let versionNumber = currentVersionArray[0] + "." + newMinorVersionNumber + "." + currentVersionArray[2] + ".NEXT"

    packageDirectory.versionName = versionName
    packageDirectory.versionNumber = versionNumber
    
    const ancestorId = core.getInput('ANCESTOR_ID', { required: false });
    if (ancestorId != undefined && ancestorId.length != 0 && ancestorId.startsWith('04t')){
        packageDirectory.ancestorId = ancestorId
    }

    log.info("incremented values")
    log.info(packageDirectory)
    log.info("saving")

    let data = JSON.stringify(file, null, 4);
    core.setOutput('SFDX_PROJECT', data);
    fs.writeFileSync(filename, data);
});
