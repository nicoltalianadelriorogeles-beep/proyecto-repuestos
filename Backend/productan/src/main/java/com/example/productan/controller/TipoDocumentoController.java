package com.example.productan.controller;

import com.example.productan.model.TipoDocumentoModel;
import com.example.productan.repository.TipoDocumentoRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipos-documento")
@CrossOrigin(origins = "http://localhost:5173")
public class TipoDocumentoController {

    private final TipoDocumentoRepository tipoDocumentoRepository;

    public TipoDocumentoController(
            TipoDocumentoRepository tipoDocumentoRepository
    ) {
        this.tipoDocumentoRepository = tipoDocumentoRepository;
    }

    // Traer todos los tipos de documento
    @GetMapping
    public ResponseEntity<List<TipoDocumentoModel>> listarTiposDocumento() {

        return ResponseEntity.ok(
                tipoDocumentoRepository.findAll()
        );
    }

    // Traer solamente los tipos de documento activos
    @GetMapping("/activos")
    public ResponseEntity<List<TipoDocumentoModel>> listarTiposActivos() {

        return ResponseEntity.ok(
                tipoDocumentoRepository.findByEstado(1)
        );
    }
}