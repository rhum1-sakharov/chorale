package fr.choralegourmande.misc.images;

import java.io.IOException;

public interface IImageEnhancement {

	public byte[] resizeImg(byte[] bytes, int width, String imgExtension) throws IOException;
}
