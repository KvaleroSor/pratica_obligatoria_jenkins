const result = process.argv[2];

console.log(result);

console.log('Resultat -> ' + result);
if (result.includes('No ESLint warnings or errors')) {
    console.log('Linter no ha encontrado ningún error... ✅');
} else {
    console.log('Linter ha encontrado errores... ❌');
    process.exit(1);
}
