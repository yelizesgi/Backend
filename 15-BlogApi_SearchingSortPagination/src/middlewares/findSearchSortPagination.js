"use strict";

const { BlogPost } = require("../models/blogModel");

/* -------------------------------------------------------
     EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

module.exports = async (req, res, next) => {

    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    // Filter: kesin esitlik arar 
    // Search: kismi esitlik arar

    // nested query
    // filter[published]=false
    // sort[createdAt]=desc
    // search[title]=test
    // console.log(req.query);


    //* FILTERING
    // URL?filter[fieldName1]=value1&filter[fiedlName2]=value2
    const filter = req.query?.filter || {}

    //* SEARCHING
    // URL?search[fieldName1]=value1&search[fiedlName2]=value2

    // mongodb search
    // { <field>: { $regex: /pattern/, $options: '<options>' } }
    // { "<field>": { "$regex": "pattern", "$options": "<options>" } }
    // { "content": { "$regex": " 1 content", "$options": $options: 'i' } }
    // { <field>: { $regex: /pattern/<options> } }

    const search = req.query?.search || {}

    // console.log(search.content);
    // search.content = '2 content'
    // search['content'] = '3 content'
    // console.log(search['content']);

    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }


    //* SORTING
    // URL?sort[fieldName1]=value1&sort[fiedlName2]=value2

    const sort = req.query?.sort || {};

    // pg 1 = 20 data -> skip=0, limit= 20
    // pg 2 = 20 data -> skip=20, limit= 20
    // pg 3 = 20 data -> skip=40, limit= 20
    // 200 / limit & skip => 2. sf => (page - 1 ) * limit = skip

    // limit = 10 skip=10 -> 2. sayfayi
    //* PAGINATIONS:

    // PAGE
    // URL?page=2
    let page = parseInt(req.query?.page);
    page = page > 0 ? page : 1

    // LIMIT
    // URL?limit=20
    let limit = parseInt(req.query?.limit);
    limit = limit > 0 ? limit : 20

    // SKIP
    // URL?skip=10
    let skip = parseInt(req.query?.skip);
    skip = skip > 0 ? skip : (page - 1) * limit;


    // GetModelList
    res.getModelList = async (Model, populate = null) => {
        return await Model.find({ ...search, ...filter }).sort(sort).skip(skip).limit(limit).populate(populate);
    }

    // GetModelListDetatils
    res.getModelListDetails = async (Model) => {
        const count = await Model.countDocuments({ ...search, ...filter });

        return {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            totalRecords: count,
            pages: count <= limit ? false : {
                previos: (page > 1 ? page - 1 : false),
                current: page,
                next: page < Math.ceil(count / limit) ? page + 1 : false,
                total: Math.ceil(count / limit)
            }
        }
    }

    next();
}