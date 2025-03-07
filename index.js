 
 $(document).ready(function() {
            $("#form-data").submit(function(event) {
                event.preventDefault();

                let funcStr = $("#function").val().replace(/\^/g, "**"); // Reemplaza ^ por ** para potencias en JS
                let start = parseInt($("#start").val());
                let end = parseInt($("#end").val());

                if (isNaN(start) || isNaN(end) || start > end) {
                    $("#result").html("Rango inválido").addClass("text-danger");
                    return;
                }

                let sumatoria = 0;
                let productoria = 1;

                try {
                    for (let i = start; i <= end; i++) {
                        let value = eval(funcStr.replace(/i/g, i)); // Evalúa la función con el valor de i
                        sumatoria += value;
                        productoria *= value;
                    }

                    $("#result").html(`Sumatoria: ${sumatoria} <br> Productoria: ${productoria}`).removeClass("text-danger");
                } catch (error) {
                    $("#result").html("Error en la función ingresada").addClass("text-danger");
                }
            });
        });