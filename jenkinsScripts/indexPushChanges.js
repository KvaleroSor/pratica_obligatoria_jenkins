const { exec } = require('child_process');

async function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${stderr}`);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

async function main() {
    const executor = process.argv[2];
    const motiu = process.argv[3];
    const githubUser = process.env.GITHUB_USER;
    const githubPassword = process.env.GITHUB_PASSWORD;

    const commitMsg = `Pipeline executada per ${executor}. Motiu: ${motiu}`;
    const gitUsername = 'KvaleroSor';
    const gitUserEmail = 'kvalerosor@hotmail.com';
    
    try {
        console.log('Configurant git');
        const configName = await runCommand(`git config --global user.name "${gitUsername}"`);
        console.log('Config Name:', configName.stdout, configName.stderr);
        const configEmail = await runCommand(`git config --global user.email "${gitUserEmail}"`);
        console.log('Config Email:', configEmail.stdout, configEmail.stderr);

        console.log('Afegint canvis...');
        const addChanges = await runCommand('git add .');
        console.log('Add Changes:', addChanges.stdout, addChanges.stderr);

        console.log('Verificant estat de git abans del commit:');
        const statusBeforeCommit = await runCommand('git status');
        console.log('Status Before Commit:', statusBeforeCommit.stdout, statusBeforeCommit.stderr);

        console.log('Fent commit dels canvis...');
        const commitResult = await runCommand(`git commit -m "${commitMsg}"`);
        console.log('Commit Result:', commitResult.stdout, commitResult.stderr);

        console.log('Verificant estat de git després del commit:');
        const statusAfterCommit = await runCommand('git status');
        console.log('Status After Commit:', statusAfterCommit.stdout, statusAfterCommit.stderr);

        console.log('Fent push dels canvis...');
        const setUrlResult = await runCommand(`git remote set-url origin https://${githubUser}:${githubPassword}@github.com/KvaleroSor/pratica_obligatoria_jenkins.git`);
        console.log('Set URL Result:', setUrlResult.stdout, setUrlResult.stderr);
        const pushResult = await runCommand('git push origin HEAD:ci_jenkins');
        console.log('Push Result:', pushResult.stdout, pushResult.stderr);
        
        console.log('Canvis afegits correctament.');
    } catch (error) {
        console.error('Error al intentar pujar els canvis:');
        if (error.stderr) {
            console.error('stderr:', error.stderr);
        }
        if (error.stdout) {
            console.error('stdout:', error.stdout);
        }
        if (error.message) {
            console.error('message:', error.message);
        }
        process.exit(1);
    }
}

main();
