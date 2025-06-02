const admin = require('./firebaseAdmin');
const db = admin.firestore();
const docRef = db.collection('configuracion').doc('departamento');

exports.consultar = async (req, res) => {
  try {
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json(snapshot.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.modificar = async (req, res) => {
  try {
    const { nuevoNombre } = req.body;

    if (!nuevoNombre || nuevoNombre.length < 4 || nuevoNombre.length > 50) {
      return res.status(400).json({ error: 'Nombre inválido' });
    }

    await docRef.set({ nombre: nuevoNombre }, { merge: true });
    res.send("Departamento modificado exitosamente");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
