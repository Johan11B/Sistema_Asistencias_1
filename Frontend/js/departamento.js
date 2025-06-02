// Mostrar Departamento desde Netlify Function
function mostrar(event) {
  if (event) {
    event.preventDefault();
  }

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento")
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

  const raw = JSON.stringify({
    nuevoNombre: nuevoNombre
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      alert("Departamento modificado exitosamente");
      mostrar(); // recargar el valor en el input
    })
    .catch((error) => {
      console.error(error);
      alert("Error al modificar departamento");
    });

  document.getElementById("NewDep").value = "";
}

// Ejecutar automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrar();
});
