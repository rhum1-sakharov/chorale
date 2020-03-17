package fr.choralegourmande.misc.images;

import static org.imgscalr.Scalr.resize;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr.Method;

public class ImageEnhancementImpl implements IImageEnhancement {

	//private static final Logger LOG = LoggerFactory.getLogger(ImageEnhancementImpl.class);

	@Override
	public byte[] resizeImg(byte[] bytes, int width, String imgExtension) throws IOException {
		ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		BufferedImage bi = ImageIO.read(bais);
		BufferedImage newImg = resize(bi, Method.ULTRA_QUALITY, width);

		ImageIO.write(newImg, imgExtension, baos);
		
		return baos.toByteArray();

	}

}
