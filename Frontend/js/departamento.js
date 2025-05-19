// Mostrar Departamento
function mostrar(event) {
    event.preventDefault();
    
    fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        document.getElementById("NomDep").value = result.nombre || "No encontrado";
      })
      .catch((error) => {
        console.error("Error al consultar:", error);
        document.getElementById("NomDep").value = "Error al consultar";
      });
}
  
// Modificar Departamento
function Modify(event) {
    event.preventDefault();
    
    const nuevoNombre = document.getElementById("NewDep").value.trim();
    if (!nuevoNombre || nuevoNombre.length < 4 || nuevoNombre.length > 50) {
        alert("El nombre debe tener entre 4 y 50 caracteres");
        return;
    }

    fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nuevoNombre })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then((result) => {
        console.log(result);
        alert(result.mensaje || "Departamento modificado exitosamente");
        document.getElementById("NewDep").value = ""; // Limpiar el campo
        mostrar(event); // Actualizar el nombre mostrado
    })
    .catch((error) => {
        console.error("Error al modificar:", error);
        alert(error.message || "Error al modificar departamento");
    });
}

// Cargar el nombre al abrir la página
document.addEventListener("DOMContentLoaded", function() {
    const event = { preventDefault: () => {} };
    mostrar(event);
});