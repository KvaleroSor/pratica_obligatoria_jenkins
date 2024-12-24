const result = process.argv[2];
const result_linter = process.argv[3];

console.log('Result en l´arxiu status -> ' + result);
console.log('Result en l´arxiu stdout -> ' + result);

console.log('Resultat -> ' + result);
if (result.toString() == '0') {
    console.log('Linter no ha encontrado ningún error... ✅');
} else {
    console.log('Linter ha encontrado errores... ❌');
    process.exit(1);
}
