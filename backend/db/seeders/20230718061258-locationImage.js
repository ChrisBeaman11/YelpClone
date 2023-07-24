'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
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
   options.tableName = "LocationImages";
   return queryInterface.bulkInsert(
    options,
    [
      {
        locationId: 1,
        url: "https://hips.hearstapps.com/hmg-prod/images/starbucks-holiday-6-1667400564.jpg?crop=0.923xw:1.00xh;0.0391xw,0&resize=1200:*",
        preview: true,
      },
      {
        locationId: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3MgMElBhTe0MYUpWydrbr1ny0hG_nhMrdIw&usqp=CAU",
        preview: true,
      },
      {
        locationId: 3,
        url: "https://i.insider.com/62212e77d72a250019740059?width=700",
        preview: true,
      },
      {
        locationId: 4,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kZhppiGYvRbznm7RQhK8n9tBE2Kg3qBwUg&usqp=CAU",
        preview: true,
      },
      {
        locationId: 5,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxx_oibBE9De9y4pLwqaEZS65pd2d-gKKtEA&usqp=CAU",
        preview: true,
      },
      {
        locationId: 6,
        url: "https://www.tacobell.com/medias/International-Hero.jpg?context=bWFzdGVyfHJvb3R8MjkyNDczfGltYWdlL2pwZWd8aDU5L2hiOC84ODA2NzYwMTIwMzUwLmpwZ3w1NGFkOWMxOTMwZjVkNWRiMmI5Nzk3Mzk1Y2I2NTA1YTA5N2EwNjUyYTlmYjFhNTJlMTJlNDk0YWI5N2Y1NDdm",
        preview: true,
      },
      {
        locationId: 7,
        url: "https://s3-media0.fl.yelpcdn.com/bphoto/PSnm8WczTFCuMqZAeuIoEw/348s.jpg",
        preview: true,
      },
      {
        locationId: 8,
        url: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/popeyes-chicken-anniversary-2x1-bn-220609-f4faf0.jpg",
        preview: true,
      },
    ],
    {}
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "LocationImages";
    return queryInterface.bulkDelete(
      options,
      {
        locationId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] },
      },
      {}
    );
  },
};
