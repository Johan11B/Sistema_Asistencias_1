// Registrar Asignatura
function registrarAsignatura(event) {
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
  
  // Consultar Asignatura
  function consultarAsignatura(event) {
    event.preventDefault();
    
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
  }
  
  // Buscar Asignatura para Modificar
  function buscarAsignatura(event) {
    event.preventDefault();
    
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
  }
  
  // Modificar Asignatura
  function modificarAsignatura(event) {
    event.preventDefault();
    
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
  }