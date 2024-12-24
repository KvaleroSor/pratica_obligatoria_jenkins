const result = process.argv[3];

console.log('Result en l´arxiu indexLinter -> ' + result);

console.log('Resultat -> ' + result);
if (result.toString() == '0') {
    console.log('Linter no ha encontrado ningún error... ✅');
} else {
    console.log('Linter ha encontrado errores... ❌');
    process.exit(1);
}
