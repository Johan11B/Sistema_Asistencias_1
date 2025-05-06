exports.consultar = async (req, res) => {
    try {
        // Lógica para consultar estudiante
        // Usando req.query para los parámetros (?tipoDoc=X&numDoc=Y)
        const { tipoDoc, numDoc } = req.query;
        // ... lógica de consulta ...
        res.json({ nombre: "Nombre del estudiante" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ingresar = async (req, res) => {
    try {
        // Lógica para crear nuevo estudiante
        const { nombre, tipoDocumento, numeroDocumento } = req.body;
        // ... lógica de creación ...
        res.status(201).send("Estudiante registrado exitosamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        // Lógica para modificar estudiante
        const { tipoDocumento, numeroDocumento, nuevoNombre, nuevoTipoDoc } = req.body;
        // ... lógica de modificación ...
        res.send("Estudiante modificado exitosamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};