// Datos quemados de estudiantes
const estudiantes = [
    {
        tipoDocumento: "CC",
        numeroDocumento: "12345678",
        nombre: "Juan Pérez",
        email: "juan@example.com",
        departamento: "Matemáticas"
    },
    {
        tipoDocumento: "TI",
        numeroDocumento: "98765432",
        nombre: "María García",
        email: "maria@example.com",
        departamento: "Ingeniería"
    }
];

// Consultar estudiante
exports.consultar = async (req, res) => {
    try {
        const { tipoDoc, numDoc } = req.query;
        
        // Respuesta quemada para consulta sin parámetros
        if (!tipoDoc || !numDoc) {
            return res.json(estudiantes); // Devuelve todos los estudiantes
        }
        
        // Buscar estudiante específico (simulado)
        const estudiante = estudiantes.find(e => 
            e.tipoDocumento === tipoDoc && e.numeroDocumento === numDoc
        );
        
        // Respuesta quemada si no encuentra
        if (!estudiante) {
            return res.json({ 
                tipoDocumento: tipoDoc,
                numeroDocumento: numDoc,
                nombre: "Estudiante de Ejemplo",
                email: "ejemplo@universidad.edu",
                departamento: "Ciencias"
            });
        }
        
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor (simulado)" });
    }
};

// Ingresar nuevo estudiante (simulado)
exports.ingresar = async (req, res) => {
    try {
        // Respuesta quemada de éxito
        res.status(200).json({ 
            mensaje: "Estudiante registrado exitosamente",
            datos: req.body
        });
    } catch (error) {
        res.status(400).json({ error: "Datos inválidos (simulado)" });
    }
};

// Modificar estudiante (simulado)
exports.modificar = async (req, res) => {
    try {
        // Respuesta quemada de éxito
        res.status(200).json({ 
            mensaje: "Estudiante modificado exitosamente",
            cambios: req.body
        });
    } catch (error) {
        res.status(400).json({ error: "Error al modificar (simulado)" });
    }
};