// Mostrar Departamento
function mostrar(event) {
  if (event) event.preventDefault();

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento",)
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("NomDep").value = result.nombre || "No encontrado";
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("NomDep").value = "Error al consultar";
    });
}

// Modificar Departamento
function Modify(event) {
  event.preventDefault();

  const nuevoNombre = document.getElementById("NewDep").value.trim();

  if (nuevoNombre.length < 4 || nuevoNombre.length > 50) {
    alert("El nuevo nombre debe tener entre 4 y 50 caracteres");
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ Nombre : nuevoNombre });

  const requestOptions = {
    method: "POST", 
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  console.log("Enviando:", raw);
  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      alert("Departamento modificado exitosamente");
      document.getElementById("NewDep").value = "";
      document.getElementById("NomDep").value = "";
    })
    .catch((error) => {
      console.error(error);
      alert("Error al modificar departamento");
    });
}