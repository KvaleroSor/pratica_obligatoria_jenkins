const result_linter = process.argv[2];

if (result_linter.toString() === '0') {
    console.log('Linter no ha encontrat ningún error... ✅');    
} else {
    console.log('Linter ha encontrat errores... ❌');    
}
