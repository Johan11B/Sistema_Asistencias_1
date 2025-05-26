// controllers/asignaturacontroller.js

/**
 * Controlador para manejar operaciones relacionadas con asignaturas
 */

// 1. Consultar Asignatura
exports.consultar = async (req, res) => {
    try {
        const { codigo, grupo, semestre } = req.query;
        
        /* 
        // Lógica real para consultar (ejemplo con base de datos)
        const asignatura = await Asignatura.findOne({
            where: {
                codigo,
                grupo,
                semestre
            }
        });
        
        if (!asignatura) {
            return res.status(404).json({ error: "Asignatura no encontrada" });
        }
        
        res.json(asignatura);
        */
        
        // Respuesta simulada (para desarrollo)
        res.json({
            nombre: "Nombre de la asignatura",
            codigo,
            grupo,
            semestre,
            creditos: 3 // Valor por defecto para pruebas
        });
        
    } catch (error) {
        console.error("Error al consultar asignatura:", error);
        res.status(500).json({ 
            error: error.message,
            mensaje: "Error interno al consultar la asignatura"
        });
    }
};

// 2. Registrar Asignatura
exports.ingresar = async (req, res) => {
    try {
        const { nombre, codigo, creditos, grupo, semestre } = req.body;
        
        // Validación básica
        if (!nombre || !codigo || !creditos || !grupo || !semestre) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        
        /*
        // Lógica real para registrar (ejemplo con base de datos)
        const [asignatura, created] = await Asignatura.findOrCreate({
            where: { codigo, grupo, semestre },
            defaults: { nombre, creditos }
        });
        
        if (!created) {
            return res.status(409).json({ error: "La asignatura ya existe" });
        }
        
        res.status(201).json({
            mensaje: "Asignatura registrada exitosamente",
            data: asignatura
        });
        */
        
        // Respuesta simulada (para desarrollo)
        res.status(201).json({
            mensaje: "Asignatura registrada exitosamente (simulado)",
            data: {
                nombre,
                codigo,
                creditos,
                grupo,
                semestre
            }
        });
        
    } catch (error) {
        console.error("Error al registrar asignatura:", error);
        res.status(400).json({ 
            error: error.message,
            mensaje: "Error al procesar el registro"
        });
    }
};

// 3. Modificar Asignatura
exports.modificar = async (req, res) => {
    try {
        const { codigo, grupo, semestre, nuevoNombre, nuevosCreditos } = req.body;
        
        // Validación básica
        if (!codigo || !grupo || !semestre) {
            return res.status(400).json({ error: "Los campos de identificación son requeridos" });
        }
        
        /*
        // Lógica real para modificar (ejemplo con base de datos)
        const result = await Asignatura.update(
            { 
                nombre: nuevoNombre, 
                creditos: nuevosCreditos 
            },
            { 
                where: { codigo, grupo, semestre } 
            }
        );
        
        if (result[0] === 0) {
            return res.status(404).json({ error: "Asignatura no encontrada" });
        }
        
        res.json({
            mensaje: "Asignatura modificada exitosamente",
            actualizados: result[0]
        });
        */
        
        // Respuesta simulada (para desarrollo)
        res.json({
            mensaje: "Asignatura modificada exitosamente (simulado)",
            data: {
                codigo,
                grupo,
                semestre,
                nuevoNombre,
                nuevosCreditos
            }
        });
        
    } catch (error) {
        console.error("Error al modificar asignatura:", error);
        res.status(400).json({ 
            error: error.message,
            mensaje: "Error al procesar la modificación"
        });
    }
};