CREATE TABLE IF NOT EXISTS item (
    id int PRIMARY KEY UNIQUE AUTO_INCREMENT,
    description VARCHAR(200)
);

INSERT INTO item (description) VALUES ('Tarjetas de Crédito');
INSERT INTO item (description) VALUES ('Tarjetas de Débito');
INSERT INTO item (description) VALUES ('Seguro de Vida');
INSERT INTO item (description) VALUES ('Seguro de Medico');
INSERT INTO item (description) VALUES ('Prestamo Personal');
INSERT INTO item (description) VALUES ('Prestamo de Vivienda');
