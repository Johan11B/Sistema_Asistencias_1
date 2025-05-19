// 1. SIMULACIÓN DE DATOS (para cuando el backend no responda)
let nombreDepartamento = "Departamento de Matemáticas";

// 2. FUNCIÓN PARA MOSTRAR EL DEPARTAMENTO
function mostrar(event) {
    if(event) event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    // Versión simulada (trabaja localmente)
    document.getElementById("NomDep").value = nombreDepartamento;
    
    /* 
    // Versión real para producción (comunicación con backend):
    fetch("https://tudominio.netlify.app/.netlify/functions/departamento")
      .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
      })
      .then(data => {
        document.getElementById("NomDep").value = data.nombre || "No encontrado";
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("NomDep").value = "Error al cargar";
      });
    */
}

// 3. FUNCIÓN PARA MODIFICAR EL DEPARTAMENTO
function Modify(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    const nuevoNombre = document.getElementById("NewDep").value.trim();
    
    // Validación del input
    if (nuevoNombre.length < 4 || nuevoNombre.length > 50) {
        alert("El nombre debe tener entre 4 y 50 caracteres");
        return;
    }
    
    // Versión simulada (actualización local)
    nombreDepartamento = nuevoNombre;
    document.getElementById("NomDep").value = nombreDepartamento;
    document.getElementById("NewDep").value = ""; // Limpia el campo
    alert("Departamento modificado exitosamente");
    
    /*
    // Versión real para producción:
    fetch("https://tudominio.netlify.app/.netlify/functions/departamento", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoNombre })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje || "Modificación exitosa");
        mostrar(event); // Actualiza la visualización
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al modificar");
    });
    */
}

// 4. CARGA INICIAL AUTOMÁTICA
window.onload = function() {
    mostrar(); // Ejecuta mostrar() cuando la página termina de cargar
};