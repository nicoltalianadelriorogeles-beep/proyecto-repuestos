package com.example.productan.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuarios")
    private Long idUsuarios;

    @Column(name = "contrasena", nullable = false, length = 255)
    private String contrasena;

    @Column(name = "correo", nullable = false, length = 45, unique = true)
    private String correo;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "direccion", nullable = false, length = 45)
    private String direccion;

    @Column(name = "estado", nullable = false)
    private Integer estado;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "ndocumento", nullable = false, length = 20, unique = true)
    private String ndocumento;

    @Column(name = "papellido", nullable = false, length = 25)
    private String papellido;

    @Column(name = "pnombre", nullable = false, length = 25)
    private String pnombre;

    @Column(name = "sapellido", length = 25)
    private String sapellido;

    @Column(name = "snombre", length = 25)
    private String snombre;

    @Column(name = "telefono", nullable = false)
    private Long telefono;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "tipo_documento_id_tdoc", nullable = false)
    private Long tipoDocumentoIdTdoc;


    // Constructor vacío
    public UsuarioModel() {
    }


    // Getters y Setters

    public Long getIdUsuarios() {
        return idUsuarios;
    }

    public void setIdUsuarios(Long idUsuarios) {
        this.idUsuarios = idUsuarios;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getNdocumento() {
        return ndocumento;
    }

    public void setNdocumento(String ndocumento) {
        this.ndocumento = ndocumento;
    }

    public String getPapellido() {
        return papellido;
    }

    public void setPapellido(String papellido) {
        this.papellido = papellido;
    }

    public String getPnombre() {
        return pnombre;
    }

    public void setPnombre(String pnombre) {
        this.pnombre = pnombre;
    }

    public String getSapellido() {
        return sapellido;
    }

    public void setSapellido(String sapellido) {
        this.sapellido = sapellido;
    }

    public String getSnombre() {
        return snombre;
    }

    public void setSnombre(String snombre) {
        this.snombre = snombre;
    }

    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getTipoDocumentoIdTdoc() {
        return tipoDocumentoIdTdoc;
    }

    public void setTipoDocumentoIdTdoc(Long tipoDocumentoIdTdoc) {
        this.tipoDocumentoIdTdoc = tipoDocumentoIdTdoc;
    }
}