drop database if exists menu;

create database menu default character set 'utf8';

use menu;


set foreign_key_checks= 0;

DROP table if exists pizzas;
CREATE TABLE pizzas(
id smallint auto_increment,
nom varchar(30) not null,
base varchar(30) not null,
primary key(id)
)engine=innodb 
default charset=utf8 collate=utf8_unicode_ci;

DROP table if exists ingredients;
CREATE TABLE ingredients(
id smallint auto_increment,
nom varchar(30) not null,
prix decimal(5,2) not null,
primary key(id)
)engine=innodb 
default charset=utf8 collate=utf8_unicode_ci;

DROP table if exists recettes;
CREATE TABLE recettes(
id_pizza smallint not null,
id_ingredient smallint not null,
primary key(id_pizza, id_ingredient),
constraint recettes_to_pizza
	foreign key (id_pizza)
    references pizzas(id),
constraint recettes_to_ingredient
	foreign key (id_ingredient)
    references ingredients(id)
)engine=innodb 
default charset=utf8 collate=utf8_unicode_ci;

INSERT INTO pizzas (nom, base) VALUES 
('Pepperoni', 'tomate'),
('Lac leman', 'crème fraiche'),
('Quatre fromage', 'tomate'),
('Chèvre miel', 'crème fraiche');

INSERT INTO ingredients (nom, prix)
VALUES 
('poivrons', 2),
('lardons', 3),
('oignons', 4),
('chèvre', 10),
('miel', 6),
('olives', 8),
('bleu', 20);

INSERT INTO recettes (id_pizza, id_ingredient)
VALUES 
(1,1), (1,2), (1,6),
(2,2), (2,3), (2,4), (2,5),
(3,3), (3,4), (3,7),
(4,3), (4,4), (4,5);

set foreign_key_checks= 1;
 


