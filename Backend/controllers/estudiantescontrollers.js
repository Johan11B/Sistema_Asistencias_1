const admin = require('./firebaseAdmin');
const db = admin.firestore();
const estudiantesRef = db.collection('estudiantes');
const asignaturasRef = db.collection('asignaturas');
const estudiantesAsignaturasRef = db.collection('estudiantes_asignaturas');

class EstudiantesController {
    // Consultar estudiante por tipo y número de documento
    async consultarEstudiante(req, res) {
        try {
            const { tipoDocumento, numeroDocumento } = req.query;
            
            const snapshot = await estudiantesRef
                .where('tipoDocumento', '==', tipoDocumento)
                .where('numeroDocumento', '==', numeroDocumento)
                .limit(1)
                .get();
            
            if (snapshot.empty) {
                return res.status(404).json({ error: "Estudiante no encontrado" });
            }
            
            const estudiante = snapshot.docs[0].data();
            res.json(estudiante);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Registrar nuevo estudiante
    async registrarEstudiante(req, res) {
        try {
            const { nombre, tipoDocumento, numeroDocumento } = req.body;
            
            // Validaciones
            if (!nombre || !tipoDocumento || !numeroDocumento) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }
            
            // Verificar si ya existe
            const existe = await estudiantesRef
                .where('tipoDocumento', '==', tipoDocumento)
                .where('numeroDocumento', '==', numeroDocumento)
                .limit(1)
                .get();
            
            if (!existe.empty) {
                return res.status(400).json({ error: "El estudiante ya está registrado" });
            }
            
            // Registrar
            await estudiantesRef.add({
                nombre,
                tipoDocumento,
                numeroDocumento,
                fechaRegistro: admin.firestore.FieldValue.serverTimestamp()
            });
            
            res.status(201).send("Estudiante registrado exitosamente");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Modificar estudiante
    async modificarEstudiante(req, res) {
        try {
            const { tipoDocumento, numeroDocumento, nuevoNombre, nuevoTipoDoc } = req.body;
            
            // Buscar estudiante
            const snapshot = await estudiantesRef
                .where('tipoDocumento', '==', tipoDocumento)
                .where('numeroDocumento', '==', numeroDocumento)
                .limit(1)
                .get();
            
            if (snapshot.empty) {
                return res.status(404).json({ error: "Estudiante no encontrado" });
            }
            
            // Actualizar
            const estudianteId = snapshot.docs[0].id;
            await estudiantesRef.doc(estudianteId).update({
                nombre: nuevoNombre,
                tipoDocumento: nuevoTipoDoc
            });
            
            res.send("Estudiante modificado exitosamente");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Consultar asignatura
    async consultarAsignatura(req, res) {
        try {
            const { codigo, grupo } = req.query;
            const asignaturaId = `${codigo}_${grupo}`;
            
            const doc = await asignaturasRef.doc(asignaturaId).get();
            
            if (!doc.exists) {
                return res.status(404).json({ error: "Asignatura no encontrada" });
            }
            
            res.json(doc.data());
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Agregar estudiante a asignatura
    async agregarEstudianteAsignatura(req, res) {
        try {
            const { codigoEstudiante, tipoDocumento, codigoAsignatura, grupo } = req.body;
            
            // Verificar estudiante
            const estudianteSnapshot = await estudiantesRef
                .where('numeroDocumento', '==', codigoEstudiante)
                .where('tipoDocumento', '==', tipoDocumento)
                .limit(1)
                .get();
            
            if (estudianteSnapshot.empty) {
                return res.status(404).json({ error: "Estudiante no encontrado" });
            }
            
            // Verificar asignatura
            const asignaturaId = `${codigoAsignatura}_${grupo}`;
            const asignaturaDoc = await asignaturasRef.doc(asignaturaId).get();
            
            if (!asignaturaDoc.exists) {
                return res.status(404).json({ error: "Asignatura no encontrada" });
            }
            
            // Registrar relación
            await estudiantesAsignaturasRef.add({
                estudianteId: estudianteSnapshot.docs[0].id,
                asignaturaId: asignaturaId,
                fechaRegistro: admin.firestore.FieldValue.serverTimestamp()
            });
            
            res.status(201).send("Estudiante agregado a la asignatura exitosamente");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EstudiantesController();