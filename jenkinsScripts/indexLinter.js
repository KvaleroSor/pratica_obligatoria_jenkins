const result = process.argv[2];

result !== 0
    ? console.log("Linter ha encontrado errors...")
    : console.log("Linter ha finalizado sin errores...");
