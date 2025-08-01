--------------- First SQL Workshop------
/*
SELECT * 
FROM Album
*/

/* 
SELECT 
  AlbumId AS Number, 
  Title AS Baslık, 
  ArtistId AS Art 
FROM Album
*/ -- AS denemesi

/*
SELECT 
DISTINCT Country 
FROM Customer
*/ -- DISTINCT denemesi

------WHERE FILITRELEME-----
/* 
SELECT * 
FROM Customer 
WHERE Country = 'India'
*/

/*
SELECT FirstName, LastName, Company, Address, City
FROM Customer
WHERE SupportRepId != 4
*/

/*
SELECT FirstName, LastName, Address, City
FROM Customer
WHERE CustomerId > 20
*/

-------WHERE * AND / OR / NOT------

/*
SELECT FirstName, LastName, Address, Country, City, State
FROM Customer
WHERE (Country = 'Brazil' OR Country = 'Germany')
AND CustomerId < 20 
*/

---------WHERE IN / NOT IN--------
/* 
SELECT AlbumId ALBNO, Title Konu, ArtistId ARTNO
 FROM Album 
 WHERE AlbumId IN (3,5,7,10,11,13)
 */
 
 ------ORDER BY (ASC = A-Z DİSC = 'Z-A') SIRALAMA--------
/* 
SELECT FirstName, LastName, Address, Country, City, Phone
FROM Customer 
ORDER BY Country, City DESC 
*/  