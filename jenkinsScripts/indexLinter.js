const result = process.argv[2];

console.log(result);

if(result !== 0){
    console.log('Linter ha encontrado errores ...❌');
}else{
    console.log('Linter no ha enctronado ningún error ...✅');
}
