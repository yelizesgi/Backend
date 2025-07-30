-- Bu artık bir yorum satırıdır. SingleLine
/*
	Multiline
	Comments
*/
-- SELECT 1 AS One; -- Satır sonu yorum için -- kullanabiliriz.
-- SELECT 1 AS one, /* araya yorum ekleyebilirim. */ 2 AS two;

-- SELECT 1 AS one; -- SQL komutlarını birbirinden ayırmak için ";" kullanırız. Tek bir komut satırı yazacak isek konmayabilir. Konması tavsiyedir.

-- NOT Case-Sensitive (küçük-BÜYÜK harf ayrımı YAPMAZ)
-- SELECT 1 AS one;
-- select 1 as one; -- ! Piyasa standartı olarak uygun değildir.

-- * Piyasa Standartları:
-- * * SQL'in Temel komutları daima BÜYÜK harfle yazılır. -- SELECT * FROM albumName WHERE column=21 AND ...
-- * * String verilerde tek-tırnak veya çift-tırnak kullanabiliriz. Standart olanı tek tırnaktır. -- SELECT 'string-data' AS data
-- * * Her bir temel komut ayrı satıra yazılır.
/*
SELECT *
FROM tableName
WHERE column=1
	AND (column2=1 OR column3=1)
*/

--- --- --- SQL --- --- ---

-- * SELECT -- Seç getir.
-- * FROM -- Hangi tablodan.
-- SELECT * FROM Album; -- * = Tüm Sutunlar.
-- SELECT Title, ArtistId FROM Album; -- İstediğim sutunları getir. -- Tavsiye edilen sutun isimlerini tek-tek yazmaktır. (* kullanmak kaçınmalıyız)

-- * AS -- Lakap Takma -- Tablo ve sutunları geçici adlandırmak için kullanırız.
-- SELECT 'data-123' AS baslik; -- string yazdır.
-- SELECT 1+2*5 AS toplam; -- matematiksel işlem yapabilirim.
-- SELECT AlbumId AS no, Title AS baslik FROM Album; -- Sutun isimlendirme.
-- SELECT AlbumId+100 AS id, Title AS baslik FROM Album;
-- SELECT Album.AlbumId, Album.Title FROM Album;
-- SELECT a.AlbumId, a.Title FROM Album AS a; -- Tablo isimlendirme
-- SELECT a.AlbumId AS Numara, a.Title AS baslik  FROM Album AS a; -- Tablo ve sütun isimlendirme
-- SELECT a.AlbumId Numara, a.Title baslik  FROM Album a; -- AS yazmadan (bir boşluk bırakarak) isimlendirme yapılabilir. (Tercih edilen yöntemdir.)

-- * DISTINCT - Tekrar edilen kayıtlarıın sadece bir defa gelmesini sağlar (benzer kaydı engeller).
-- SELECT DISTINCT City FROM Customer;
-- SELECT DISTINCT Country FROM Customer;
-- SELECT DISTINCT Country, City FROM Customer; --  Bütün sutunlardaki verilerin aynı olduğunu kontrol eder.

-- * WHERE * Filtreleme
-- SELECT * FROM Customer WHERE Country = 'USA'; -- Eşit olanları getir
-- SELECT * FROM Customer WHERE Country != 'USA'; -- Eşit olMAyanları getir (!=) (Tercih edilen yöntem.)
-- SELECT * FROM Customer WHERE Country <> 'USA'; -- Eşit olMAyanları getir (<>)
-- SELECT * FROM Customer WHERE CustomerId > 20; -- Büyük olanları getir.
-- SELECT * FROM Customer WHERE CustomerId >= 20; -- Büyük ve eşit olanları getir.
-- SELECT * FROM Customer WHERE CustomerId < 20; -- Küçük olanları getir.
-- SELECT * FROM Customer WHERE CustomerId <= 20; -- Küçük ve eşit olanları getir.
-- SELECT * FROM Customer WHERE CustomerId BETWEEN 10 AND 20; -- 10 ile 20 arasındaki kayıtları getir. (her ikisi de dahil) 
-- SELECT * FROM Customer WHERE CustomerId BETWEEN '2024-01-01' AND '2024-02-28'; -- (Genelde tarih filtrelemede kullanılır.)

