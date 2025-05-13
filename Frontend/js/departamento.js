// Mostrar Departamento
function mostrar(event) {
    event.preventDefault();
    
    fetch("https://tu-sitio.netlify.app/.netlify/functions/departamento")
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
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      "nuevoNombre": document.getElementById("NewDep").value
    });
  
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://tu-sitio.netlify.app/.netlify/functions/departamento", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Departamento modificado exitosamente");
        mostrar(event); 
      })
      .catch((error) => {
        console.error(error);
        alert("Error al modificar departamento");
      });
  }