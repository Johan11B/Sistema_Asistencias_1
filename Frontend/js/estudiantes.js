// Datos simulados (solo para desarrollo)
let estudiantes = [];

// Registrar Estudiante
function registrarEstudiante(event) {
    event.preventDefault();
    
    const data = {
        nombre: document.getElementById("nombreEst").value,
        tipoDocumento: document.getElementById("tipoDocEst").value,
        numeroDocumento: document.getElementById("numDocEst").value
    };
    
    fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(result => {
        alert(result.mensaje || "Estudiante registrado exitosamente");
        console.log(result.estudiante);
    })
    .catch(error => {
        console.error(error);
        alert(error.message || "Error al registrar estudiante");
    });
}

// Consultar Estudiante
function consultarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.querySelector("#consultarEst ~ select").value;
    const numDoc = document.getElementById("numDocConsulta").value;
    
    fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(estudiante => {
        document.getElementById("NomEst").value = estudiante.nombre || "No encontrado";
    })
    .catch(error => {
        console.error(error);
        document.getElementById("NomEst").value = "Error al consultar";
    });
}

// Buscar Estudiante para Modificar
function buscarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.getElementById("tipoDocMod").value;
    const numDoc = document.getElementById("numDocMod").value;
    
    fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(estudiante => {
        document.getElementById("NuevoNombre").value = estudiante.nombre || "";
    })
    .catch(error => {
        console.error(error);
        alert(error.message || "Error al buscar estudiante");
    });
}

// Modificar Estudiante
function modificarEstudiante(event) {
    event.preventDefault();
    
    const data = {
        tipoDocumento: document.getElementById("tipoDocMod").value,
        numeroDocumento: document.getElementById("numDocMod").value,
        nuevoNombre: document.getElementById("NuevoNombre").value,
        nuevoTipoDoc: document.getElementById("nuevoTipoDoc").value
    };
    
    fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(result => {
        alert(result.mensaje || "Estudiante modificado exitosamente");
    })
    .catch(error => {
        console.error(error);
        alert(error.message || "Error al modificar estudiante");
    });
}

// Consultar Asignatura
function consultarAsignatura(event) {
    event.preventDefault();
    
    // Simulación - en un sistema real harías una llamada al backend
    document.getElementById("NombreAsign").value = "Asignatura de Ejemplo";
}

// Agregar Estudiante a Asignatura 
function agregarEstudianteAsignatura(event) {
    event.preventDefault();
    
    // Simulación - en un sistema real harías una llamada al backend
    alert("Estudiante agregado a la asignatura (simulación)");
}