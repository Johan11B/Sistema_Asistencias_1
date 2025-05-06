function guardarAsignatura(event) {
    event.preventDefault();
    const datos = {
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        creditos: document.getElementById("creditos").value
    };

    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/asignaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

function listarAsignaturas(event) {
    event.preventDefault();
    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/asignaturas")
        .then(res => res.json())
        .then(data => {
            let salida = "";
            data.forEach(asig => {
                salida += `<p>Código: ${asig.codigo}<br>Nombre: ${asig.nombre}<br>Créditos: ${asig.creditos}</p><br>`;
            });
            document.getElementById("rta").innerHTML = salida;
        })
        .catch(err => console.error(err));
}
