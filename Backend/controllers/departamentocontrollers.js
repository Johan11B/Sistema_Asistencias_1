exports.consultar = async (req, res) => {
    try {
        res.json({ nombre: "Nombre del Departamento" }); // Respuesta simulada
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        console.log("Nuevo nombre recibido:", nuevoNombre); // Simulación
        res.send("Departamento modificado exitosamente");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
