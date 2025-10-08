import { Directory, File, Paths } from 'expo-file-system';
import { Photo } from './types';

// Dossier où on stocke les photos
const PHOTOS_DIR = new Directory(Paths.document, 'photos');

// Crée le dossier photos s'il n'existe pas
export async function ensureDir(): Promise<void> {
  if (!PHOTOS_DIR.exists) {
    await PHOTOS_DIR.create();
  }
}

// Sauvegarde une photo dans le dossier
export async function savePhoto(tempUri: string): Promise<Photo> {
  await ensureDir();
  
  const timestamp = Date.now();
  const filename = `photo_${timestamp}.jpg`;
  const targetFile = new File(PHOTOS_DIR, filename);
  
  // Copie la photo depuis l'URI temporaire
  const sourceFile = new File(tempUri);
  await sourceFile.copy(targetFile);
  
  // Récupère la taille du fichier
  const size = targetFile.size;
  
  return {
    id: filename.replace('.jpg', ''),
    uri: targetFile.uri,
    createdAt: timestamp,
    size,
  };
}

// Liste toutes les photos du dossier
export async function listPhotos(): Promise<Photo[]> {
  await ensureDir();
  
  const items = PHOTOS_DIR.list();
  
  // Filtre uniquement les fichiers .jpg
  const photoFiles = items.filter(item => item instanceof File && item.uri.endsWith('.jpg')) as File[];
  
  // Construit la liste des objets Photo
  const photos: Photo[] = photoFiles.map(file => {
    const filename = file.name;
    
    // Extrait le timestamp du nom de fichier
    const timestampMatch = filename.match(/photo_(\d+)\.jpg/);
    const createdAt = timestampMatch ? parseInt(timestampMatch[1]) : Date.now();
    
    return {
      id: filename.replace('.jpg', ''),
      uri: file.uri,
      createdAt,
      size: file.size,
    };
  });
  
  // Trie par date décroissante (plus récent d'abord)
  return photos.sort((a, b) => b.createdAt - a.createdAt);
}

// Récupère une photo par son ID
export async function getPhoto(id: string): Promise<Photo | null> {
  const file = new File(PHOTOS_DIR, id + '.jpg');
  
  if (!file.exists) {
    return null;
  }
  
  // Extrait le timestamp du nom de fichier
  const timestampMatch = id.match(/photo_(\d+)/);
  const createdAt = timestampMatch ? parseInt(timestampMatch[1]) : Date.now();
  
  return {
    id,
    uri: file.uri,
    createdAt,
    size: file.size,
  };
}

// Supprime une photo
export async function deletePhoto(id: string): Promise<void> {
  const file = new File(PHOTOS_DIR, id + '.jpg');
  
  if (file.exists) {
    await file.delete();
  }
}
