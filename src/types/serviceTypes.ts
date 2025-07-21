export interface ServiceItemImage {
  src: string;
  height: number;
  width: number;
 blurDataURL?: string;      
  blurWidth?: number;      
  blurHeight?: number; 
}

export interface ServiceItem {
  id: string;
  image: ServiceItemImage;
  serviceName: string;
  description: string;
  discountPercent: number;
  beforePrice: number;
  afterPrice: number;
  saved: number;
}
