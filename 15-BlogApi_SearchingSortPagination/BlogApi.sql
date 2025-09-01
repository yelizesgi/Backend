CREATE TABLE "blogCategories"(
    "_id" VARCHAR(13) NOT NULL,
    "name" VARCHAR(20) NOT NULL
);
ALTER TABLE
    "blogCategories" ADD PRIMARY KEY("_id");

CREATE TABLE "blogPosts"(
    "id" BIGINT NOT NULL,
    "categoryId" VARCHAR(13) NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "blogPosts" ADD PRIMARY KEY("id");
    
ALTER TABLE
    "blogPosts" ADD CONSTRAINT "blogposts_categoryid_foreign" FOREIGN KEY("categoryId") REFERENCES "blogCategories"("_id");