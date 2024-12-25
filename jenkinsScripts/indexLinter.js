const result_linter = process.argv[2];

console.log('Result en l´arxiu stdout -> ' + result);

console.log('Resultat -> ' + result);
if (result.toString() == '0') {
    console.log('Linter no ha encontrado ningún error... ✅');
    return 'Linter no ha encontrado ningún error... ✅';
} else {
    console.log('Linter ha encontrado errores... ❌');
    process.exit(1);
    return 'Linter ha encontrado errores... ❌';
}
