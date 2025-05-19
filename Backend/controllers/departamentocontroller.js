let nombreDepartamento = "Departamento de Matemáticas"; // Simulamos una base de datos en memoria

exports.consultar = async (req, res) => {
    try {
        res.json({ nombre: nombreDepartamento });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        if (!nuevoNombre || nuevoNombre.length < 4 || nuevoNombre.length > 50) {
            throw new Error("El nombre debe tener entre 4 y 50 caracteres");
        }
        
        nombreDepartamento = nuevoNombre; // Actualizamos el nombre en memoria
        res.json({ mensaje: "Departamento modificado exitosamente", nuevoNombre });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};