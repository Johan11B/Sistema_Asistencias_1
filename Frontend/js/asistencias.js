// Crear Lista de Asistencias
function crearlista(event) {
  event.preventDefault();
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "semestre": document.getElementById("semestrecrear").value,
    "grupo": document.getElementById("grupocrear").value,
    "codigo": document.getElementById("codigocrear").value,
    "fecha": document.getElementById("fechacrear").value,
    "horaInicio": document.getElementById("horainicrear").value
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/asistencias", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      alert("Lista de asistencia creada exitosamente");
    })
    .catch((error) => {
      console.error(error);
      alert("Error al crear lista de asistencia");
    });
}

// Buscar Lista para Llenar
function buscarlista(event) {
  event.preventDefault();
  
  const codigo = document.getElementById("codigollenar").value;
  const fecha = document.getElementById("fechallenar").value;
  const horaInicio = document.getElementById("horainillenar").value;

  fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/asistencias`)
    .then((response) => response.json())
    .then((result) => {
      const tabla = document.querySelector("#tablaAsisLlenar tbody");
      tabla.innerHTML = "";
      
      result.estudiantes.forEach(est => {
        const row = document.createElement("tr");
        
        const tdTipoDoc = document.createElement("td");
        tdTipoDoc.textContent = est.tipoDocumento;
        
        const tdNumDoc = document.createElement("td");
        tdNumDoc.textContent = est.numeroDocumento;
        
        const tdEstado = document.createElement("td");
        const select = document.createElement("select");
        select.innerHTML = `
          <option value="Asistió" ${est.estado === 'Asistió' ? 'selected' : ''}>Asistió</option>
          <option value="Falta" ${est.estado === 'Falta' ? 'selected' : ''}>Falta</option>
          <option value="Justificada" ${est.estado === 'Justificada' ? 'selected' : ''}>Justificada</option>
        `;
        tdEstado.appendChild(select);
        
        row.appendChild(tdTipoDoc);
        row.appendChild(tdNumDoc);
        row.appendChild(tdEstado);
        tabla.appendChild(row);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Error al buscar lista de asistencia");
    });
}

// Llenar Lista de Asistencia
function lleanarlista(event) {
  event.preventDefault();
  
  const rows = document.querySelectorAll("#tablaAsisLlenar tbody tr");
  const estudiantes = [];
  
  rows.forEach(row => {
    estudiantes.push({
      tipoDocumento: row.cells[0].textContent,
      numeroDocumento: row.cells[1].textContent,
      estado: row.cells[2].querySelector("select").value
    });
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "codigo": document.getElementById("codigollenar").value,
    "fecha": document.getElementById("fechallenar").value,
    "horaInicio": document.getElementById("horainillenar").value,
    "estudiantes": estudiantes
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/asistencias", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      alert("Asistencia registrada exitosamente");
    })
    .catch((error) => {
      console.error(error);
      alert("Error al registrar asistencia");
    });
}

// Buscar Lista para Modificar
function buscarListaModificar(event) {
  event.preventDefault();
  
  const codigo = document.getElementById("codigomod").value;
  const fecha = document.getElementById("fechamod").value;
  const horaInicio = document.getElementById("horainimod").value;
  const numDoc = document.getElementById("numDocMod").value;
  const tipoDoc = document.querySelector("#codigomod ~ fieldset select").value;

  fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/asistencias`)
    .then((response) => response.json())
    .then((result) => {
      const tabla = document.querySelector("#tablaAsisMod tbody");
      tabla.innerHTML = "";
      
      // Filtrar por número de documento si se proporcionó
      const estudiantes = numDoc ? 
        result.estudiantes.filter(est => 
          est.numeroDocumento === numDoc && est.tipoDocumento === tipoDoc
        ) : 
        result.estudiantes;
      
      if (estudiantes.length === 0) {
        alert("No se encontró el estudiante con los datos proporcionados");
        return;
      }
      
      estudiantes.forEach(est => {
        const row = document.createElement("tr");
        
        const tdTipoDoc = document.createElement("td");
        tdTipoDoc.textContent = est.tipoDocumento;
        
        const tdNumDoc = document.createElement("td");
        tdNumDoc.textContent = est.numeroDocumento;
        
        const tdEstado = document.createElement("td");
        const select = document.createElement("select");
        select.innerHTML = `
          <option value="Asistió" ${est.estado === 'Asistió' ? 'selected' : ''}>Asistió</option>
          <option value="Falta" ${est.estado === 'Falta' ? 'selected' : ''}>Falta</option>
          <option value="Justificada" ${est.estado === 'Justificada' ? 'selected' : ''}>Justificada</option>
        `;
        tdEstado.appendChild(select);
        
        row.appendChild(tdTipoDoc);
        row.appendChild(tdNumDoc);
        row.appendChild(tdEstado);
        tabla.appendChild(row);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Error al buscar lista de asistencia para modificar");
    });
}

// Modificar Asistencia
function modificarAsistencia(event) {
  event.preventDefault();
  
  const rows = document.querySelectorAll("#tablaAsisMod tbody tr");
  if (rows.length === 0) {
      alert("No hay datos para modificar. Busque primero una lista.");
      return;
  }
  
  const estudiantes = [];
  
  rows.forEach(row => {
    estudiantes.push({
      tipoDocumento: row.cells[0].textContent,
      numeroDocumento: row.cells[1].textContent,
      estado: row.cells[2].querySelector("select").value
    });
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "codigo": document.getElementById("codigomod").value,
    "fecha": document.getElementById("fechamod").value,
    "horaInicio": document.getElementById("horainimod").value,
    "estudiantes": estudiantes
  });

  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/asistencias", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      alert("Asistencia modificada exitosamente");
    })
    .catch((error) => {
      console.error(error);
      alert("Error al modificar asistencia");
    });
}

// Consultar Asistencia
function consultarAsistencia(event) {
  event.preventDefault();
  
  const codigo = document.getElementById("codigocon").value;
  const semestre = document.getElementById("semestrecon").value;
  const grupo = document.getElementById("grupocon").value;
  const fecha = document.getElementById("fechacon").value;
  const horaInicio = document.getElementById("horainicon").value;

  fetch(`https://sistemadeasistencia.netlify.app/.netlify/functions/asistencias`)
    .then((response) => response.json())
    .then((result) => {
      const tabla = document.querySelector("#tablaAsisCon tbody");
      tabla.innerHTML = "";
      
      result.estudiantes.forEach(est => {
        const row = document.createElement("tr");
        
        const tdTipoDoc = document.createElement("td");
        tdTipoDoc.textContent = est.tipoDocumento;
        
        const tdNumDoc = document.createElement("td");
        tdNumDoc.textContent = est.numeroDocumento;
        
        const tdEstado = document.createElement("td");
        tdEstado.textContent = est.estado;
        
        row.appendChild(tdTipoDoc);
        row.appendChild(tdNumDoc);
        row.appendChild(tdEstado);
        tabla.appendChild(row);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Error al consultar asistencia");
    });
}
document.addEventListener("DOMContentLoaded", function() {
  const btnBuscarModificar = document.querySelector("#buscarlista[onclick='buscarlista(event)']");
  if (btnBuscarModificar) {
      btnBuscarModificar.setAttribute("onclick", "buscarListaModificar(event)");
  }
});