// Registrar Estudiante
async function registrarEstudiante(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreEst").value.trim();
    const tipoDocumento = document.getElementById("tipoDocEst").value;
    const numeroDocumento = document.getElementById("numDocEst").value.trim();

    try {
        const response = await fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, tipoDocumento, numeroDocumento })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        alert("Estudiante registrado exitosamente");
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
        
        if (!response.ok) {
            throw new Error("Estudiante no encontrado");
        }

        const estudiante = await response.json();
        document.getElementById("NomEst").value = estudiante.nombre;
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

    try {
        const response = await fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/estudiantes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tipoDocumento, numeroDocumento, nuevoNombre, nuevoTipoDoc })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        alert("Estudiante modificado exitosamente");
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
        
        if (!response.ok) {
            throw new Error("Asignatura no encontrada");
        }

        const asignatura = await response.json();
        document.getElementById("NombreAsign").value = asignatura.nombre;
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

        if (!response.ok) {
            throw new Error(await response.text());
        }

        alert("Estudiante agregado a la asignatura exitosamente");
    } catch (error) {
        console.error("Error:", error);
        alert(`Error al agregar: ${error.message}`);
    }
}