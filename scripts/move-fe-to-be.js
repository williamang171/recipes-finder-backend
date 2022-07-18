const fs = require("fs");
const ncp = require("ncp").ncp;

const backendBasePath = "../backend/app";
const backendStaticPath = "../backend/app/static";
const frontendBuildPath = "../frontend/build";

function removeStaticFiles() {
    if (fs.existsSync(backendStaticPath)) {
        fs.rmSync(backendStaticPath, { recursive: true });
        console.log(`✅ Removed ${backendStaticPath}`);
    }
}

function moveHtmlFile() {
    function updateHtmlFile() {
        const source = `${backendStaticPath}/index.html`;
        const data = fs.readFileSync(source).toString();
        let result = data.replace('href="/manifest.json"', 'href="/static/manifest.json"');
        result = result.replace('href="/logo192.png"', 'href="/static/logo192.png"')
        result = result.replace('href="/favicon.ico"', 'href="/static/favicon.ico"')
        fs.writeFileSync(source, result);
        console.log(`✅ Updated ${source} static file paths`);
    }

    updateHtmlFile();
    const source = `${backendStaticPath}/index.html`;
    const destination = `${backendBasePath}/templates/index.html`;

    fs.rename(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }

        console.log("✅ Moved index.html");
    });
}

function moveJsFiles() {
    const source = `${backendStaticPath}/static/js`;
    const destination = `${backendStaticPath}/js`;
    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        fs.rmSync(source, { recursive: true });
        console.log("✅ Moved js files");
        moveHtmlFile();
    });
}

// function moveCssFiles() {
//     const source = `${backendStaticPath}/static/css`;
//     const destination = `${backendStaticPath}/css`;
//     ncp(source, destination, function (err) {
//         if (err) {
//             return console.error(err);
//         }
//         fs.rmSync(source, { recursive: true });
//         console.log("✅ Moved css files");
//         moveJsFiles();
//     });
// }

function moveFeToBe() {
    ncp(frontendBuildPath, backendStaticPath, function (err) {
        console.log(`✅ Copied files from ${frontendBuildPath} to ${backendStaticPath}`);
        moveJsFiles();
    })
}

function main() {
    console.log("Moving frontend build folder to backend...");
    removeStaticFiles();
    moveFeToBe();
}

main();