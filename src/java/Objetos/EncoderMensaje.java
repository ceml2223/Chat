/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Objetos;

import java.io.IOException;
import java.io.Writer;
import java.math.BigDecimal;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonWriter;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author Admin
 */
public class EncoderMensaje implements Encoder.TextStream<Mensaje> {

    @Override
    public void encode(Mensaje object, Writer writer) throws EncodeException, IOException {
        JsonObject json = Json.createObjectBuilder()
                .add("nombre", object.getNombre())
                .add("mensaje", object.getMensaje())
                .build();
        try(JsonWriter jsonWriter = Json.createWriter(writer))
        {
            jsonWriter.writeObject(json);
        }
    }

    @Override
    public void init(EndpointConfig config) {
       
    }

    @Override
    public void destroy() {
   
    }
    
}
