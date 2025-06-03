const db = require("./firebaseAdmin");


exports.consultar = async (req, res) => {
    try {
        const doc = await db.collection("Departamento").doc("Informacion").get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Departamento no encontrado" });
    }
        res.json({ nombre: doc.data().Nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modificar = async (req, res) => {
    try {
        // Fallback para Netlify Functions
        if (!req.body || Object.keys(req.body).length === 0) {
            if (req.rawBody) {
                req.body = JSON.parse(Buffer.from(req.rawBody).toString("utf8"));
            } else {
                return res.status(400).json({ error: "Cuerpo vacío o no parseado" });
            }
        }

        console.log("Body recibido:", req.body);
        const { Nombre } = req.body;

        if (!Nombre || typeof Nombre !== "string" || Nombre.trim().length < 4) {
            return res.status(400).json({ error: "Nombre inválido o vacío" });
        }

        await db.collection("Departamento").doc("Informacion").set({ Nombre });
        res.send("Departamento modificado exitosamente");
    } catch (error) {
        console.error("Error al modificar:", error.message);
        res.status(400).json({ error: error.message });
    }
};
