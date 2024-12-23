const result = process.argv[2];

console.log(result);

if(result !== 0){
    console.log('Linter ha encontrado errores... ❌');
}else if(result === 0){
    console.log('Linter no ha enctronado ningún error... ✅');
}
