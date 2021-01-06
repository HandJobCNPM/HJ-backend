const sharp = require('sharp')
const path = require('path')
const multer = require('multer');

exports.upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

const imagePath = path.join(__dirname, '../../../views/public/images');

exports.resize = async (imageName, buffer) => {
    const filepath = path.resolve(`${imagePath}/${imageName}.webp`)
    const thumbnailPath = path.resolve(`${imagePath}/${imageName}-thumbnail.webp`)

    await sharp(buffer)
        .resize(200, 200, {
            fit: sharp.fit.outside,
            withoutEnlargement: true
        })
        .toFile(filepath);

    await sharp(buffer)
        .resize(30, 30, {
            fit: sharp.fit.outside,
            withoutEnlargement: true
        })
        .toFile(thumbnailPath);
}