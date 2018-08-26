CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	ProductName VARCHAR(100) NOT NULL,
	DepartmentName VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) default 0,
	StockQuantity INT default 0,
	PRIMARY KEY(id)
);

INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Stellaris', 'Vidja Gaemes', 9.99, 12);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Surviving Mars', 'Vidja Gaemes', 5.99, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Star Trek Online', 'Vidja Gaemes', 9.99, 10);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Jurrassic World Evolution', 'Vidja Gaemes', 69.99, 33);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Star Craft 2', 'Vidja Gaemes', 69.99, 10);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Star Trek Adventures', 'Books', 10.99, 12);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Star Trek Titan Series', 'Books', 9.99, 40);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Crazy Rich Asians', 'Books', 6.99, 3);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Toad Statue', 'Toys', 4.99, 4);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Lego Set', 'Toys', 7.99, 20);
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) VALUES ('Peas in a Pod', 'Toys', 5.99, 2);

CREATE TABLE departments (
	DepartmentId INT NOT NULL AUTO_INCREMENT,
	DepartmentName VARCHAR(100) NOT NULL,
	OverheadCost DECIMAL(10,2) NOT NULL,
	TotalSales DECIMAL(10,2),
	PRIMARY KEY(DepartmentId)
);

INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Vidja Gaemes', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Books', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Toys', 500);