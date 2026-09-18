package com.example.productan.repository;

import com.example.productan.model.TipoDocumentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipoDocumentoRepository extends JpaRepository<TipoDocumentoModel, Long> {

    List<TipoDocumentoModel> findByEstado(Integer estado);
}