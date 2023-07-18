const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {Location, Review, sequelize, LocationImage} = require("../../db/models")
const router = express.Router();

router.get("/", async (req, res) => {
    let arr = [];

    const locations = await Location.findAll();
    for (let location of locations) {
      const numOfReviews = await Review.count({
        where: {
          locationId: location.id,
        },
      });
      const totalStars = await Review.findAll({
        attributes: [[sequelize.fn("sum", sequelize.col("rating")), "total"]],
        where: {
          locationId: location.id,
        },
      });
      let avgStars = totalStars[0].dataValues.total / numOfReviews;
      let pojo = location.toJSON();
      location.avgRating = avgStars;
      const previewImg = await LocationImage.findAll({
        where: {
          locationId: location.id,
        },
      });
      if (previewImg.length) {
        pojo.previewImage = previewImg[0].dataValues.url;
      }
      if (!previewImg.length) {
        pojo.previewImage = null;
      }
      arr.push(pojo);
    }
    return res.json({ Locations: arr });
  });

module.exports = router;
