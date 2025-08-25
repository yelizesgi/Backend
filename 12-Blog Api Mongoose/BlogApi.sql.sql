CREATE TABLE "blogCategories"(
    "_id" VARCHAR(13) NOT NULL,
    "name" VARCHAR(20) NOT NULL
);
ALTER TABLE
    "blogCategories" ADD PRIMARY KEY("_id");
CREATE TABLE "blogPosts"(
    "id" BIGINT NOT NULL,
    "cotegoryId" VARCHAR(13) NULL,
    "title" VARCHAR(20) NOT NULL,
    "text" TEXT NOT NULL,
    "creadetAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "blogPosts" ADD PRIMARY KEY("id");
ALTER TABLE
    "blogPosts" ADD CONSTRAINT "blogposts_cotegoryid_foreign" FOREIGN KEY("cotegoryId") REFERENCES "blogCategories"("_id");