$(document).ready(function() {
    // Función para mostrar/ocultar campos según la operación seleccionada
    function toggleInputs() {
        const operation = $('#operation').val();

        // Ocultar todos los campos primero
        $('#input-i, #input-end-i, #input-j, #input-end-j').hide();

        // Mostrar campos según la operación
        if (operation === 'sum' || operation === 'prod') {
            $('#input-i, #input-end-i').show(); // Solo se necesita i
        } else if (operation === 'comb' || operation === '2sum' || operation === '2prod') {
            $('#input-i, #input-end-i, #input-j, #input-end-j').show(); // Se necesitan i y j
        }
    }

    // Ejecutar la función al cambiar la operación
    $('#operation').on('change', toggleInputs);

    // Ejecutar la función al cargar la página
    toggleInputs();

    // Calcular el resultado al enviar el formulario
    $('#form-data').on('submit', function(event) {
        event.preventDefault();
    
        const operation = $('#operation').val();
        const func = $('#function').val();
        const startI = parseInt($('#start-i').val());
        const endI = parseInt($('#end-i').val());
        const startJ = parseInt($('#start-j').val()) || 0; // Evita undefined
        const endJ = parseInt($('#end-j').val()) || 0;
    
        let result = 0;
    
        switch (operation) {
            case 'sum': // SUMATORIA SIMPLE
                result = 0;
                for (let i = startI; i <= endI; i++) {
                    let expression = func.replace(/i/g, i); // Solo reemplazar i
                    result += eval(expression);
                }
                break;
            case 'prod': // PRODUCTORIA SIMPLE
                result = 1;
                for (let i = startI; i <= endI; i++) {
                    let expression = func.replace(/i/g, i); // Solo reemplazar i
                    result *= eval(expression);
                }
                break;
            case 'comb': // PRODUCTORIA ANIDADA + SUMATORIA EXTERNA
                result = 0;
                for (let i = startI; i <= endI; i++) {
                    let product = 1;
                    for (let j = startJ; j <= endJ; j++) {
                        let expression = func.replace(/i/g, i).replace(/j/g, j);
                        product *= eval(expression);
                    }
                    result += product;
                }
                break;
            case '2sum': // SUMATORIA DOBLE
                result = 0;
                for (let i = startI; i <= endI; i++) {
                    for (let j = startJ; j <= endJ; j++) {
                        let expression = func.replace(/i/g, i).replace(/j/g, j);
                        result += eval(expression);
                    }
                }
                break;
            case '2prod': // PRODUCTORIA DOBLE
                result = 1;
                for (let i = startI; i <= endI; i++) {
                    for (let j = startJ; j <= endJ; j++) {
                        let expression = func.replace(/i/g, i).replace(/j/g, j);
                        result *= eval(expression);
                    }
                }
                break;
        }
    
        $('#result').text(`Resultado: ${result}`);
    });
    
});