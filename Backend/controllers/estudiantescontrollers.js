// Simulación de datos
let estudiantes = [
    { id: 1, tipoDocumento: "CC", numeroDocumento: "123456", nombre: "Juan Pérez" },
    { id: 2, tipoDocumento: "TI", numeroDocumento: "654321", nombre: "María García" }
];

exports.consultar = async (req, res) => {
    try {
        const { tipoDoc, numDoc } = req.query;
        
        // Si se proporcionan parámetros, buscar estudiante específico
        if (tipoDoc && numDoc) {
            const estudiante = estudiantes.find(e => 
                e.tipoDocumento === tipoDoc && e.numeroDocumento === numDoc
            );
            
            if (!estudiante) {
                return res.status(404).json({ error: "Estudiante no encontrado" });
            }
            
            return res.json(estudiante);
        }
        
        // Si no hay parámetros, devolver todos los estudiantes
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ingresar = async (req, res) => {
    try {
        const { nombre, tipoDocumento, numeroDocumento } = req.body;
        
        // Validación básica
        if (!nombre || !tipoDocumento || !numeroDocumento) {
            throw new Error("Todos los campos son obligatorios");
        }
        
        // Crear nuevo estudiante
        const nuevoEstudiante = {
            id: estudiantes.length + 1,
            tipoDocumento,
            numeroDocumento,
            nombre
        };
        
        estudiantes.push(nuevoEstudiante);
        
        res.status(201).json({ 
            mensaje: "Estudiante registrado exitosamente",
            estudiante: nuevoEstudiante
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        const { tipoDocumento, numeroDocumento, nuevoNombre, nuevoTipoDoc } = req.body;
        
        // Buscar estudiante
        const index = estudiantes.findIndex(e => 
            e.tipoDocumento === tipoDocumento && e.numeroDocumento === numeroDocumento
        );
        
        if (index === -1) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }
        
        // Actualizar datos
        if (nuevoNombre) estudiantes[index].nombre = nuevoNombre;
        if (nuevoTipoDoc) estudiantes[index].tipoDocumento = nuevoTipoDoc;
        
        res.json({ 
            mensaje: "Estudiante modificado exitosamente",
            estudiante: estudiantes[index]
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};