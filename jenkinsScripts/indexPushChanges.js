const { exec } = require('child_process');

async function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function main() {
    const executor = process.argv[2];
    const motiu = process.argv[3];

    const commitMsg = `Pipeline executada per ${executor}. Motiu: ${motiu}`;

    try {
        console.log('Afegint canvis...');
        await runCommand('git add README.md');

        console.log('Fent commit dels canvis...');
        await runCommand(`git commit -m "${commitMsg}"`);

        console.log('Fent push dels canvis...');
        await runCommand('git push origin main');
        
        console.log('Canvis afegits correctament.');
    } catch (error) {
        console.error(`Error al intentar pujar els canvis: ${error}`);
        process.exit(1);
    }
}

main();
