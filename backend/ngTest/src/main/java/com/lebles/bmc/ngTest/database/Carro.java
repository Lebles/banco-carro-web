package com.lebles.bmc.ngTest.database;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity(name = "carros")
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int valor, anno;
    private String condicion, tipo, marca, modelo, submodelo;
    private LocalDateTime modified;
}

