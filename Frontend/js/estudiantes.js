// Datos iniciales (simulación)
let asignaturas = [
    {codigo: "IS001", nombre: "Programación I", creditos: 3, grupo: "401M", semestre: 3},
    {codigo: "IS002", nombre: "Bases de Datos", creditos: 4, grupo: "402M", semestre: 4}
];

// 1. Registrar Asignatura
function registrarAsignatura(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombreAsig").value.trim();
    const codigo = document.getElementById("codigo").value.trim();
    const creditos = parseInt(document.getElementById("creditos").value);
    const grupo = document.getElementById("grupo").value.trim();
    const semestre = parseInt(document.getElementById("semestre").value);

    // Validaciones
    if (nombre.length < 5 || nombre.length > 100) {
        alert("El nombre debe tener entre 5 y 100 caracteres");
        return;
    }

    if (codigo.length < 3 || codigo.length > 10) {
        alert("El código debe tener entre 3 y 10 caracteres");
        return;
    }

    if (creditos < 1 || creditos > 99) {
        alert("Los créditos deben ser entre 1 y 99");
        return;
    }

    if (grupo.length < 2 || grupo.length > 6) {
        alert("El grupo debe tener entre 2 y 6 caracteres");
        return;
    }

    if (semestre < 1 || semestre > 99) {
        alert("El semestre debe ser entre 1 y 99");
        return;
    }

    // Verificar si ya existe
    const existe = asignaturas.some(a => 
        a.codigo === codigo && 
        a.grupo === grupo && 
        a.semestre === semestre
    );

    if (existe) {
        alert("Esta asignatura ya está registrada");
        return;
    }

    // Registrar nueva asignatura
    asignaturas.push({ nombre, codigo, creditos, grupo, semestre });
    alert("Asignatura registrada exitosamente");
    
    // Limpiar formulario
    document.getElementById("nombreAsig").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("creditos").value = "";
    document.getElementById("grupo").value = "";
    document.getElementById("semestre").value = "";
}

// 2. Consultar Asignatura
function consultarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value.trim();
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value.trim();

    const asignatura = asignaturas.find(a => 
        a.codigo === codigo && 
        a.semestre === semestre && 
        a.grupo === grupo
    );

    document.getElementById("NomAsig").value = asignatura ? asignatura.nombre : "No encontrada";
    document.getElementById("CreAsig").value = asignatura ? asignatura.creditos : "";
}

// 3. Buscar Asignatura para Modificar
function buscarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value.trim();
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value.trim();

    const asignatura = asignaturas.find(a => 
        a.codigo === codigo && 
        a.semestre === semestre && 
        a.grupo === grupo
    );

    if (asignatura) {
        document.getElementById("nuevoNombre").value = asignatura.nombre;
        document.getElementById("nuevosCreditos").value = asignatura.creditos;
    } else {
        alert("Asignatura no encontrada");
    }
}

// 4. Modificar Asignatura
function modificarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value.trim();
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value.trim();
    const nuevoNombre = document.getElementById("nuevoNombre").value.trim();
    const nuevosCreditos = parseInt(document.getElementById("nuevosCreditos").value);

    // Validaciones
    if (nuevoNombre.length < 5 || nuevoNombre.length > 100) {
        alert("El nombre debe tener entre 5 y 100 caracteres");
        return;
    }

    if (nuevosCreditos < 1 || nuevosCreditos > 99) {
        alert("Los créditos deben ser entre 1 y 99");
        return;
    }

    const index = asignaturas.findIndex(a => 
        a.codigo === codigo && 
        a.semestre === semestre && 
        a.grupo === grupo
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
// Versión con conexión al backend (manteniendo comentada como referencia)
function registrarAsignatura(event) {
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      "nombre": document.getElementById("nombreAsig").value,
      "codigo": document.getElementById("codigo").value,
      "creditos": document.getElementById("creditos").value, 
      "grupo": document.getElementById("grupo").value,
      "semestre": document.getElementById("semestre").value
    });
  
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/asignatura", requestOptions)
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