// Base de datos simulada
let asignaturasDB = [
    {codigo: "IS001", nombre: "Programación I", creditos: 3, grupo: "401M", semestre: 3},
    {codigo: "IS002", nombre: "Bases de Datos", creditos: 4, grupo: "402M", semestre: 4}
];

exports.consultar = async (req, res) => {
    try {
        const { codigo, grupo, semestre } = req.query;
        
        const asignatura = asignaturasDB.find(a => 
            a.codigo === codigo && 
            a.grupo === grupo && 
            a.semestre === parseInt(semestre)
        );
        
        if (asignatura) {
            res.json(asignatura);
        } else {
            res.status(404).json({ error: "Asignatura no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ingresar = async (req, res) => {
    try {
        const { nombre, codigo, creditos, grupo, semestre } = req.body;
        
        // Validaciones
        if (!nombre || !codigo || !creditos || !grupo || !semestre) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        
        // Verificar si ya existe
        const existe = asignaturasDB.some(a => 
            a.codigo === codigo && 
            a.grupo === grupo && 
            a.semestre === parseInt(semestre)
        );
        
        if (existe) {
            return res.status(400).json({ error: "La asignatura ya está registrada" });
        }
        
        // Registrar nueva asignatura
        asignaturasDB.push({ 
            nombre, 
            codigo, 
            creditos: parseInt(creditos), 
            grupo, 
            semestre: parseInt(semestre)
        });
        
        res.status(201).send("Asignatura registrada exitosamente");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        const { codigo, grupo, semestre, nuevoNombre, nuevosCreditos } = req.body;
        
        const index = asignaturasDB.findIndex(a => 
            a.codigo === codigo && 
            a.grupo === grupo && 
            a.semestre === parseInt(semestre)
        );
        
        if (index !== -1) {
            asignaturasDB[index].nombre = nuevoNombre;
            asignaturasDB[index].creditos = parseInt(nuevosCreditos);
            res.send("Asignatura modificada exitosamente");
        } else {
            res.status(404).json({ error: "Asignatura no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};