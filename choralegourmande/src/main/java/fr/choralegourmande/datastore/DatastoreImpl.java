package fr.choralegourmande.datastore;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class DatastoreImpl implements IDatastore {

	@Resource(name="mapConfig")
	private Map<String, String> mapConfig;

	public  String getPath( String id, String extension, String type) {

		String rootPath = FilenameUtils.concat(mapConfig.get("datastore.path"), type);
		return FilenameUtils.concat(rootPath, id + "." + extension);
	}

	@Override
	public byte[] getContent( String id, String extension, String type) throws IOException {

		String path = getPath(id, extension, type);
		File file = new File(path);
		return FileUtils.readFileToByteArray(file);
	}

	@Override
	public void writeContent(byte[] bytes,  String id, String extension, String type) throws IOException {
		String path = getPath(id, extension, type);
		File file = new File(path);
		FileUtils.writeByteArrayToFile(file, bytes);
	}

	@Override
	public void deleteContent(String id, String extension, String type) throws IOException {
		String path = getPath(id, extension, type);
		File file = new File(path);
		FileUtils.forceDelete(file);
	}

}
