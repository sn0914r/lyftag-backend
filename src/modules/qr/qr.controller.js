const QrService = require("./qr.service");

const getVehicleInfoController = async (req, res) => {
  const publicId = req.params.publicId;
  const qrCode = await QrService.getVehicleInfo(publicId);
  return res.status(200).json(qrCode);
};

module.exports = {
  getVehicleInfoController,
};
