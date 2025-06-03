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
            
            if (!tipoDocumento || !numeroDocumento) {
                return res.status(400).json({ error: "Tipo y número de documento son requeridos" });
            }
            
            const snapshot = await estudiantesRef
                .where('tipoDocumento', '==', tipoDocumento)
                .where('numeroDocumento', '==', numeroDocumento)
                .limit(1)
                .get();
            
            if (snapshot.empty) {
                return res.status(404).json({ error: "Estudiante no encontrado" });
            }
            
            const estudiante = {
                id: snapshot.docs[0].id,
                ...snapshot.docs[0].data()
            };
            res.json(estudiante);
        } catch (error) {
            console.error("Error en consultarEstudiante:", error);
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
            
            if (nombre.length < 10 || nombre.length > 100) {
                return res.status(400).json({ error: "El nombre debe tener entre 10 y 100 caracteres" });
            }
            
            if (!/^\d{8,11}$/.test(numeroDocumento)) {
                return res.status(400).json({ error: "Número de documento inválido" });
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
            const nuevoEstudiante = {
                nombre: nombre.trim(),
                tipoDocumento,
                numeroDocumento,
                fechaRegistro: admin.firestore.FieldValue.serverTimestamp()
            };
            
            await estudiantesRef.add(nuevoEstudiante);
            
            res.status(201).json({ message: "Estudiante registrado exitosamente", data: nuevoEstudiante });
        } catch (error) {
            console.error("Error en registrarEstudiante:", error);
            res.status(500).json({ error: error.message });
        }
    }

    // Modificar estudiante
    async modificarEstudiante(req, res) {
        try {
            const { tipoDocumento, numeroDocumento, nuevoNombre, nuevoTipoDoc } = req.body;
            
            // Validar campos requeridos
            if (!tipoDocumento || !numeroDocumento) {
                return res.status(400).json({ error: "Tipo y número de documento son requeridos" });
            }
            
            // Buscar estudiante
            const snapshot = await estudiantesRef
                .where('tipoDocumento', '==', tipoDocumento)
                .where('numeroDocumento', '==', numeroDocumento)
                .limit(1)
                .get();
            
            if (snapshot.empty) {
                return res.status(404).json({ error: "Estudiante no encontrado" });
            }
            
            // Preparar datos para actualizar
            const updateData = {};
            const estudianteId = snapshot.docs[0].id;
            
            if (nuevoNombre && nuevoNombre.trim().length >= 10) {
                updateData.nombre = nuevoNombre.trim();
            }
            
            if (nuevoTipoDoc) {
                updateData.tipoDocumento = nuevoTipoDoc;
            }
            
            // Verificar que hay datos para actualizar
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ error: "No hay datos válidos para actualizar" });
            }
            
            // Actualizar
            await estudiantesRef.doc(estudianteId).update(updateData);
            
            res.json({ 
                message: "Estudiante modificado exitosamente",
                data: {
                    id: estudianteId,
                    ...updateData
                }
            });
        } catch (error) {
            console.error("Error en modificarEstudiante:", error);
            res.status(500).json({ error: error.message });
        }
    }

    // Consultar asignatura
    async consultarAsignatura(req, res) {
        try {
            const { codigo, grupo } = req.query;
            
            if (!codigo || !grupo) {
                return res.status(400).json({ error: "Código y grupo son requeridos" });
            }
            
            const asignaturaId = `${codigo}_${grupo}`;
            const doc = await asignaturasRef.doc(asignaturaId).get();
            
            if (!doc.exists) {
                return res.status(404).json({ error: "Asignatura no encontrada" });
            }
            
            res.json({
                id: doc.id,
                ...doc.data()
            });
        } catch (error) {
            console.error("Error en consultarAsignatura:", error);
            res.status(500).json({ error: error.message });
        }
    }

    // Agregar estudiante a asignatura
    async agregarEstudianteAsignatura(req, res) {
        try {
            const { codigoEstudiante, tipoDocumento, codigoAsignatura, grupo } = req.body;
            
            // Validaciones
            if (!codigoEstudiante || !tipoDocumento || !codigoAsignatura || !grupo) {
                return res.status(400).json({ error: "Todos los campos son requeridos" });
            }
            
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
            
            // Verificar si ya existe la relación
            const relacionExistente = await estudiantesAsignaturasRef
                .where('estudianteId', '==', estudianteSnapshot.docs[0].id)
                .where('asignaturaId', '==', asignaturaId)
                .limit(1)
                .get();
            
            if (!relacionExistente.empty) {
                return res.status(400).json({ error: "El estudiante ya está registrado en esta asignatura" });
            }
            
            // Registrar relación
            const nuevaRelacion = {
                estudianteId: estudianteSnapshot.docs[0].id,
                asignaturaId: asignaturaId,
                fechaRegistro: admin.firestore.FieldValue.serverTimestamp()
            };
            
            await estudiantesAsignaturasRef.add(nuevaRelacion);
            
            res.status(201).json({ 
                message: "Estudiante agregado a la asignatura exitosamente",
                data: nuevaRelacion
            });
        } catch (error) {
            console.error("Error en agregarEstudianteAsignatura:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EstudiantesController();