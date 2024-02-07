--alter table carros alter column modified datetime default getdate();

--ALTER TABLE carros ADD CONSTRAINT DF_carros_modified DEFAULT GETDATE() FOR modified;

/*UPDATE carros
SET anno = CASE
    WHEN id > 2 THEN ABS(CHECKSUM(NEWID())) % 2007 + 1  -- Replace with a random number between 1 and 10000
    ELSE anno
END;*/

--update carros set modified = DATEADD(DAY, ABS(CHECKSUM(NEWID())) % 365 + 1 , '2022-01-01');
/*update carros set modified = case 
	when 0 = 0 then DATEADD(DAY, round(rand() * 365, 0), '2022-01-01')
	else null
end;*/

/*create table carros (
	id int identity(1,1) primary key,
	valor int,
	marca varchar(32),
	modelo varchar(32),
	submodelo varchar(32),
	tipo varchar(32),
	anno int,
	modified datetime default getdate()
);*/

select * from carros;

/*INSERT INTO carros (valor, marca, modelo, submodelo, tipo, anno) VALUES
(250000, 'Toyota', 'Camry', 'LE', 'Sedan', 2020),
(300000, 'Honda', 'Accord', 'EX', 'Sedan', 2021),
(350000, 'Ford', 'Mustang', 'GT', 'Coupe', 2019),
(400000, 'Chevrolet', 'Malibu', 'Premier', 'Sedan', 2022),
(280000, 'Nissan', 'Altima', 'SV', 'Sedan', 2020),
(320000, 'Hyundai', 'Sonata', 'Limited', 'Sedan', 2021),
(270000, 'Kia', 'Optima', 'SX', 'Sedan', 2019),
(380000, 'BMW', '3 Series', '330i', 'Sedan', 2022),
(420000, 'Mercedes-Benz', 'C-Class', 'C300', 'Sedan', 2021),
(350000, 'Audi', 'A4', 'Premium Plus', 'Sedan', 2020),
(330000, 'Lexus', 'ES', '350', 'Sedan', 2022),
(290000, 'Mazda', 'Mazda6', 'Grand Touring', 'Sedan', 2019),
(450000, 'Tesla', 'Model 3', 'Long Range', 'Electric', 2021),
(480000, 'Porsche', '911', 'Carrera', 'Convertible', 2020),
(400000, 'Jaguar', 'XF', 'S', 'Sedan', 2022),
(320000, 'Subaru', 'Legacy', 'Sport', 'Sedan', 2019),
(350000, 'Volkswagen', 'Passat', 'R-Line', 'Sedan', 2021),
(300000, 'Chrysler', '300', 'Limited', 'Sedan', 2020),
(420000, 'Genesis', 'G80', '3.8', 'Sedan', 2022),
(380000, 'Infiniti', 'Q50', 'Red Sport 400', 'Sedan', 2021);*/
