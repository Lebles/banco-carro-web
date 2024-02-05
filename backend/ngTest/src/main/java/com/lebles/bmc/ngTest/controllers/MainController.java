package com.lebles.bmc.ngTest.controllers;

import com.fasterxml.jackson.core.JsonFactoryBuilder;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lebles.bmc.ngTest.database.Carro;
import com.lebles.bmc.ngTest.services.CarroListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/main/")
public class MainController {
    @Autowired
    private CarroListService dealer;

    @GetMapping(value = "carro/lista-continua", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<List<Carro>>> getListaFlux() {
        return dealer.getFlux()
        .map(entryList -> ServerSentEvent.<List<Carro>>builder()
                .event("update")
                .data(entryList)
                .build());
    }

    @GetMapping("carro/lista")
    public List<Carro> getLista() {
        return dealer.micro_manage().findAll().stream().sorted((e1, e2) -> {
            return e1.getModified().compareTo(e2.getModified());
        }).toList();
    }

    @GetMapping("carro/{id}")
    public Map<String, ?> getCarro(@ModelAttribute("id") Integer id) {
        var e = dealer.micro_manage().findById(id).get();
        var imgs = dealer.getImages(id);
        return Map.of("carro", e, "images", imgs);
    }

    @PostMapping("carro/save")
    public ResponseEntity<?> saveCarro(@RequestBody JsonNode raw) {
        var mapper = new ObjectMapper(); mapper.registerModule(new JavaTimeModule());
        Carro e = null; String[] imgs = null;
        try {
            e = mapper.treeToValue(raw.get("formData"), Carro.class);
            imgs = mapper.treeToValue(raw.get("images"), String[].class);
        } catch (JsonProcessingException ex) {
            throw new RuntimeException(ex);
        }

        try {
            dealer.save(e, imgs);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ResponseEntity.ok("Todo bien");
    }

    @DeleteMapping("carro/{id}/delete")
    public ResponseEntity<?> deleteCarro(@ModelAttribute("id") Integer id) {
        try {
            dealer.delete(id);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.internalServerError().eTag(ex.getMessage()).build();
        }
        return ResponseEntity.ok("Todo bien");
    }
}
