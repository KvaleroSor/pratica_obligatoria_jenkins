// const result = process.argv[2];
const result = process.env.RESULT_LINTER;

console.log(result);

console.log('Resultat -> ' + result);
if(result !== '0'){
    console.log('Linter ha encontrado errores... ❌');
}else if(result === '0'){
    console.log('Linter no ha enctronado ningún error... ✅');
}
