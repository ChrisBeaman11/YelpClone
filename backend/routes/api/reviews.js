const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {User, Review, Location, LocationImage, sequelize} = require("../../db/models");
const router = express.Router();


router.get("/current", requireAuth, async (req, res) => {
    let arr = [];
    let userId = req.user.id;
    let reviews = await Review.findAll({
      where: {
        userId: userId,
      },
    });
    for (let review of reviews) {
      let pojo = review.toJSON();

      let user = await User.findByPk(userId, {
        attributes: ["id", "firstName", "lastName"],
      });
      pojo.User = user;
      let location = await Location.findOne({
        where: {
          ownerId: user.id,
        },
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
      });
      let locationImage = await LocationImage.findOne({
        where: {
            locationId: review.locationId
        },
    })
      let pojo1 = location.toJSON();
      pojo1.previewImage = locationImage ? locationImage.url: null;
      pojo.Location = pojo1;
      let reviewImages = await ReviewImage.findAll({
        where: {
          reviewId: review.id,
        },
        attributes: ["id", "url"],
      });
      pojo.ReviewImages = reviewImages;
      arr.push(pojo)
    }
    return res.json({"Reviews": arr});
  });
  

  router.delete('/:reviewId', requireAuth, async (req, res) => {
    let reviewId = req.params.reviewId;
    let review = await Review.findByPk(reviewId);
    if(review){
        await review.destroy();
        return res.json({
            "message": "Successfully deleted"
          });
    }
    else{
        res.status(404);
        return res.json({
            "message": "Review couldn't be found"
          });
    }
})

module.exports = router;
