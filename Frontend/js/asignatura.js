// Base de datos simulada (en memoria)
let asignaturas = [
    {
        codigo: "MAT101",
        nombre: "Matemáticas Básicas",
        creditos: 4,
        grupo: "G01",
        semestre: 1
    },
    {
        codigo: "PROG201",
        nombre: "Programación I",
        creditos: 3,
        grupo: "G02",
        semestre: 2
    }
];

// 1. Registrar Asignatura (Versión Local)
function registrarAsignatura(event) {
    event.preventDefault();
    
    const nuevaAsignatura = {
        nombre: document.getElementById("nombreAsig").value.trim(),
        codigo: document.getElementById("codigo").value.trim(),
        creditos: parseInt(document.getElementById("creditos").value),
        grupo: document.getElementById("grupo").value.trim(),
        semestre: parseInt(document.getElementById("SemestreAgre").value)
    };

    // Validaciones
    if (nuevaAsignatura.nombre.length < 5 || nuevaAsignatura.nombre.length > 100) {
        alert("El nombre debe tener entre 5 y 100 caracteres");
        return;
    }

    if (nuevaAsignatura.codigo.length < 3 || nuevaAsignatura.codigo.length > 10) {
        alert("El código debe tener entre 3 y 10 caracteres");
        return;
    }

    if (isNaN(nuevaAsignatura.creditos)) {
        alert("Los créditos deben ser un número válido");
        return;
    }

    // Verificar si ya existe
    const existe = asignaturas.some(a => 
        a.codigo === nuevaAsignatura.codigo && 
        a.grupo === nuevaAsignatura.grupo && 
        a.semestre === nuevaAsignatura.semestre
    );

    if (existe) {
        alert("Esta asignatura ya está registrada");
        return;
    }

    // Registrar nueva asignatura
    asignaturas.push(nuevaAsignatura);
    alert("Asignatura registrada exitosamente");
    
    // Limpiar formulario
    document.getElementById("nombreAsig").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("creditos").value = "";
    document.getElementById("grupo").value = "";
    document.getElementById("SemestreAgre").value = "";

    /*
    // Versión con Fetch (comentada)
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
    */
}

// 2. Consultar Asignatura (Versión Local)
function consultarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value;
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value;

    const asignatura = asignaturas.find(a => 
        a.codigo === codigo && 
        a.semestre === semestre && 
        a.grupo === grupo
    );

    document.getElementById("NomAsig").value = asignatura ? asignatura.nombre : "No encontrada";

    /*
    // Versión con Fetch (comentada)
    const codigo = document.getElementById("tipoCodConsulta").value;
    const semestre = document.getElementById("SemestreConsulta").value;
    const grupo = document.getElementById("secConsulta").value;
  
    fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/asignatura`)
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("NomAsig").value = result.nombre || "No encontrada";
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("NomAsig").value = "Error al consultar";
      });
    */
}

// 3. Buscar Asignatura para Modificar (Versión Local)
function buscarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value;
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value;

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

    /*
    // Versión con Fetch (comentada)
    const codigo = document.getElementById("tipoCodConsulta").value;
    const semestre = document.getElementById("SemestreConsulta").value;
    const grupo = document.getElementById("secConsulta").value;
  
    fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/asignatura`)
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("nuevoNombre").value = result.nombre || "";
        document.getElementById("nuevosCreditos").value = result.creditos || "";
      })
      .catch((error) => {
        console.error(error);
        alert("Error al buscar asignatura");
      });
    */
}

// 4. Modificar Asignatura (Versión Local)
function modificarAsignatura(event) {
    event.preventDefault();
    
    const codigo = document.getElementById("tipoCodConsulta").value;
    const semestre = parseInt(document.getElementById("SemestreConsulta").value);
    const grupo = document.getElementById("secConsulta").value;
    const nuevoNombre = document.getElementById("nuevoNombre").value.trim();
    const nuevosCreditos = parseInt(document.getElementById("nuevosCreditos").value);

    // Validaciones
    if (nuevoNombre.length < 5 || nuevoNombre.length > 100) {
        alert("El nombre debe tener entre 5 y 100 caracteres");
        return;
    }

    if (isNaN(nuevosCreditos)) {
        alert("Los créditos deben ser un número válido");
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

    /*
    // Versión con Fetch (comentada)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      "codigo": document.getElementById("tipoCodConsulta").value,
      "semestre": document.getElementById("SemestreConsulta").value,
      "grupo": document.getElementById("secConsulta").value,
      "nuevoNombre": document.getElementById("nuevoNombre").value,
      "nuevosCreditos": document.getElementById("nuevosCreditos").value
    });
  
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/asignatura", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Asignatura modificada exitosamente");
      })
      .catch((error) => {
        console.error(error);
        alert("Error al modificar asignatura");
      });
    */
}