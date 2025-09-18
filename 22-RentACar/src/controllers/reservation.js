"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "List Reservations"
      #swagger.description = `
        You can send query with endpoint for search[], sort[], page and limit.
        <ul> Examples:
            <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
            <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
            <li>URL/?<b>page=2&limit=1</b></li>
        </ul>
      `
    */

    //? eger user admin veya staff degilse sadece kendisine ait olan rezervasyonlari goster

    const isAdminOrStaf = req.user.isAdmin || req.user.isStaff; // Boolean
    let customFilter = { userId: req.user._id };

    // if (isAdminOrStaf) {
    //   customFilter = {}
    // }
    isAdminOrStaf && delete customFilter.userId


    const data = await res.getModelList(Reservation, customFilter);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation, customFilter),
      data,
    });
  },

  create: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Create a Car"
      #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
          $ref: "#/definitions/Reservation"
        }
      }
    */

    //? egerki current user admin veya staff degilse, creatorId; mustrenin id'si olmali.
    const isAdminOrStaf = req.user.isAdmin || req.user.isStaff;
    const currentUserId = req.user._id

    if (!isAdminOrStaf) {
      req.body.userId = currentUserId;
    };

    req.body.creatorId = currentUserId;
    req.body.updatorId = currentUserId;

    //todo amount sectigi aracin gunluk fiyatiyle kiralagi gun sayini carparak hesapla

    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Get Single Reservation"
    */

    //? eger user admin veya staff degilse sadece kendisine ait olan rezervasyonu goster

    const data = await Reservation.findOne({ _id: id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ["Reservations"]
      #swagger.summary = "Update Reservation"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            "username": "test",
            "password": "1234",
            "email": "test@site.com",
            "isActive": true,
            "isStaff": false,
            "isAdmin": false,
        }
      }
    */

    req.body.updatorId = currentUserId;
    const data = await Reservation.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    res.status(202).send({
      error: false,
      data,
    });
  },

  del: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Delete Reservation"
    */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};