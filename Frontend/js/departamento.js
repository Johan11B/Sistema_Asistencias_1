// Mostrar Departamento

let nombreDepartamento = "Ingeniería de Sistemas";

function mostrar(event){
  if(event){
    event.preventDefault();
  }
  document.getElementById("NomDep").value = nombreDepartamento;
/**function mostrar(event) {
    event.preventDefault();
    
    fetch("https://ejemplofirebase.netlify.app/.netlify/functions/departamento")
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("NomDep").value = result.nombre || "No encontrado";
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("NomDep").value = "Error al consultar";
      });
  }**/
}
  // Modificar Departamento
function Modify(event) {
    event.preventDefault();
    const nuevoNombre = document.getElementById("NewDep").value.trim();

    if(nuevoNombre.length < 4 || nuevoNombre.length >50){
      alert("El nuevo nombre debe tener entre 4 y 50 carácteres");
      return;
    }
    nombreDepartamento = nuevoNombre;
    document.getElementById("NewDep").value = "";

    /*const myHeaders = new Headers();
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
  
    fetch("https://ejemplofirebase.netlify.app/.netlify/functions/departamento", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Departamento modificado exitosamente");
        mostrar(event); 
      })
      .catch((error) => {
        console.error(error);
        alert("Error al modificar departamento");
      });*/
}