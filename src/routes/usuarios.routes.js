const express = require("express");
const router = express.Router();
const usuarios = require("../models/usuarios");
const nodeMailer = require("nodemailer");
// Registro de administradores
router.post("/registro", async (req, res) => {
    const { email } = req.body;

    // Inicia validacion para no registrar usuarios con el mismo correo electronico
    const busqueda = await usuarios.findOne({ email });

    if (busqueda && busqueda.email === email) {
        return res.status(401).json({ mensaje: "Ya existe un usuario con este correo" });
    } else {
        const usuarioRegistrar = usuarios(req.body);
        await usuarioRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del usuario", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
    }
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "saludchanelinfo@gmail.com",
            pass: "slbo dlus harn uhyp",
        },
    });

    const mailOptions = {
        from: "SALUD CHANNEL <saludchanelinfo@gmail.com>",
        to: email,
        subject: "CUENTA EN SALUD CHANNEL CREADA CON EXITO" + "\n" + "¡Bienvenido(a) a nuestro sitio web!" + "\n" + "Nos alegra tenerte como parte de nuestra comunidad. Gracias por registrarte y unirte a nosotros. Estamos emocionados de compartir contigo todo lo que nuestro sitio tiene para ofrecer." + "\n" + "Nuestro objetivo es brindarte la mejor experiencia posible." + "\n" + "Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. Estamos aquí para ayudarte." + "\n" + "Gracias nuevamente por unirte a nosotros. ¡Esperamos que disfrutes de tu tiempo en nuestro sitio!" + "\n" + "Atentamente," + "\n" + "El equipo de SALUD CHANNEL"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    });

    return res.status(200).json({
        message: "El estado de cuenta fue enviado a su correo",
    });
});

// Obtener todos los usuarios colaboradores
router.get("/listar", async (req, res) => {
    usuarios
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los usuarios colaboradores
router.get("/listarCajeros", async (req, res) => {
    usuarios
        .find({ tipo: "interno", admin: "false", estadoUsuario: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los usuarios colaboradores
router.get("/listarClientes", async (req, res) => {
    usuarios
        .find({ tipo: "externo", estadoUsuario: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoActivos", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await usuarios
        .find({ tipo: "interno", estadoUsuario: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalUsuariosActivos", async (_req, res) => {
    await usuarios
        .find({ tipo: "interno", estadoUsuario: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoClientes", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await usuarios
        .find({ tipo: "externo" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalClientes", async (_req, res) => {
    await usuarios
        .find({ tipo: "externo" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCancelados", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await usuarios
        .find({ tipo: "interno", estadoUsuario: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalUsuariosCancelados", async (_req, res) => {
    await usuarios
        .find({ tipo: "interno", estadoUsuario: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando los usuarios
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await usuarios
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un usuario en especifico
router.get("/obtenerUsuario/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    usuarios
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un usuario en especifico
router.get("/obtenerPorCorreo/:email", async (req, res) => {
    const { email } = req.params;
    console.log(email)
    usuarios
        .findOne({ email })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del usuario
router.put("/actualizarContrasena/:id", async (req, res) => {
    const { id } = req.params;
    const { contraseña } = req.body;

    await usuarios
        .updateOne({ _id: id }, { $set: { contraseña } })
        .then((data) => res.status(200).json({ mensaje: "Contraseña actualizada" }))
        .catch((error) => res.json({ message: error }));
});

// Borrar un usuario administrador
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    usuarios
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Usuario eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado del usuario
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estadoUsuario } = req.body;
    usuarios
        .updateOne({ _id: id }, { $set: { estadoUsuario } })
        .then((data) => res.status(200).json({ mensaje: "Estado del usuario actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del usuario
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, imagen, email, contraseña, rol } = req.body;

    await usuarios
        .updateOne({ _id: id }, { $set: { nombre, apellido, imagen, email, contraseña, rol } })
        .then((data) => res.status(200).json({ mensaje: "Datos del usuario actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
