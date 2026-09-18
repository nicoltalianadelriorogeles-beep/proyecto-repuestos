package com.example.productan.controller;

import com.example.productan.dto.UsuarioDTO;
import com.example.productan.model.UsuarioModel;
import com.example.productan.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ==========================================
    // OBTENER TODOS LOS USUARIOS
    // GET /usuarios
    // ==========================================
    @GetMapping
    public ResponseEntity<List<UsuarioModel>> listarUsuarios() {

        List<UsuarioModel> usuarios =
                usuarioService.listarUsuarios();

        return ResponseEntity.ok(usuarios);
    }


    // ==========================================
    // OBTENER USUARIO POR ID
    // GET /usuarios/{id}
    // ==========================================
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioModel> obtenerUsuario(
            @PathVariable Long id) {

        UsuarioModel usuario =
                usuarioService.obtenerUsuario(id);

        return ResponseEntity.ok(usuario);
    }


    // ==========================================
    // CREAR USUARIO
    // POST /usuarios
    // ==========================================
    @PostMapping
    public ResponseEntity<UsuarioModel> crearUsuario(
            @RequestBody UsuarioDTO dto) {

        System.out.println("=================================");
        System.out.println("POST /usuarios RECIBIDO");
        System.out.println("Correo: " + dto.getCorreo());
        System.out.println("Nombre: " + dto.getPnombre());
        System.out.println("Documento: " + dto.getNdocumento());
        System.out.println("Tipo documento: " + dto.getTipoDocumentoIdTdoc());
        System.out.println("=================================");

        UsuarioModel usuarioCreado = usuarioService.crearUsuario(dto);

        System.out.println("========== USUARIO CREADO ==========");
        System.out.println("ID: " + usuarioCreado.getIdUsuarios());

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCreado);
    }


    // ==========================================
    // ACTUALIZAR USUARIO
    // PUT /usuarios/{id}
    // ==========================================
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioModel> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody UsuarioDTO dto) {

        UsuarioModel usuarioActualizado =
                usuarioService.actualizarUsuario(id, dto);

        return ResponseEntity.ok(usuarioActualizado);
    }


    // ==========================================
    // ELIMINAR USUARIO
    // DELETE /usuarios/{id}
    // ==========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(
            @PathVariable Long id) {

        usuarioService.eliminarUsuario(id);

        return ResponseEntity.noContent().build();
    }
}