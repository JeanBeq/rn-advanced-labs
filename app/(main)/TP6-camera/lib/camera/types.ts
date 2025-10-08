// Type pour représenter une photo stockée
export interface Photo {
  id: string;
  uri: string;
  createdAt: number;
  size?: number;
}
