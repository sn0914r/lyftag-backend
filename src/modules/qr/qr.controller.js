const QrService = require("./qr.service");

const getVehicleInfoController = async (req, res) => {
  const publicId = req.params.publicId;
  const qrCode = await QrService.getVehicleInfo(publicId);

  return res.status(200).json({
    success: true,
    message: "QR info fetched successfully",
    data: qrCode,
  });
};

module.exports = {
  getVehicleInfoController,
};
