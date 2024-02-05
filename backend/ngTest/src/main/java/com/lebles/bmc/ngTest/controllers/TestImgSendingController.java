package com.lebles.bmc.ngTest.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class TestImgSendingController {

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/test/mock-padron")
    public Map<String, String> getMock() throws IOException {
        var r = new HashMap<String, String>(8);

        // getting image
        Resource resource = new ClassPathResource("/static/test_img.jpg");
        BufferedImage image = ImageIO.read(resource.getInputStream());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", baos);
        byte[] imageBytes = baos.toByteArray();
        String b64 = Base64.getEncoder().encodeToString(imageBytes);

        // wraping up
        r.put("response", "true");
        r.put("foto", b64);
        r.put("nombre", "Miss Liberty");
        r.put("apellido", "America");

        return r;
    }
}
