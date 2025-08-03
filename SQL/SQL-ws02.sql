-- -- -- -- -- -- -- -- JOINS -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

--?Her bir sanatçı ve ona ait albümleri listeleme (LEFT JOIN)
SELECT art.ArtistId, art.Name, alb.Title, alb.AlbumId 
FROM Artist art 
LEFT JOIN  Album alb ON alb.ArtistId = art.ArtistId; 
ORDER BY ArtistId, AlbumId DESC;

--? Albüm bilgileri ile sanatçı bilgilerini birleştirme (RIGHT JOIN)

SELECT art.ArtistId, art.Name, alb.Title, alb.AlbumId 
FROM Artist art 
RIGHT JOIN  Album alb ON alb.ArtistId = art.ArtistId; 
ORDER BY ArtistId, AlbumId DESC;


--? Müşteri bilgileri ile fatura bilgilerini birleştirme (INNER JOIN)

SELECT c.CustomerId, c.FirstName, c. LastName, c. Country, i.InvoiceDate, i.InvoiceId, i.total İnvoiceTotal
FROM Customer c
INNER JOIN Invoice i ON c.CustomerId = i.CustomerId;
ORDER BY c.CustomerId; 

--? Group by exmaple

SELECT c.CustomerId, c.FirstName, c. LastName, c. Country, i.InvoiceDate, i.InvoiceId, SUM(i.total) İnvoiceTotal
FROM Customer c
INNER JOIN Invoice i ON c.CustomerId = i.CustomerId;
GROUP BY c.CustomerId
ORDER BY c.CustomerId; 

--? Albüm ve sanatçı bilgilerini birleştirme (FULL OUTER JOIN)

SELECT *
FROM Customer c
FULL OUTER JOIN Invoice i ON c.CustomerId = i.CustomerId; 


---EXERCISE 1: Sanatçı adı ve albüm sayısını getirme (LEFT JOIN)

SELECT art.Name, COUNT(alb.AlbumId) AlbumTotal
FROM Album alb 
LEFT JOIN Artist art  ON alb.ArtistId = art.ArtistId
GROUP BY alb.ArtistId
ORDER BY AlbumTotal;

---v2
SELECT b.Name, COUNT(a.AlbumId)
FROM Album AS a
LEFT JOIN Artist as b ON a.ArtistId=b.ArtistId
GROUP BY a.ArtistId;

---! EXERCISE 2: En çok albümü olan ilk 5 sanatçıyı listeleyin

SELECT art.Name, COUNT(alb.AlbumId) AlbumTotal
FROM Album alb 
LEFT JOIN Artist art ON alb.ArtistId = art.ArtistId
GROUP BY alb.ArtistId
ORDER BY AlbumTotal DESC
LIMIT 5;

--! EXERCISE 3:Hiç albümü olmayan sanatçıları bulun

SELECT
  art.Name AS ArtistName
FROM
  Artist AS art
LEFT JOIN
  Album AS alb
ON
  art.ArtistId = alb.ArtistId
WHERE
  alb.AlbumId IS NULL;


 ---?   /* INSERT & UPDATE & DELETE */

 -- **Yeni bir müzik türü (Genre) ekle**
 SELECT * 
 FROM Genre;
 
 INSERT INTO Genre(GenreId, Name) VALUES (26, 'Halk Muzigi');
 INSERT INTO Genre VALUES (27, 'Pop Muzik');



 -- **Türk Pop Müziği olarak bir müzik türünün adını güncelle**

UPDATE Genre
SET Name = 'Turk Pop Muzigi'
WHERE GenreId = 27;

 -- **Genre tablosundan belirli bir kaydı sil**

DELETE FROM Genre
WHERE GenreId = 26;

 -- Tablodaki tum datayi siler.
 
 DELETE FROM Genre;