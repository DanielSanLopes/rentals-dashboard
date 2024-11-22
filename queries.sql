create database rentals
default character set utf8mb4
default collate utf8mb4_general_ci;

use rentals;

create table tenants(
	id int unsigned auto_increment unique,
    nome varchar(100) not null,
    cpf varchar(11) not null,
    tamanhoKitnet enum ('p','m','g') not null,
    inadimplente boolean default false,
    mesesDeInadimplencia int unsigned default 0,
    valorAluguel decimal (7,2) unsigned not null,
    
    primary key(id)    
)default charset = utf8mb4;

alter user 'root'@'localhost' identified with mysql_native_password by '';

insert into tenants values
(default, "Daniel", "01234567891", 'p', true, 1, 400.00),
(default, "Paulo", "12333367891", 'm', false, 0, 700.00),
(default, "Paula", "01233367891", 'g', true, 4, 200.00),
(default, "Daniela", "01523455591", 'm', false, 0, 500.00);

select * from tenants;

DELETE FROM tenants  WHERE `id`= 9;