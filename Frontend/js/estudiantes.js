// URL base de la API
const API_URL = "https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes";

// Registrar Estudiante
function registrarEstudiante(event) {
    event.preventDefault();
    
    const data = {
        nombre: document.getElementById("nombreEst").value,
        tipoDocumento: document.getElementById("tipoDocEst").value,
        numeroDocumento: document.getElementById("numDocEst").value
    };
    
    fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(result => {
        alert(result.mensaje);
        document.getElementById("nombreEst").value = "";
        document.getElementById("numDocEst").value = "";
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });
}

// Consultar Estudiante
function consultarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.getElementById("tipoDocConsulta").value;
    const numDoc = document.getElementById("numDocConsulta").value;
    
    fetch(`${API_URL}?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
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
        alert(error.message);
    });
}

// Buscar Estudiante para Modificar
function buscarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.getElementById("tipoDocMod").value;
    const numDoc = document.getElementById("numDocMod").value;
    
    fetch(`${API_URL}?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(estudiante => {
        document.getElementById("NuevoNombre").value = estudiante.nombre || "";
        document.getElementById("nuevoTipoDoc").value = estudiante.tipoDocumento || "CC";
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
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
    
    fetch(`${API_URL}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(result => {
        alert(result.mensaje);
        document.getElementById("NuevoNombre").value = "";
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });
}

// Consultar Asignatura
function consultarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("CodigoAsign").value;
    const grupo = document.getElementById("GrupoAsign").value;
    const semestre = document.getElementById("SemestreAsign").value;
    
    fetch(`${API_URL}/asignatura?codigo=${codigo}&grupo=${grupo}&semestre=${semestre}`)
    .then(response => {
        if (!response.ok) throw new Error("Error al consultar asignatura");
        return response.json();
    })
    .then(asignatura => {
        document.getElementById("NombreAsign").value = asignatura.nombre || "No encontrada";
    })
    .catch(error => {
        console.error(error);
        document.getElementById("NombreAsign").value = "Error al consultar";
        alert(error.message);
    });
}

// Agregar Estudiante a Asignatura
function agregarEstudianteAsignatura(event) {
    event.preventDefault();
    
    const data = {
        codigoEstudiante: document.getElementById("CodEst").value,
        tipoDocumento: document.getElementById("TipoDoc").value,
        codigoAsignatura: document.getElementById("CodigoAsign").value,
        grupo: document.getElementById("GrupoAsign").value
    };
    
    fetch(`${API_URL}/asignatura`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(result => {
        alert(result.mensaje);
        // Limpiar campos si es necesario
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });
}