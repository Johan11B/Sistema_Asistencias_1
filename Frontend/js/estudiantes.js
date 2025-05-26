// Datos iniciales (simulación)
let estudiantes = [
    {nombre: "Daniel Esteban", tipoDocumento: "CC", numeroDocumento: "1077112696"},
    {nombre: "Pedro González", tipoDocumento: "CC", numeroDocumento: "1037112636"}
];

let asignaturas = [
    {codigo: "IS001", nombre: "Programación I", grupo: "401M", semestre: 3},
    {codigo: "IS002", nombre: "Bases de Datos", grupo: "402M", semestre: 4}
];

let estudiantesAsignaturas = [];

// 1. Registrar Estudiante
function registrarEstudiante(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombreEst").value.trim();
    const tipoDocumento = document.getElementById("tipoDocEst").value;
    const numeroDocumento = document.getElementById("numDocEst").value.trim();

    // Validaciones
    if (nombre.length < 10 || nombre.length > 100) {
        alert("El nombre debe tener entre 10 y 100 caracteres");
        return;
    }

    if (numeroDocumento.length < 8 || numeroDocumento.length > 11) {
        alert("El número de documento debe tener entre 8 y 11 dígitos");
        return;
    }

    // Verificar si ya existe
    const existe = estudiantes.some(e => 
        e.tipoDocumento === tipoDocumento && 
        e.numeroDocumento === numeroDocumento
    );

    if (existe) {
        alert("Este estudiante ya está registrado");
        return;
    }

    // Registrar nuevo estudiante
    estudiantes.push({ nombre, tipoDocumento, numeroDocumento });
    alert("Estudiante registrado exitosamente");
    
    // Limpiar formulario
    document.getElementById("nombreEst").value = "";
    document.getElementById("numDocEst").value = "";
}

// 2. Consultar Estudiante
function consultarEstudiante(event) {
    event.preventDefault();
    
    const tipoDocumento = document.getElementById("tipoDocConsulta").value;
    const numeroDocumento = document.getElementById("numDocConsulta").value.trim();

    const estudiante = estudiantes.find(e => 
        e.tipoDocumento === tipoDocumento && 
        e.numeroDocumento === numeroDocumento
    );

    document.getElementById("NomEst").value = estudiante ? estudiante.nombre : "No encontrado";
}

// 3. Buscar Estudiante para Modificar
function buscarEstudiante(event) {
    event.preventDefault();
    
    const tipoDocumento = document.getElementById("tipoDocMod").value;
    const numeroDocumento = document.getElementById("numDocMod").value.trim();

    const estudiante = estudiantes.find(e => 
        e.tipoDocumento === tipoDocumento && 
        e.numeroDocumento === numeroDocumento
    );

    if (estudiante) {
        document.getElementById("NuevoNombre").value = estudiante.nombre;
        document.getElementById("nuevoTipoDoc").value = estudiante.tipoDocumento;
    } else {
        alert("Estudiante no encontrado");
    }
}

// 4. Modificar Estudiante
function modificarEstudiante(event) {
    event.preventDefault();
    
    const tipoDocumento = document.getElementById("tipoDocMod").value;
    const numeroDocumento = document.getElementById("numDocMod").value.trim();
    const nuevoNombre = document.getElementById("NuevoNombre").value.trim();
    const nuevoTipoDoc = document.getElementById("nuevoTipoDoc").value;

    // Validaciones
    if (nuevoNombre.length < 10 || nuevoNombre.length > 100) {
        alert("El nombre debe tener entre 10 y 100 caracteres");
        return;
    }

    const index = estudiantes.findIndex(e => 
        e.tipoDocumento === tipoDocumento && 
        e.numeroDocumento === numeroDocumento
    );

    if (index !== -1) {
        estudiantes[index].nombre = nuevoNombre;
        estudiantes[index].tipoDocumento = nuevoTipoDoc;
        alert("Estudiante modificado exitosamente");
    } else {
        alert("Estudiante no encontrado");
    }
}

// 5. Consultar Asignatura
function consultarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("CodigoAsign").value;
    const grupo = document.getElementById("GrupoAsign").value;
    const semestre = document.getElementById("SemestreAsign").value;

    const asignatura = asignaturas.find(a => 
        a.codigo === codigo && 
        a.grupo === grupo && 
        a.semestre === parseInt(semestre)
    );

    document.getElementById("NombreAsign").value = asignatura ? asignatura.nombre : "No encontrada";
}

// 6. Agregar Estudiante a Asignatura
function agregarEstudianteAsignatura(event) {
    event.preventDefault();
    
    const codigoEstudiante = document.getElementById("CodEst").value;
    const tipoDocumento = document.getElementById("TipoDoc").value;
    const codigoAsignatura = document.getElementById("CodigoAsign").value;
    const grupoAsignatura = document.getElementById("GrupoAsign").value;

    // Verificar que existan ambos
    const estudiante = estudiantes.find(e => 
        e.numeroDocumento === codigoEstudiante && 
        e.tipoDocumento === tipoDocumento
    );
    
    const asignatura = asignaturas.find(a => 
        a.codigo === codigoAsignatura && 
        a.grupo === grupoAsignatura
    );

    if (!estudiante || !asignatura) {
        alert("Estudiante o asignatura no encontrados");
        return;
    }

    // Verificar si ya está registrado
    const yaRegistrado = estudiantesAsignaturas.some(ea => 
        ea.codigoEstudiante === codigoEstudiante && 
        ea.tipoDocumento === tipoDocumento &&
        ea.codigoAsignatura === codigoAsignatura &&
        ea.grupo === grupoAsignatura
    );

    if (yaRegistrado) {
        alert("El estudiante ya está registrado en esta asignatura");
        return;
    }

    // Registrar relación
    estudiantesAsignaturas.push({
        codigoEstudiante,
        tipoDocumento,
        codigoAsignatura,
        grupo: grupoAsignatura
    });
    
    alert("Estudiante agregado a la asignatura exitosamente");
    
    // Limpiar campos
    document.getElementById("CodEst").value = "";
}