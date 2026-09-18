package com.example.productan.service;

import com.example.productan.dto.UsuarioDTO;
import com.example.productan.model.UsuarioModel;
import com.example.productan.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioModel> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public UsuarioModel obtenerUsuario(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado con ID: " + id)
                );
    }

    public UsuarioModel crearUsuario(UsuarioDTO dto) {

        UsuarioModel usuario = new UsuarioModel();

        usuario.setContrasena(dto.getContrasena());
        usuario.setCorreo(dto.getCorreo());
        usuario.setDireccion(dto.getDireccion());
        usuario.setEstado(dto.getEstado());
        usuario.setImagen(dto.getImagen());
        usuario.setNdocumento(dto.getNdocumento());
        usuario.setPapellido(dto.getPapellido());
        usuario.setPnombre(dto.getPnombre());
        usuario.setSapellido(dto.getSapellido());
        usuario.setSnombre(dto.getSnombre());
        usuario.setTelefono(dto.getTelefono());
        usuario.setTipoDocumentoIdTdoc(dto.getTipoDocumentoIdTdoc());

        // Campos obligatorios de la tabla
        usuario.setCreatedAt(LocalDateTime.now());
        usuario.setUpdatedAt(LocalDateTime.now());

        System.out.println("========== ANTES DEL SAVE ==========");
        System.out.println("Correo: " + usuario.getCorreo());
        System.out.println("Documento: " + usuario.getNdocumento());

        UsuarioModel resultado = usuarioRepository.saveAndFlush(usuario);

        System.out.println("========== DESPUÉS DEL SAVE ==========");
        System.out.println("ID GENERADO: " + resultado.getIdUsuarios());

        return resultado;
    }

    public UsuarioModel actualizarUsuario(Long id, UsuarioDTO dto) {

        UsuarioModel usuario = obtenerUsuario(id);

        usuario.setContrasena(dto.getContrasena());
        usuario.setCorreo(dto.getCorreo());
        usuario.setDireccion(dto.getDireccion());
        usuario.setEstado(dto.getEstado());
        usuario.setImagen(dto.getImagen());
        usuario.setNdocumento(dto.getNdocumento());
        usuario.setPapellido(dto.getPapellido());
        usuario.setPnombre(dto.getPnombre());
        usuario.setSapellido(dto.getSapellido());
        usuario.setSnombre(dto.getSnombre());
        usuario.setTelefono(dto.getTelefono());
        usuario.setTipoDocumentoIdTdoc(dto.getTipoDocumentoIdTdoc());

        usuario.setUpdatedAt(LocalDateTime.now());

        return usuarioRepository.saveAndFlush(usuario);
    }

    public void eliminarUsuario(Long id) {
        UsuarioModel usuario = obtenerUsuario(id);
        usuarioRepository.delete(usuario);
    }
}