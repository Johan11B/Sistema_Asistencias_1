// 2. FUNCIÓN PARA MOSTRAR EL DEPARTAMENTO
function mostrar(event) {
    if(event) event.preventDefault();
    
    fetch("https://tudominio.netlify.app/.netlify/functions/departamento")
      .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
      })
      .then(data => {
        document.getElementById("NomDep").value = data.nombre || "No encontrado";
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("NomDep").value = "Error al cargar";
      });
}

// 3. FUNCIÓN PARA MODIFICAR EL DEPARTAMENTO
function Modify(event) {
    event.preventDefault();
    
    const nuevoNombre = document.getElementById("NewDep").value.trim();
    
    if (nuevoNombre.length < 4 || nuevoNombre.length > 50) {
        alert("El nombre debe tener entre 4 y 50 caracteres");
        return;
    }
    
    fetch("https://tudominio.netlify.app/.netlify/functions/departamento", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoNombre })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
    })
    .then(data => {
        alert(data.mensaje || "Modificación exitosa");
        mostrar(); // Actualiza la visualización
        document.getElementById("NewDep").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al modificar: " + error.message);
    });
}