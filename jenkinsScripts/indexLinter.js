const result_linter = process.argv[2];

console.log('Result en l´arxiu stdout -> ' + result_linter);

if (result_linter.toString() == '0') {
    console.log('Linter no ha encontrado ningún error... ✅');    
} else {
    console.log('Linter ha encontrado errores... ❌');
    process.exit(1);    
}
