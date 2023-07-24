'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        locationId: 1,
        userId: 2,
        review: "The food was so awful here. Would not recommend.",
        rating: 1
      },
      {
        locationId: 1,
        userId: 3,
        review: "The food was great here. Would recommend.",
        rating: 5
      },
      {
        locationId: 2,
        userId: 2,
        review: "The food was so awful here. Would not recommend.",
        rating: 2
      },
      {
        locationId: 2,
        userId: 1,
        review: "The food was great here. Would recommend.",
        rating: 4
      },{
        locationId: 3,
        userId: 1,
        review: "The food was so awful here. Would not recommend.",
        rating: 1
      },
      {
        locationId: 3,
        userId: 3,
        review: "The food was great here. Would recommend.",
        rating: 5
      },{
        locationId: 4,
        userId: 2,
        review: "The food was so awful here. Would not recommend.",
        rating: 1
      },
      {
        locationId: 4,
        userId: 1,
        review: "The food was great here. Would recommend.",
        rating: 5
      },{
        locationId: 5,
        userId: 3,
        review: "The food was so awful here. Would not recommend.",
        rating: 1
      },
      {
        locationId: 5,
        userId: 1,
        review: "The food was great here. Would recommend.",
        rating: 5
      },{
        locationId: 6,
        userId: 2,
        review: "The food was so awful here. Would not recommend.",
        rating: 1
      },
      {
        locationId: 6,
        userId: 3,
        review: "The food was great here. Would recommend.",
        rating: 5
      },{
        locationId: 7,
        userId: 2,
        review: "The food was so awful here. Would not recommend.",
        rating: 1
      },
      {
        locationId: 7,
        userId: 1,
        review: "The food was great here. Would recommend.",
        rating: 5
      },{
        locationId: 8,
        userId: 2,
        review: "The food was so awful here. Would not recommend.",
        rating: 1
      },
      {
        locationId: 8,
        userId: 3,
        review: "The food was great here. Would recommend.",
        rating: 5
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
