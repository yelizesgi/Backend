--# LIMIT: Belirtilen sayida kayit getirme // (pagination)

SELECT *
FROM Customer
LIMIT 0, 10;

SELECT *
FROM Customer
LIMIT 20;

SELECT *
FROM Customer
LIMIT 5, 10;


--# ORDER BY: Siralama islemi yapar. (ASC: Artan, DESC:Azalan) default = ASC

SELECT * 
FROM Invoice
ORDER BY BillingCountry; 

SELECT * 
FROM Invoice
ORDER BY BillingCountry DESC; 


--? Ulke adina gore artan, sehir adina gore azalan siralama;

SELECT * 
FROM Invoice
ORDER BY BillingCountry, BillingCity DESC; 


--? AC/DC grubunun ilk  parçasını listeleme

SELECT *
FROM TRACK 
WHERE Composer = 'AC/DC'
LIMIT 1;

--? AC/DC grubunun SON  parçasını listeleme

SELECT *
FROM TRACK 
WHERE Composer = 'AC/DC'
ORDER BY TrackId DESC
LIMIT 1;


--# Fonksiyonlar: MIN, MAX, AVG, SUM, ROUND, LENGTH, COUNT (Tek değer döndüren fonksiyonlar)(SELECT ile FROM arasina yazilir)

SELECT * FROM Invoice;

--? Toplam fatura miktarını hesaplama
SELECT SUM(Total) AS Total_Inovices FROM Invoice;


--? En düşük, en yüksek ve ortalama fatura miktarlarını getirme
SELECT 
	MIN(Total) minInv,
	ROUND(MAX(Total)) maxInv,
	ROUND(AVG(Total), 2) AvarageInv
FROM Invoice;

--? Fatura adres uzunluklarını listeleme
SELECT LENGTH(BillingAddress)
FROM Invoice;

--? AC/DC grubunun en kisa sürede çalan parçasını listeleme

SELECT *
FROM TRACK 
WHERE Composer = 'AC/DC'
ORDER BY Milliseconds
LIMIT 1;

-- v2

SELECT MIN(Milliseconds), *
FROM Track
WHERE Composer = 'AC/DC';


--# GROUP BY: Verileri gruplama (Genelde gruplar halinde fonksiyon yazmada kullanilir)

SELECT * 
FROM Invoice
GROUP BY BillingCountry;

--? Ulkere gore kesilen ortalama total
SELECT BillingCountry, AVG(Total)
FROM Invoice
GROUP BY BillingCountry;

--? Hangi ulkeye kac adet fatura kesildi
SELECT BillingCountry, COUNT(InvoiceId) 
FROM Invoice
GROUP BY BillingCountry;


--# SUBQUERY: Ic ice sorgular


--? Invoice tablosunda ortalamin ustunde olan faturalari getir. 

--1 
SELECT ROUND(AVG(Total)) FROM Invoice;
-- 2
SELECT * 
FROM Invoice
WHERE Total > 6.0;

-- V2
SELECT * 
FROM Invoice
WHERE Total > (SELECT ROUND(AVG(Total)) FROM Invoice);


--? 'Big Ones' albümünün parçalarını listeleme

-- 1
SELECT AlbumId FROM Album WHERE Title = 'Big Ones';
--2
SELECT * FROM Track WHERE AlbumId= 5;

-- v2
SELECT * FROM Track WHERE AlbumId = (SELECT AlbumId FROM Album WHERE Title = 'Big Ones');

-- ? Mark Philips icin kesilen faturalari liste 
SELECT * 
FROM Invoice 
WHERE CustomerId =(
		SELECT CustomerId 
		FROM Customer 
		WHERE FirstName='Mark' AND LastName = 'Philips');


--# JOINS: Birden fazla tablodaki kayıtları tek bir tabloda getirmek için kullanıyor.

--* INNER JOIN -- Yalnızca kesişen kayıtları getirir.
--* (Alternatif Yazım: JOIN) Default JOIN yöntemi INNER JOIN'dir. (Piyasa kullanımı: INNER JOIN)

SELECT * 
FROM Artist ar
INNER JOIN Album al ON ar.ArtistId = al.ArtistId
ORDER BY ArtistId ASC, AlbumId DESC;






