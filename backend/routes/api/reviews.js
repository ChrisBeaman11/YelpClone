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
  router.put('/:reviewId', requireAuth, async (req, res) => {
    let errors = {};
    let userId = req.user.id;
    let reviewId = req.params.reviewId;
    let thisReview = await Review.findByPk(reviewId);
    const {review, rating} = req.body;
    if(thisReview){
        const newReview = await Review.create({
            userId: userId,
            spotId: thisReview.spotId,
            review,
            rating
        })
        if(!req.body.review){
            errors.review = "Review text is required";
        }
        if(req.body.rating > 5 || req.body.rating <1 || !req.body.rating){
            errors.rating = "rating must be an integer from 1 to 5";
        }
        if(!Object.keys(errors).length){
            res.status(200);
            return res.json(newReview);
            }
            else{
                res.status(400);
                return res.json({
                    "message": "Bad Request", errors
                });
            }
    }
    else{
        res.status(404);
        return res.json({
            "message": "Review couldn't be found"
          });
    }
})


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
