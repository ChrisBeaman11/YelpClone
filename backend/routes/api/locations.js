const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {Location, Review, sequelize, LocationImage, User} = require("../../db/models")
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
      pojo.avgStarRating = avgStars;
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
    console.log("THIS IS THE ARR, ", arr)
    return res.json({ Locations: arr });
  });
  router.get("/current", requireAuth, async (req, res) => {
    let arr = [];
    const userId = req.user.id;
    let ownedLocations = await Location.findAll({
      where: {
        ownerId: userId,
      },
    });
    for (let location of ownedLocations) {
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
      pojo.avgStarRating = avgStars;
      const previewImg = await LocationImage.findAll({
        where: {
          preview: true,
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

  router.get("/:locationId", async (req, res) => {
    let locationId = req.params.locationId;
    let location = await Location.findByPk(locationId);
    if (location) {
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
      let avgStarRating = totalStars[0].dataValues.total / numOfReviews;
      let locationImages = await LocationImage.findAll({
        where: {
          locationId: locationId,
        },

        attributes: ["id", "url", "preview"],
      });
      let owner = await User.findByPk(location.ownerId, {
        attributes: ["id", "firstName", "lastName"],
      });
      let pojo = location.toJSON();
      pojo.numReviews = numOfReviews;
      pojo.avgStarRating = avgStarRating;
      pojo.LocationImages = locationImages;
      pojo.Owner = owner;
      return res.json(pojo);
    } else {
      return res.json({
        message: "Location couldn't be found",
      });
    }
  });

  router.post("/", requireAuth, async (req, res) => {
    let errors = {};

    if (!req.body.city) {
      errors.city = "City is required";
    }
    if (!req.body.state) {
      errors.state = "State is required";
    }
    if (!req.body.country) {
      errors.country = "Country is required";
    }
    if (req.body.name) {
      if (req.body.name.length > 49) {
        errors.name = "Name must be less than 50 characters";
      }
    }
    if (!req.body.description) {
      errors.description = "Description is required";
    }

    try {
      const {
        city,
        state,
        country,
        name,
        description
      } = req.body;
      const location = await Location.create({
        ownerId: req.user.id,
        city,
        state,
        country,
        name,
        description
      });
      res.status(201);
      return res.json(location);
    } catch (e) {
      return res.json({
        message: "Bad Request",
        e,
      });
    }
  });

  router.put("/:locationId", requireAuth, async (req, res) => {
    let errors = {};
    let locationId = req.params.locationId;
    let location = await Location.findByPk(locationId);
    if (location) {

      if (!req.body.city) {
        errors.city = "City is required";
      }
      if (!req.body.state) {
        errors.state = "State is required";
      }
      if (!req.body.country) {
        errors.country = "Country is required";
      }
      if (req.body.name) {
        if (req.body.name.length > 49) {
          errors.name = "Name must be less than 50 characters";
        }
      }
      if (!req.body.description) {
        errors.description = "Description is required";
      }
      const {
        city,
        state,
        country,
        name,
        description
      } = req.body;
      const updatedLocation = await location.update({
        ownerId: req.user.id,
        city,
        state,
        country,
        name,
        description
      });
      if (!Object.keys(errors).length) {
        res.status(200);
        return res.json(location);
      } else {
        res.status(400);
        return res.json({
          message: "Bad Request",
          errors,
        });
      }
    } else {
      res.status(404);
      return res.json({
        message: "location couldn't be found",
      });
    }
  });
  router.delete("/:locationId", requireAuth, async (req, res) => {
    let locationId = req.params.locationId;
    let location = await Location.findByPk(locationId);
    if (location) {
      await location.destroy();
      return res.json({
        message: "Successfully deleted",
      });
    } else {
      res.status(404);
      return res.json({
        message: "Location couldn't be found",
      });
    }
  });
  router.get("/:locationId/reviews", async (req, res) => {
    let arr = [];
    let locationId = req.params.locationId;
    let location = await Location.findByPk(locationId);
    if (location) {
      let reviews = await Review.findAll({
        where: {
          locationId: locationId,
        },

      });

      for (let review of reviews) {
        let pojo = review.toJSON();
        let user = await User.findOne({
          where: {
            id: review.userId,
          },
          attributes: ["id", "firstName", "lastName"],
        });
        pojo.User = user;
        arr.push(pojo);
      }

      return res.json({ Reviews: arr });
    } else {
      res.status(404);
      return res.json({
        message: "Location couldn't be found",
      });
    }
  });
  router.post("/:locationId/reviews", requireAuth, async (req, res) => {
    try {
      let locationId = req.params.locationId;
      let userId = req.user.id;
      let reviewExists = await Review.findOne({
        where: {
          locationId: locationId,
          userId: userId,
        },
      });

      if (reviewExists) {
        res.status(500);
        return res.json({
          message: "User already has a review for this location",
        });
      }

      let errors = {};
      const { review, rating } = req.body;
      let location = await Location.findByPk(locationId);
      if (location) {
        const newReview = await Review.create({
          userId: userId,
          locationId: locationId,
          review,
          rating: rating,
        });
        if (!req.body.review) {
          errors.review = "Review text is required";
        }
        if (req.body.rating > 5 || req.body.rating < 1 || !req.body.rating) {
          errors.rating = "rating must be an integer from 1 to 5";
        }
        if (!Object.keys(errors).length) {
          res.status(201);
          return res.json(newReview);
        } else {
          res.status(400);
          return res.json({
            message: "Bad Request",
            errors,
          });
        }
      } else {
        res.status(404);
        return res.json({
          message: "Location couldn't be found",
        });
      }
    } catch (e) {
      res.status(400);
      return res.json({ error: e });
    }
  });
  router.post("/:locationId/images", requireAuth, async (req, res) => {
    let locationId = req.params.locationId;
    const { url, preview } = req.body;
    let location = await Location.findByPk(locationId);
    if (location) {
      let locationImage = await LocationImage.create({
        url,
        preview,
        locationId,
      });

      return res.json({
        id: locationImage.id,
        url: locationImage.url,
        preview: locationImage.preview,
      });
    } else {
      res.status(404);
      return res.json({
        message: "Location couldn't be found",
      });
    }
  });
  router.get("/:locationId/reviews", async (req, res) => {
    let arr = [];
    let locationId = req.params.locationId;
    let location = await Location.findByPk(locationId);
    if (location) {
      let reviews = await Review.findAll({
        where: {
          locationId: locationId,
        }
      });

      for (let review of reviews) {
        let pojo = review.toJSON();
        let user = await User.findOne({
          where: {
            id: review.userId,
          },
          attributes: ["id", "firstName", "lastName"],
        });
        pojo.User = user;
        arr.push(pojo);
      }

      return res.json({ Reviews: arr });
    } else {
      res.status(404);
      return res.json({
        message: "Location couldn't be found",
      });
    }
  });

module.exports = router;
