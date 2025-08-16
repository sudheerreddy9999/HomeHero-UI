export interface ServiceItemImage {
  src: string;
  height: number;
  width: number;
 blurDataURL?: string;      
  blurWidth?: number;      
  blurHeight?: number; 
}

export interface ServiceItem {
  service_id: number;
  service_name: string;
  description: string;
  service_image_url: string;
  service_type_name: string;
  service_type_description: string;
  service_type_image_url: string;
  price: string;
  offerPrice: string;
  service_type_id: number;
  duration_minutes: number;
}



export interface GetCategoryItemsType{
  headers :{
    service_id:string
  }
}

export interface GetServiceSearch{
  headers:{
    service_name:string;
  }
}

export interface FeedBackType{
  session_id:string,
  status:string
}

export interface CartPost{
  service_id:number
}
