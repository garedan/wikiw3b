import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Conexion de la db exitosa");
} catch (error) {
    console.log("NO se pudo conectar" + error);
}