-- * WHERE * AND / OR / NOT
-- SELECT * FROM Customer WHERE NOT Country = 'USA'; -- NOT operatörü genelde True/False (Null/0/'') verilerinde kullanılır. (WHERE isActive = FALSE) = (WHERE NOT isActive)
-- SELECT * FROM Customer WHERE Country = 'USA' AND Company NOT NULL;
-- SELECT * FROM Customer WHERE Country = 'USA' AND NOT Company; -- Alternatif NOT kullanımı.
-- SELECT * FROM Customer WHERE Country = 'USA' OR Country = 'Brazil' OR Country = 'Denmark';
-- SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Brazil' OR Country = 'Denmark') AND CustomerId < 20;
-- SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Brazil' OR Country = 'Denmark') AND CustomerId < 20 AND State = 'SP';

-- * WHERE * IN / NOT IN
-- SELECT * FROM Customer WHERE Country IN ('USA', 'Brazil', 'Denmark');
-- SELECT * FROM Customer WHERE Country NOT IN ('USA', 'Brazil', 'Denmark');
-- SELECT * FROM Customer WHERE CustomerId IN (1,2,4,8,16,32);

-- * WHERE * LIKE (SpecialChars: '%' = JokerChar; '_' = SingleChar) -- Arama yapar.
-- SELECT * FROM Customer WHERE Country LIKE 'USA'; -- 'USA' olanlar.
-- SELECT * FROM Customer WHERE Address LIKE '696%' -- '696' ile başlayanlar.
-- SELECT * FROM Customer WHERE Address LIKE '%langer' -- 'langer' ile bitenler.
-- SELECT * FROM Customer WHERE Address LIKE '%rue%' -- içinde 'rue' geçenler.
-- SELECT * FROM Customer WHERE Phone LIKE '_55_%' -- 2. ve 3. karakteri '5' olanları ve en az 4 karakter olanları getir.
-- SELECT * FROM Customer WHERE Address LIKE '_a_%'; -- 2. karakter 'a' ve en az 3 karakter olanlar.
-- SELECT * FROM Customer WHERE Phone LIKE '+__ 030%'; -- Ülke kodu bilinmeyen 030 ile başlayan telefonlar.
-- SELECT * FROM Customer WHERE Phone LIKE '+__ 030%' AND FirstName = 'Niklas'; -- Niklas isimli 030 ile başlayan numaralı kayıtlar.

-- * ORDER BY - Sıralama (ASC = A'dan Z'ye - DESC = Z'den A'ya)
-- SELECT * FROM Customer ORDER BY CustomerId DESC;
-- SELECT * FROM Customer ORDER BY Country ASC; -- A-Z sırala.
-- SELECT * FROM Customer ORDER BY Country DESC; -- Z-A sırala.
-- SELECT * FROM Customer ORDER BY Country ASC, City ASC, LastName DESC; -- Sırasıyla Ülke - Şehir - Soyisim sıralaması yapar
-- SELECT * FROM Customer ORDER BY Country, City, LastName DESC; -- Default sıralama = ASC (yazılmasa da olur)
-- SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Brazil' OR Country = 'Denmark') AND CustomerId < 20 ORDER BY Country, City, LastName DESC;
/*
-- Piyasa standartı yazımı:
SELECT CustomerId, FirstName, LastName, Company, City, Country
FROM Customer 
WHERE (Country = 'USA'  OR Country = 'Brazil'  OR Country = 'Denmark')
	AND CustomerId < 20 
ORDER BY Country, City, LastName DESC;
*/

-- * LIMIT -- Limitler. Belli syaıda kayıt getirir. (Sayfalamada kullanılır.)
-- SELECT * FROM Customer LIMIT 0, 10; -- LIMIT (kaç adet kayıt atlayacak), (kaç adet kayıt getirilecek.)
-- SELECT * FROM Customer LIMIT 5, 15;
-- SELECT * FROM Customer LIMIT 10; -- Başlangıç default = 0 (Tek bir rakam yazılırsa başlangıcı sıfır kabul eder.) (Tercih edilmeyen yöntemdir.)
-- SELECT * FROM Customer WHERE Country IN ('USA', 'Brazil', 'Denmark') LIMIT 5, 5; -- Filtrelemeden sonra ilk 5 atla, 5 kayıt getir.
-- SELECT * FROM Customer WHERE Country IN ('USA', 'Brazil', 'Denmark') ORDER BY FirstName ASC LIMIT 10, 15;

