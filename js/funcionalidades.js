let nombre_departamento = "Ingeniería de sistemas";
function mostrar(event){
    event.preventDefault();
    document.getElementById("NomDep").value = nombre_departamento;
}
function Modify(event){
    event.preventDefault();
    let nuevo_nombre = "";
    nuevo_nombre = document.getElementById("NewDep").value;
    if(nuevo_nombre.length>=4){
        nombre_departamento = nuevo_nombre;
    document.getElementById("NewDep").value = "";
    }else{
        alert("El nuevo nombre debe tener al menos 4 caracteres")
    }
}