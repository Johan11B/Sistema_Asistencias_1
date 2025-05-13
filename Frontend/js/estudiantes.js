// Registrar Estudiante en el Departamento
function registrarEstudiante(event) {
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      "nombre": document.getElementById("nombreEst").value,
      "tipoDocumento": document.getElementById("tipoDocEst").value,
      "numeroDocumento": document.getElementById("numDocEst").value
    });
  
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://tu-sitio.netlify.app/.netlify/functions/estudiantes", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Estudiante registrado exitosamente");
      })
      .catch((error) => {
        console.error(error);
        alert("Error al registrar estudiante");
      });
  }
  
  // Consultar Estudiante en el Departamento
  function consultarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.querySelector("#consultarEst ~ select").value;
    const numDoc = document.getElementById("numDocConsulta").value;
  
    fetch(`https://tu-sitio.netlify.app/.netlify/functions/estudiantes?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("NomEst").value = result.nombre || "No encontrado";
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("NomEst").value = "Error al consultar";
      });
  }
  
  // Buscar Estudiante para Modificar
  function buscarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.getElementById("tipoDocMod").value;
    const numDoc = document.getElementById("numDocMod").value;
  
    fetch(`https://tu-sitio.netlify.app/.netlify/functions/estudiantes?tipoDoc=${tipoDoc}&numDoc=${numDoc}`)
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("NuevoNombre").value = result.nombre || "";
      })
      .catch((error) => {
        console.error(error);
        alert("Error al buscar estudiante");
      });
  }
  
  // Modificar Estudiante
  function modificarEstudiante(event) {
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      "tipoDocumento": document.getElementById("tipoDocMod").value,
      "numeroDocumento": document.getElementById("numDocMod").value,
      "nuevoNombre": document.getElementById("NuevoNombre").value,
      "nuevoTipoDoc": document.getElementById("nuevoTipoDoc").value
    });
  
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://tu-sitio.netlify.app/.netlify/functions/estudiantes", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Estudiante modificado exitosamente");
      })
      .catch((error) => {
        console.error(error);
        alert("Error al modificar estudiante");
      });
  }
  // Consultar Asignatura (nueva función)
function consultarAsignatura(event) {
  event.preventDefault();
  
  const codigo = document.getElementById("CodigoAsign").value;
  const grupo = document.getElementById("GrupoAsign").value;
  const semestre = document.getElementById("SemestreAsign").value;

  fetch(`https://tu-sitio.netlify.app/.netlify/functions/asignaturas?codigo=${codigo}&grupo=${grupo}&semestre=${semestre}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById("NombreAsign").value = data.nombre || "No encontrada";
      })
      .catch(error => {
          console.error("Error:", error);
          document.getElementById("NombreAsign").value = "Error al consultar";
      });
}

// Agregar Estudiante a Asignatura 
function agregarEstudianteAsignatura(event) {
  event.preventDefault();
  
  const codigoEst = document.getElementById("CodEst").value;
  const tipoDoc = document.getElementById("TipoDoc").value;
  const codigoAsign = document.getElementById("CodigoAsign").value;
  const grupoAsign = document.getElementById("GrupoAsign").value;

  fetch("https://tu-sitio.netlify.app/.netlify/functions/asignaturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          codigoEstudiante: codigoEst,
          tipoDocumento: tipoDoc,
          codigoAsignatura: codigoAsign,
          grupo: grupoAsign
      })
  })
  .then(response => response.text())
  .then(result => {
      alert("Estudiante agregado a la asignatura");
      console.log(result);
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Error al agregar estudiante");
  });
}