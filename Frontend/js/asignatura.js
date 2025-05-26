// Base de datos local simulada
let asignaturas = [
    {codigo: "IS001", nombre: "Programación I", creditos: 3, grupo: "401M", semestre: 3},
    {codigo: "IS002", nombre: "Bases de Datos", creditos: 4, grupo: "402M", semestre: 4}
];

// 1. Registrar Asignatura (Versión Local)
function registrarAsignatura(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombreAsig").value.trim();
    const codigo = document.getElementById("codigo").value.trim();
    const creditos = parseInt(document.getElementById("creditos").value);
    const grupo = document.getElementById("grupo").value.trim();
    const semestre = parseInt(document.getElementById("semestre").value);

    // Validaciones básicas
    if (!nombre || !codigo || isNaN(creditos) || !grupo || isNaN(semestre)) {
        alert("Todos los campos son requeridos y deben ser válidos");
        return;
    }

    // Verificar si ya existe
    const existe = asignaturas.some(asig => 
        asig.codigo === codigo && 
        asig.grupo === grupo && 
        asig.semestre === semestre
    );

    if (existe) {
        alert("Esta asignatura ya está registrada");
        return;
    }

    // Agregar nueva asignatura
    asignaturas.push({
        nombre,
        codigo,
        creditos,
        grupo,
        semestre
    });

    alert("Asignatura registrada exitosamente");
    
    // Limpiar formulario
    document.getElementById("nombreAsig").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("creditos").value = "";
    document.getElementById("grupo").value = "";
    document.getElementById("semestre").value = "";
}

// 2. Consultar Asignatura (Versión Local)
function consultarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value.trim();
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value.trim();

    const asignatura = asignaturas.find(asig => 
        asig.codigo === codigo && 
        asig.semestre === semestre && 
        asig.grupo === grupo
    );

    if (asignatura) {
        document.getElementById("NomAsig").value = asignatura.nombre;
        document.getElementById("CreAsig").value = asignatura.creditos;
    } else {
        document.getElementById("NomAsig").value = "No encontrada";
        document.getElementById("CreAsig").value = "";
    }
}

// 3. Buscar Asignatura para Modificar (Versión Local)
function buscarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value.trim();
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value.trim();

    const asignatura = asignaturas.find(asig => 
        asig.codigo === codigo && 
        asig.semestre === semestre && 
        asig.grupo === grupo
    );

    if (asignatura) {
        document.getElementById("nuevoNombre").value = asignatura.nombre;
        document.getElementById("nuevosCreditos").value = asignatura.creditos;
    } else {
        alert("Asignatura no encontrada");
    }
}

// 4. Modificar Asignatura (Versión Local)
function modificarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value.trim();
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value.trim();
    const nuevoNombre = document.getElementById("nuevoNombre").value.trim();
    const nuevosCreditos = parseInt(document.getElementById("nuevosCreditos").value);

    // Validaciones
    if (!nuevoNombre || isNaN(nuevosCreditos)) {
        alert("Todos los campos son requeridos");
        return;
    }

    const index = asignaturas.findIndex(asig => 
        asig.codigo === codigo && 
        asig.semestre === semestre && 
        asig.grupo === grupo
    );

    if (index !== -1) {
        asignaturas[index].nombre = nuevoNombre;
        asignaturas[index].creditos = nuevosCreditos;
        alert("Asignatura modificada exitosamente");
    } else {
        alert("Asignatura no encontrada");
    }
}

/*
// Versión con backend (comentada para referencia)
function registrarAsignaturaBackend(event) {
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      "nombre": document.getElementById("nombreAsig").value,
      "codigo": document.getElementById("codigo").value,
      "creditos": document.getElementById("creditos").value, 
      "grupo": document.getElementById("grupo").value,
      "semestre": document.getElementById("SemestreAgre").value
    });
  
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://ejemplofirebase.netlify.app/.netlify/functions/asignaturas", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Asignatura registrada exitosamente");
      })
      .catch((error) => {
        console.error(error);
        alert("Error al registrar asignatura");
      });
}
*/

// Asignar eventos a los botones
document.getElementById("registrarAsig").addEventListener("click", registrarAsignatura);
document.getElementById("consultarAsig").addEventListener("click", consultarAsignatura);
document.getElementById("buscarAsig").addEventListener("click", buscarAsignatura);
document.getElementById("modificarAsig").addEventListener("click", modificarAsignatura);