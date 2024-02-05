package com.lebles.bmc.ngTest.services;

import com.lebles.bmc.ngTest.database.Carro;
import com.lebles.bmc.ngTest.database.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@Service
public class CarroListService {
    @Autowired
    private final CarroRepository dealer;

    private final Sinks.Many<List<Carro>> stream;

    public CarroListService(CarroRepository repo) {
        dealer = repo;
        stream = Sinks.many().replay().latest();
        stream.tryEmitNext(dealer.findAll());
    }

    public Flux<List<Carro>> getFlux() {
        return stream.asFlux();
    }

    public CarroRepository micro_manage() {
        return dealer;
    }

    public void save(Carro e, String[] imgs) {
        e.setModified(LocalDateTime.now());
        Carro saved = dealer.save(e);
        saveImages(saved.getId(), imgs);
        stream.tryEmitNext(dealer.findAll());
    }

    private void saveImages(final int id, final String[] arr) {
        for(int i = 0; i < arr.length; i++) {
            String encoded_img = arr[i];

            int type = encoded_img.indexOf("image/")+6;
            int type_end = encoded_img.indexOf(';',type);
            String path = ".\\src\\main\\resources\\static\\ss_images\\"+
                    id+"_"+i+"."+encoded_img.substring(type, type_end);
            System.out.println(path);

            encoded_img = encoded_img.substring(encoded_img.indexOf(",") + 1);

            byte[] decodedBytes = Base64.getDecoder().decode(encoded_img);

            var file = Path.of(path);
            try {
                Files.write(file, decodedBytes);
            } catch (IOException e) {
                System.out.println("error at element: "+id+'_'+i);
                e.printStackTrace();
            }
        }
        deleteExtraImages(id, arr.length);
    }

    private void deleteExtraImages(final int id, final int end) {
        var dir = Path.of(".\\src\\main\\resources\\static\\ss_images");
        try (var files = Files.list(dir)) {
            var complete_list =
                    files.filter(path -> path.getFileName().toString().startsWith(id+"_")).toList();

            for (int i = end; i < complete_list.size(); i++) {
                Files.delete(complete_list.get(i));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String[] getImages(final int id) {
        var dir = Path.of(".\\src\\main\\resources\\static\\ss_images");
        try (var files = Files.list(dir)) {
            return files.filter(path -> path.getFileName().toString().startsWith(id+"_"))
                    .map(path -> {
                        try {
                            byte[] byte_stream = Files.readAllBytes(path);
                            String r = Base64.getEncoder().encodeToString(byte_stream);
                            int p = path.toString().lastIndexOf('.');
                            String pp = path.toString().substring(p+1);
                            r = "data:image/"+pp+";base64,"+r;
                            return r;
                        } catch (IOException e) {
                            System.out.println("no se pudo leer ruta: "+path);
                            e.printStackTrace();
                            return "";
                        }
                    })
                    .toArray(String[]::new);
        } catch (IOException e) {
            e.printStackTrace();
            return new String[0];
        }
    }

    public void delete(Integer id) {
        dealer.deleteById(id);
        stream.tryEmitNext(dealer.findAll());
    }
}
