class EstudiantesController {
    constructor() {
        // Base de datos simulada
        this.estudiantes = [
            {nombre: "Daniel Esteban", tipoDocumento: "CC", numeroDocumento: "1077112696"},
            {nombre: "Pedro González", tipoDocumento: "CC", numeroDocumento: "1037112636"}
        ];
        
        this.asignaturas = [
            {codigo: "IS001", nombre: "Programación I", grupo: "401M", semestre: 3},
            {codigo: "IS002", nombre: "Bases de Datos", grupo: "402M", semestre: 4}
        ];
        
        this.estudiantesAsignaturas = [];
    }

    // Operaciones con Estudiantes
    consultarEstudiante(req, res) {
        try {
            const { tipoDocumento, numeroDocumento } = req.query;
            const estudiante = this.estudiantes.find(e => 
                e.tipoDocumento === tipoDocumento && 
                e.numeroDocumento === numeroDocumento
            );
            
            res.json(estudiante || { error: "Estudiante no encontrado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    registrarEstudiante(req, res) {
        try {
            const { nombre, tipoDocumento, numeroDocumento } = req.body;
            
            // Validaciones
            if (!nombre || !tipoDocumento || !numeroDocumento) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }
            
            // Verificar si ya existe
            const existe = this.estudiantes.some(e => 
                e.tipoDocumento === tipoDocumento && 
                e.numeroDocumento === numeroDocumento
            );
            
            if (existe) {
                return res.status(400).json({ error: "El estudiante ya está registrado" });
            }
            
            // Registrar
            this.estudiantes.push({ nombre, tipoDocumento, numeroDocumento });
            res.status(201).send("Estudiante registrado exitosamente");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    modificarEstudiante(req, res) {
        try {
            const { tipoDocumento, numeroDocumento, nuevoNombre, nuevoTipoDoc } = req.body;
            
            const index = this.estudiantes.findIndex(e => 
                e.tipoDocumento === tipoDocumento && 
                e.numeroDocumento === numeroDocumento
            );
            
            if (index !== -1) {
                this.estudiantes[index].nombre = nuevoNombre;
                this.estudiantes[index].tipoDocumento = nuevoTipoDoc;
                res.send("Estudiante modificado exitosamente");
            } else {
                res.status(404).json({ error: "Estudiante no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Operaciones con Asignaturas
    consultarAsignatura(req, res) {
        try {
            const { codigo, grupo, semestre } = req.query;
            const asignatura = this.asignaturas.find(a => 
                a.codigo === codigo && 
                a.grupo === grupo && 
                a.semestre === parseInt(semestre)
            );
            
            res.json(asignatura || { error: "Asignatura no encontrada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    agregarEstudianteAsignatura(req, res) {
        try {
            const { codigoEstudiante, tipoDocumento, codigoAsignatura, grupo } = req.body;
            
            // Verificar que existan ambos
            const estudiante = this.estudiantes.find(e => 
                e.numeroDocumento === codigoEstudiante && 
                e.tipoDocumento === tipoDocumento
            );
            
            const asignatura = this.asignaturas.find(a => 
                a.codigo === codigoAsignatura && 
                a.grupo === grupo
            );
            
            if (!estudiante || !asignatura) {
                return res.status(404).json({ error: "Estudiante o asignatura no encontrados" });
            }
            
            // Registrar relación
            this.estudiantesAsignaturas.push({
                codigoEstudiante,
                tipoDocumento,
                codigoAsignatura,
                grupo
            });
            
            res.status(201).send("Estudiante agregado a la asignatura exitosamente");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EstudiantesController();