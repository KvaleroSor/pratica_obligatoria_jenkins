let result_linter = process.argv[2];

console.log('Result en l´arxiu stdout -> ' + result_linter);

result_linter = '1';

if (result_linter.toString() === '0') {
    console.log('Linter no ha encontrat ningún error... ✅');    
} else {
    console.log('Linter ha encontrat errores... ❌');
    // process.exit(1);    
}
