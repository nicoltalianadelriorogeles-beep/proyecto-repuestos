package com.example.productan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_documento")
public class TipoDocumentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tdoc")
    private Long idTdoc;

    @Column(name = "desc_tdoc", nullable = false, length = 45)
    private String descTdoc;

    @Column(name = "estado", nullable = false)
    private Integer estado;

    @Column(name = "sigla", nullable = false, length = 10)
    private String sigla;

    // Constructor vacío
    public TipoDocumentoModel() {
    }

    // Getters y Setters

    public Long getIdTdoc() {
        return idTdoc;
    }

    public void setIdTdoc(Long idTdoc) {
        this.idTdoc = idTdoc;
    }

    public String getDescTdoc() {
        return descTdoc;
    }

    public void setDescTdoc(String descTdoc) {
        this.descTdoc = descTdoc;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }
}