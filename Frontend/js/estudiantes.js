function guardarEstudiante(event) {
    event.preventDefault();
    const datos = {
        dni: document.getElementById("dni").value,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        email: document.getElementById("correo").value
    };

    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

function listarEstudiantes(event) {
    event.preventDefault();
    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/estudiantes")
        .then(res => res.json())
        .then(data => {
            let salida = "";
            data.forEach(est => {
                salida += `<p>DI: ${est.dni}<br>Nombre: ${est.nombre} ${est.apellidos}<br>Email: ${est.email}</p><br>`;
            });
            document.getElementById("rta").innerHTML = salida;
        })
        .catch(err => console.error(err));
}
