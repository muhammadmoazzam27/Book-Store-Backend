const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API_KEY
})

async function checkCloudinaryConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log("Cloudinary connected successfully:", result); // Expected output: { status: 'ok' }
  } catch (error) {
    console.error("Cloudinary connection failed:", error.message);
  }
}

module.exports = { cloudinary, checkCloudinaryConnection };
