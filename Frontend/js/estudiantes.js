// Registrar Estudiante
function registrarEstudiante(event) {
    event.preventDefault();
    
    const data = {
        nombre: document.getElementById("nombreEst").value,
        tipoDocumento: document.getElementById("tipoDocEst").value,
        numeroDocumento: document.getElementById("numDocEst").value
    };
    
    // Simulación de respuesta exitosa
    document.getElementById("nombreEst").value = "";
    document.getElementById("tipoDocEst").value = "CC";
    document.getElementById("numDocEst").value = "";
    alert("Estudiante registrado exitosamente (simulado)");
    
    /* Versión real comentada:
    fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.mensaje);
    })
    .catch(error => {
        alert("Error al registrar estudiante");
    });
    */
}

// Consultar Estudiante
function consultarEstudiante(event) {
    event.preventDefault();
    
    // Datos quemados para demostración
    const estudiantesDemo = {
        "CC-12345678": { nombre: "Juan Pérez", email: "juan@example.com" },
        "TI-98765432": { nombre: "María García", email: "maria@example.com" }
    };
    
    const tipoDoc = document.querySelector("#consultarEst ~ select").value;
    const numDoc = document.getElementById("numDocConsulta").value;
    const key = `${tipoDoc}-${numDoc}`;
    
    // Simulación de consulta
    if (estudiantesDemo[key]) {
        document.getElementById("NomEst").value = estudiantesDemo[key].nombre;
    } else {
        document.getElementById("NomEst").value = "Estudiante no encontrado (simulado)";
    }
    
    /* Versión real comentada:
    fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
    .then(response => response.json())
    .then(estudiante => {
        document.getElementById("NomEst").value = estudiante.nombre || "No encontrado";
    })
    .catch(error => {
        document.getElementById("NomEst").value = "Error al consultar";
    });
    */
}

// Buscar Estudiante para Modificar
function buscarEstudiante(event) {
    event.preventDefault();
    
    // Simulación con datos quemados
    document.getElementById("NuevoNombre").value = "Nombre de Ejemplo (simulado)";
    
    /* Versión real comentada:
    const tipoDoc = document.getElementById("tipoDocMod").value;
    const numDoc = document.getElementById("numDocMod").value;
    
    fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
    .then(response => response.json())
    .then(estudiante => {
        document.getElementById("NuevoNombre").value = estudiante.nombre || "";
    })
    .catch(error => {
        alert("Error al buscar estudiante");
    });
    */
}

// Modificar Estudiante
function modificarEstudiante(event) {
    event.preventDefault();
    
    // Simulación de modificación exitosa
    document.getElementById("NuevoNombre").value = "";
    alert("Estudiante modificado exitosamente (simulado)");
    
    /* Versión real comentada:
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
    .then(response => response.json())
    .then(result => {
        alert(result.mensaje);
    })
    .catch(error => {
        alert("Error al modificar estudiante");
    });
    */
}

// Consultar Asignatura (simulada)
function consultarAsignatura(event) {
    event.preventDefault();
    
    // Datos quemados
    const asignaturasDemo = {
        "MAT-101-A": "Cálculo Diferencial",
        "ING-202-B": "Programación Avanzada"
    };
    
    const codigo = document.getElementById("CodigoAsign").value;
    const grupo = document.getElementById("GrupoAsign").value;
    const key = `${codigo}-${grupo}`;
    
    document.getElementById("NombreAsign").value = asignaturasDemo[key] || "Asignatura no encontrada (simulado)";
}

// Agregar Estudiante a Asignatura (simulada)
function agregarEstudianteAsignatura(event) {
    event.preventDefault();
    alert("Estudiante agregado a la asignatura (simulado)");
}