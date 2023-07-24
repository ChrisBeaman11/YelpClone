'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Locations';
    return queryInterface.bulkInsert(options, [
      {
        name: "Starbucks",
        ownerId: 1,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "The best coffee in the world."
      },
      {
        name: "Wendys",
        ownerId: 3,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "We have the best chicken sandwhiches."
      },
      {
        name: "McDonalds",
        ownerId: 2,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "McDonalds is the number one fast food chain in the world."
      },
      {
        name: "Pizza Hut",
        ownerId: 3,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "We have great pizza for you."
      },
      {
        name: "Arbys",
        ownerId: 2,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "Arbys is well known for having the meat."
      },
      {
        name: "Taco Bell",
        ownerId: 1,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "We have the best fast food Mexican restaurant."
      },
      {
        name: "Dairy Queen",
        ownerId: 3,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "Dairy queen has the best ice cream selection."
      },
      {
        name: "Popeyes",
        ownerId: 1,
        city: 'Albany',
        state: 'New York',
        country: "United States",
        description: "A great restaurant"
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName ='Locations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
