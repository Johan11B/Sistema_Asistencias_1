function guardarAsistencia(event) {
    event.preventDefault();
    const datos = {
        estudiante: document.getElementById("estudiante").value,
        asignatura: document.getElementById("asignatura").value,
        fecha: document.getElementById("fecha").value,
        presente: document.getElementById("presente").checked
    };

    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/asistencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

function listarAsistencias(event) {
    event.preventDefault();
    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/asistencias")
        .then(res => res.json())
        .then(data => {
            let salida = "";
            data.forEach(asist => {
                salida += `<p>Estudiante: ${asist.estudiante}<br>Asignatura: ${asist.asignatura}<br>Fecha: ${asist.fecha}<br>Presente: ${asist.presente ? 'Sí' : 'No'}</p><br>`;
            });
            document.getElementById("rta").innerHTML = salida;
        })
        .catch(err => console.error(err));
}
