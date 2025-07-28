-- single comment

/*
multiline comment
*/

-- SELECT 1 AS one -- block comment
-- SELECT 1 AS one; -- block comment
-- SELECT 1 AS one, /* comment in the middle */ AS two -- block comment

-- NOT Case Sensitive (Case-Insensitive)
-- select 1 AS one; -- Piyasa standartlarina uygun degildir.
-- SELECT 1 AS one; -- Uygun olan.


-- * Piyasa Standartları:
-- * * SQL Temel komutları BÜYÜK harfle yazılır. SELECT * FROM Album WHERE AlbumID=1;
-- * * String verilerde tek-çift tırnak kullanabilirsiniz. Standart olan tek tırnaktır.  SELECT 'string' AS yazi;
-- * * Her bir temel komut yeni bir satıra yazılır:

-- SELECT *
-- FROM Album
-- WHERE AlbumId=1;


------------------- SQL --------------------

-- * SELECT -- SEC GETIR
-- * FROM -- HANGI TABLODAN ?

-- SELECT * FROM Album; 
-- SELECT Title FROM Album; 
-- SELECT AlbumId, Title FROM Album; 

-- * AS -- Tablo veya sutunlari geciic adlandirmak icin kullanir. (lakap takma)
-- SELECT AlbumId AS numara, Title AS baslik FROM Album; -- Sutunlari isimlendirme
-- SELECT Album.AlbumId, Album.Title FROM Album;  -- Sutunlari referans gosterme
-- SELECT a.AlbumId, a.Title FROM Album AS a; -- Tablo isimlendirme

-- * DISTINCT - Tekrar edilen kayıtarın tekrar edilmesini engeller (tek kayıt olarak getirir)
-- SELECT * FROM Invoice;
-- SELECT DISTINCT BillingCity, * FROM Invoice;

-- * WHERE - Filtreleme
SELECT * FROM Customer WHERE Country = 'USA'; -- Esit olanlari getir
SELECT * FROM Customer WHERE Country != 'USA'; -- Esit olmayanlari getir
SELECT * FROM Customer WHERE Country <> 'USA'; -- Esit olmayanlari getir
SELECT * FROM Customer WHERE CustomerId > 20; -- Buyuk olanlari getir
SELECT * FROM Customer WHERE CustomerId < 20; -- Kucuk olanlari getir
SELECT * FROM Customer WHERE CustomerId >= 20; -- Buyuk Esit olanlari getir
SELECT * FROM Customer WHERE CustomerId <= 20; -- Kucuk Esit olanlari getir

-- * WHERE - AND/OR/NOT
SELECT * From Customer WHERE NOT Country = 'USA'; 
SELECT * From Customer WHERE Country = 'USA' AND Company NOT NULL;
SELECT * From Customer WHERE Country = 'USA' OR Country = 'Brazil';

-- * WHERE - IN / NOT IN
SELECT * FROM Customer WHERE Country IN( 'USA', 'Brazil', 'Denmark');
SELECT * FROM Customer WHERE Country NOT IN( 'USA', 'Brazil', 'Denmark');


-- * WHERE - LIKE (SpecialChars: % = JokerChar, _ = SingleChar)
SELECT * FROM Customer WHERE Country LIKE 'USA';
SELECT * FROM Customer WHERE Address LIKE '627 Broadway';
SELECT * FROM Customer WHERE Address LIKE '627%'; -- 627 ile baslayanlari getir.
SELECT * FROM Customer WHERE Address LIKE '%Broadway'; -- Broadway ile biteni getir.
SELECT * FROM Customer WHERE Address LIKE '%Salem%'; -- Ortasinda Salem olani getir.
SELECT * FROM Customer WHERE Phone LIKE '_55 %'; -- 2. ve 3. karakteri 55 olan kayıtlar.
SELECT * FROM Customer WHERE Address LIKE '_a_%'; -- 2. karakteri "a" olan ve en az 3 karakter olan.
SELECT * FROM Customer WHERE Phone LIKE '+__ 030%'; -- Ülke kodu bilinmeyen 030 ile başlaya telefonlar.
SELECT * FROM Customer WHERE Phone LIKE '+__ 030%' AND FirstName = 'Niklas'; -- Niklas isimli 030 ile başlayan numaralı kayıtlar.