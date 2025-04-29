// Variables globales
let estudiantes = [];
let asignaturas = [];

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'exito') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Funciones para Estudiantes 

function registrarEstudiante(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreEst').value;
    const tipoDoc = document.querySelector('form fieldset select').value;
    const numDoc = document.getElementById('numDocEst').value;

    // Validar que no exista ya el estudiante
    const existe = estudiantes.some(est => est.numeroDocumento === numDoc);
    if (existe) {
        mostrarNotificacion('El estudiante ya está registrado', 'error');
        return;
    }

    const nuevoEstudiante = {
        id: Date.now().toString(),
        nombre,
        tipoDocumento: tipoDoc,
        numeroDocumento: numDoc
    };

    estudiantes.push(nuevoEstudiante);
    mostrarNotificacion('Estudiante registrado con éxito');
    document.forms[0].reset();

    console.log('Estudiantes registrados:', estudiantes);
}

function consultarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.querySelectorAll('form')[1].querySelector('select').value;
    const numDoc = document.getElementById('numDocConsulta').value;

    const estudiante = estudiantes.find(est => 
        est.tipoDocumento === tipoDoc && est.numeroDocumento === numDoc
    );

    if (estudiante) {
        document.getElementById('NomEst').value = estudiante.nombre;
        mostrarNotificacion('Estudiante encontrado');
    } else {
        document.getElementById('NomEst').value = '';
        mostrarNotificacion('Estudiante no encontrado', 'error');
    }
}

function buscarEstudiante(event) {
    event.preventDefault();
    
    const tipoDoc = document.getElementById('tipoDocMod').value;
    const numDoc = document.getElementById('numDocMod').value;

    const estudiante = estudiantes.find(est => 
        est.tipoDocumento === tipoDoc && est.numeroDocumento === numDoc
    );

    if (estudiante) {
        document.getElementById('NuevoNombre').value = estudiante.nombre;
        document.getElementById('nuevoTipoDoc').value = estudiante.tipoDocumento;
        mostrarNotificacion('Estudiante encontrado');
    } else {
        document.getElementById('NuevoNombre').value = '';
        mostrarNotificacion('Estudiante no encontrado', 'error');
    }
}

function modificarEstudiante(event) {
    event.preventDefault();
    
    const tipoDocOriginal = document.getElementById('tipoDocMod').value;
    const numDocOriginal = document.getElementById('numDocMod').value;
    const nuevoNombre = document.getElementById('NuevoNombre').value;
    const nuevoTipoDoc = document.getElementById('nuevoTipoDoc').value;

    const index = estudiantes.findIndex(est => 
        est.tipoDocumento === tipoDocOriginal && est.numeroDocumento === numDocOriginal
    );

    if (index !== -1) {
        estudiantes[index] = {
            ...estudiantes[index],
            nombre: nuevoNombre,
            tipoDocumento: nuevoTipoDoc
        };
        
        mostrarNotificacion('Estudiante modificado con éxito');
        document.forms[2].reset();
        console.log('Estudiantes actualizados:', estudiantes);
    } else {
        mostrarNotificacion('Error al modificar estudiante', 'error');
    }
}

// ===== Funciones para Asignaturas =====

document.getElementById('consultAsign').addEventListener('click', function(event) {
    event.preventDefault();
    
    const codigo = document.getElementById('CodigoAsign').value;
    const grupo = document.getElementById('GrupoAsign').value;
    const semestre = document.getElementById('SemestreAsign').value;

    // Simulación de búsqueda de asignatura
    const asignatura = {
        codigo,
        grupo,
        semestre,
        nombre: `Asignatura ${codigo} - Grupo ${grupo}`
    };

    document.getElementById('NombreAsign').value = asignatura.nombre;
    mostrarNotificacion('Asignatura encontrada');
});

document.getElementById('AddEstudiante').addEventListener('click', function(event) {
    event.preventDefault();
    
    const codigo = document.getElementById('CodigoAsign').value;
    const grupo = document.getElementById('GrupoAsign').value;
    const semestre = document.getElementById('SemestreAsign').value;
    const codEst = document.getElementById('CodEst').value;
    const tipoDoc = document.getElementById('TipoDoc').value;

    // Buscar estudiante
    const estudiante = estudiantes.find(est => 
        est.numeroDocumento === codEst && est.tipoDocumento === tipoDoc
    );

    if (!estudiante) {
        mostrarNotificacion('Estudiante no encontrado', 'error');
        return;
    }

    // Simulación de registro en asignatura
    const registro = {
        asignatura: {
            codigo,
            grupo,
            semestre,
            nombre: document.getElementById('NombreAsign').value
        },
        estudiante: {
            codigo: codEst,
            nombre: estudiante.nombre
        },
        fecha: new Date().toISOString()
    };

    mostrarNotificacion(`Estudiante ${estudiante.nombre} registrado en la asignatura`);
    document.forms[3].reset();
    console.log('Registro de asignatura:', registro);
});