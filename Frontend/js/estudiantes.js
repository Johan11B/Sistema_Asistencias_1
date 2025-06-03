// Registrar Estudiante
async function registrarEstudiante(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreEst").value.trim();
    const tipoDocumento = document.getElementById("tipoDocEst").value;
    const numeroDocumento = document.getElementById("numDocEst").value.trim();

    // Validación básica del frontend
    if (nombre.length < 10 || nombre.length > 100) {
        alert("El nombre debe tener entre 10 y 100 caracteres");
        return;
    }

    if (!/^\d{8,11}$/.test(numeroDocumento)) {
        alert("Número de documento inválido. Debe tener entre 8 y 11 dígitos");
        return;
    }

    try {
        const response = await fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, tipoDocumento, numeroDocumento })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al registrar estudiante");
        }

        alert(result.message || "Estudiante registrado exitosamente");
        document.getElementById("nombreEst").value = "";
        document.getElementById("numDocEst").value = "";
    } catch (error) {
        console.error("Error:", error);
        alert(`Error al registrar: ${error.message}`);
    }
}

// Consultar Estudiante
async function consultarEstudiante(event) {
    event.preventDefault();
    const tipoDocumento = document.getElementById("tipoDocConsulta").value;
    const numeroDocumento = document.getElementById("numDocConsulta").value.trim();

    try {
        const response = await fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes?tipoDocumento=${tipoDocumento}&numeroDocumento=${numeroDocumento}`);
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Estudiante no encontrado");
        }

        document.getElementById("NomEst").value = result.nombre;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("NomEst").value = error.message;
    }
}

// Modificar Estudiante
async function modificarEstudiante(event) {
    event.preventDefault();
    const tipoDocumento = document.getElementById("tipoDocMod").value;
    const numeroDocumento = document.getElementById("numDocMod").value.trim();
    const nuevoNombre = document.getElementById("NuevoNombre").value.trim();
    const nuevoTipoDoc = document.getElementById("nuevoTipoDoc").value;

    // Validación del frontend
    if (nuevoNombre && (nuevoNombre.length < 10 || nuevoNombre.length > 100)) {
        alert("El nuevo nombre debe tener entre 10 y 100 caracteres");
        return;
    }

    try {
        const response = await fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tipoDocumento, numeroDocumento, nuevoNombre, nuevoTipoDoc })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al modificar estudiante");
        }

        alert(result.message || "Estudiante modificado exitosamente");
        document.getElementById("NuevoNombre").value = "";
    } catch (error) {
        console.error("Error:", error);
        alert(`Error al modificar: ${error.message}`);
    }
}

// Consultar Asignatura
async function consultarAsignatura(event) {
    event.preventDefault();
    const codigo = document.getElementById("CodigoAsign").value.trim();
    const grupo = document.getElementById("GrupoAsign").value.trim();

    try {
        const response = await fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes/asignatura?codigo=${codigo}&grupo=${grupo}`);
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Asignatura no encontrada");
        }

        document.getElementById("NombreAsign").value = result.nombre;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("NombreAsign").value = error.message;
    }
}

// Agregar Estudiante a Asignatura
async function agregarEstudianteAsignatura(event) {
    event.preventDefault();
    const codigoEstudiante = document.getElementById("CodEst").value.trim();
    const tipoDocumento = document.getElementById("TipoDoc").value;
    const codigoAsignatura = document.getElementById("CodigoAsign").value.trim();
    const grupo = document.getElementById("GrupoAsign").value.trim();

    try {
        const response = await fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes/asignatura", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ codigoEstudiante, tipoDocumento, codigoAsignatura, grupo })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Error al agregar estudiante a la asignatura");
        }

        alert(result.message || "Estudiante agregado a la asignatura exitosamente");
    } catch (error) {
        console.error("Error:", error);
        alert(`Error al agregar: ${error.message}`);
    }
}