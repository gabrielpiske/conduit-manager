CREATE SCHEMA eletroduto;
USE eletroduto;

CREATE TABLE cabo(
	id int auto_increment primary key,
    nome varchar(100) not null,
    tipo varchar(100) not null,
    comprimento int not null,
    quantidade_estoque int,
    bitola decimal not null,
    tensao_nominal decimal not null
);

CREATE TABLE eletroduto(
	id int auto_increment primary key,
    nome varchar(100) not null,
    material varchar(100) not null,
    diametro decimal not null
);
