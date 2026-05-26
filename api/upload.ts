import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type UploadRequest = {
  method?: string
  body?: {
    filename?: string
    fileType?: string
  }
}

type UploadResponse = {
  status: (code: number) => UploadResponse
  json: (body: unknown) => void
}

export default async function handler(req: UploadRequest, res: UploadResponse) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { filename, fileType } = req.body ?? {};

    if (!filename || !fileType) {
      return res.status(400).json({ message: 'Falta filename o fileType' });
    }

    // Inicializamos el cliente de S3 con las variables de entorno secretas
    const s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // Creamos un nombre único para la imagen para que no haya colisiones
    const uniqueKey = `products/${Date.now()}-${filename.replace(/\s+/g, '-')}`;

    // Preparamos el comando de subida
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: uniqueKey,
      ContentType: fileType,
    });

    // Pedimos a AWS S3 una URL firmada (válida por 60 segundos)
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    
    // Esta será la URL pública final de la imagen una vez que se haya subido
    const finalUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

    // Devolvemos ambos datos al cliente React
    res.status(200).json({ presignedUrl, finalUrl });
  } catch (error) {
    console.error('Error generando URL firmada:', error);
    res.status(500).json({ message: 'Error interno generando presigned URL' });
  }
}