-- * SUBQUERIES (SELECT IN SELECT) (Nested Query)
-- SELECT * FROM Album WHERE ArtistId = (SELECT ArtistId FROM Artist WHERE Name = 'Led Zeppeli'); -- ArtisId'yi, Artist tablosundan isim sorgulayarak buldu.
-- SELECT alb.AlbumId, alb.Title, (SELECT art.Name FROM Artist AS art WHERE art.ArtistId = alb.ArtistId) AS Artist FROM Album AS alb; -- Albumlerin sanatçı verisini Artist tablosundan çekti.
/*
-- SubSelect sorgusunu tablo gibi kullanmak:
SELECT FirstName, LastName
FROM (
	SELECT * FROM Customer WHERE Country = 'USA' AND CustomerId > 20
) WHERE FirstName LIKE '%a%'
*/

-- -- -- -- -- -- -- -- JOINS -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- Birden fazla tablodan aynı anda veri çekmek için kullanılır.

-- * INNER JOIN -- Yalnızca KESİŞEN kayıtları getirir.
-- * (Alternatif yazım yöntemi olarak sadece JOIN yazılabilir. (Default JOIN yöntemidir.) (Piyasada Kullanımı: INNER JOIN)
/*
SELECT *
FROM Artist AS art
JOIN Album AS alb ON alb.ArtistId = art.ArtistId -- 'JOIN' == 'INNER JOIN'
ORDER BY alb.ArtistId, alb.AlbumId
*/
/*
SELECT c.FirstName, c.LastName, c.Country, i.InvoiceId, i.InvoiceDate, i.Total AS InvoiceTotal
FROM Customer AS c
INNER JOIN Invoice AS i ON i.CustomerId = c.CustomerId
ORDER BY c.CustomerId
*/
/*
SELECT t.Name Sarki, a.Title Album, m.Name Dosya, g.Name Tur
FROM Track t
INNER JOIN Album a ON a.AlbumId=t.AlbumId -- Eşittirin önünde veya arkasında olması önemsizdir.
INNER JOIN MediaType m ON t.MediaTypeId=m.MediaTypeId
INNER JOIN Genre g ON g.GenreID=t.GenreId
*/

-- * LEFT JOIN -- Üstteki (FROM) tablodaki bütün kayıtları getir ve JOIN tablosundaki KESİŞEN kayıtları getir.
/*
SELECT *
FROM Artist AS art
LEFT JOIN Album AS alb ON alb.ArtistId=art.ArtistId -- Eğer bir karşılığı yoksa NULL yazar.
ORDER BY ArtistId ASC, AlbumId ASC
*/

-- * RIGHT JOIN -- Üst (FROM) tablodaki KESİŞEN kayıtlar ve JOIN tablodaki BÜTÜN kayıtları getir.
/*
SELECT *
FROM Artist AS art
RIGHT JOIN Album AS alb ON alb.ArtistId=art.ArtistId
ORDER BY ArtistId ASC, AlbumId ASC
*/

-- * FULL OUTER JOIN -- Her iki tablonun BÜTÜN kayıtlarını göster, Eşleşenleri yanyana göster.
/*
SELECT *
FROM Artist AS art
FULL OUTER JOIN Album AS alb ON alb.ArtistId=art.ArtistId
ORDER BY ArtistId ASC, AlbumId ASC
*/

-- * CROSS JOIN -- Her iki tablonun BÜTÜN kayıtlarını göster, İlişki gözetme. (Kullanılmaz)
/*
SELECT *
FROM Artist AS art
CROSS JOIN Album AS alb
ORDER BY ArtistId ASC, AlbumId ASC
*/
/*
-- Genel/Kısa Kullanım:
SELECT *
FROM Artist AS art, Album AS alb
ORDER BY ArtistId ASC, AlbumId ASC
*/
-- * JOIN ÖRNEKLER
/*
-- Hangi sanatçı hangi albümleri çıkarmıştır. Bir albüme sahip olmayan sanatçıları gösterme. Sadece albüm sahibi olan sanatçıları göster.
SELECT t1.ArtistId, t1.Name AS sanatci, t2.Title AS album
FROM Artist AS t1
INNER JOIN Album AS t2 ON t1.ArtistId=t2.ArtistId
-- WHERE t1.Name = 'Led Zeppeli'
ORDER BY t1.ArtistId
/*
-- Bütün sanatçıları göster. Hangi sanatçı hangi albüme sahip onu da göster. Ama albüm sahibi olmayan kayıtlara NULL yaz.
SELECT t1.ArtistId, t1.Name AS sanatci, t2.Title AS album
FROM Artist AS t1
LEFT JOIN Album AS t2 ON t2.ArtistId=t1.ArtistId
ORDER BY t1.ArtistId
*/