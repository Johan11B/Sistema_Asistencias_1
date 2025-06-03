// Consultar nombre del departamento
function mostrar(event) {
  event.preventDefault();

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento")
    .then((response) => response.json())
    .then((result) => {
      console.log("Consulta recibida:", result);
      document.getElementById("NomDep").value = result.nombre || "No encontrado";
    })
    .catch((error) => {
      console.error("Error al consultar:", error);
      document.getElementById("NomDep").value = "Error al consultar";
    });
}

// Modificar nombre del departamento
function Modify(event) {
  event.preventDefault();
  const nuevoNombre = document.getElementById("NewDep").value.trim();

  // Validación
  if (nuevoNombre.length < 4 || nuevoNombre.length > 50) {
    alert("El nuevo nombre debe tener entre 4 y 50 caracteres");
    return;
  }

  console.log("Enviando nuevo nombre:", nuevoNombre);

  fetch("https://sistemadeasistencia.netlify.app/.netlify/functions/departamento", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nuevoNombre: nuevoNombre })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al modificar. Código: " + response.status);
      }
      return response.text();
    })
    .then((result) => {
      console.log("Modificación exitosa:", result);
      alert("Departamento modificado exitosamente");
      document.getElementById("NewDep").value = "";
      mostrar(event); // Actualiza el campo de arriba
    })
    .catch((error) => {
      console.error("Error al modificar:", error);
      alert("Error al modificar departamento");
    });
}
