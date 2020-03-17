package fr.choralegourmande.datastore;

import java.io.IOException;

public interface IDatastore {

    String TYPE_FEEDS = "feeds";
    String TYPE_SONGS = "songs";
    String TYPE_BG ="background";
    String TYPE_AUDIO ="audio";

     byte[] getContent(String id, String extension, String type) throws IOException;

     void deleteContent(String id, String extension, String type) throws IOException;

     void writeContent(byte[] bytes, String id, String extension, String type) throws IOException;

     String getPath(String id, String extension, String type);


}
