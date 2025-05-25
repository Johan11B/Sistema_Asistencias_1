const db = require('./firebaseConfig');

// Controlador para consultar
exports.consultar = async (req, res) => {
    try {
        const snapshot = await db.ref('departamento/nombre').once('value');
        const nombreDepartamento = snapshot.val() || "Departamento no definido";
        
        res.json({ nombre: nombreDepartamento });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para modificar
exports.modificar = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        
        // Validación
        if (!nuevoNombre || nuevoNombre.length < 4 || nuevoNombre.length > 50) {
            throw new Error("El nombre debe tener entre 4 y 50 caracteres");
        }
        
        // Actualización en Firebase
        await db.ref('departamento').update({ nombre: nuevoNombre });
        
        res.json({ 
            mensaje: "Departamento modificado exitosamente",
            nuevoNombre 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};