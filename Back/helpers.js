const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const { nanoid } = require("nanoid");

const uploadPath = path.join(__dirname, "static");

async function saveImage({ data }) {
  // Garantizar que el directorio existe
  await fs.mkdir(uploadPath, { recursive: true });

  // Cargar la imagen en sharp
  const image = sharp(data);

  // Sacar información de la imagen
  const metadata = await image.metadata();

  // Cambiar el tamaño de la imagen a 1000 pixel de ancho si lo necesita
  if (metadata.width > 1000) {
    image.resize(1000);
  }

  // Generar un nombre aleatorio para la imagen
  const savedImageName = nanoid() + ".jpg";

  // Guardar la imagen en disco
  await image.toFile(path.join(uploadPath, savedImageName));

  // Devolver el nombre aleatorio
  return savedImageName;
}

module.exports = {
  saveImage,
};
