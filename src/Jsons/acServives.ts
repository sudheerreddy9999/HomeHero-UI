import image1 from "@/assets/SunRiseSofa.webp"
import { StaticImageData } from "next/image";
import image2 from "@/assets/banner-image.webp"
import image3 from "@/assets/sofa-mobile.jpeg"
import image4 from "@/assets/MostBookedServices/ac-reaparing.jpg"

export interface ACService {
  id: string;
  image: StaticImageData;
  serviceName: string;
  description: string;
  discountPercent: number;
  beforePrice: number;
  afterPrice: number;
  saved: number;
}

export const acServices: ACService[] = [
  {
    id: "ac1",
    image: image1,
    serviceName: "AC General Service",
    description: "Basic AC servicing with filter and coil cleaning to ensure smooth airflow.",
    discountPercent: 30,
    beforePrice: 799,
    afterPrice: 559,
    saved: 240
  },
  {
    id: "ac2",
    image: image2,
    serviceName: "AC Repair",
    description: "Repair for cooling issues, noise problems, or electrical faults.",
    discountPercent: 25,
    beforePrice: 999,
    afterPrice: 749,
    saved: 250
  },
  {
    id: "ac3",
     image: image3,
    serviceName: "AC Gas Refill",
    description: "Top-up refrigerant gas for enhanced cooling performance.",
    discountPercent: 20,
    beforePrice: 1499,
    afterPrice: 1199,
    saved: 300
  },
  {
    id: "ac4",
     image: image4,
    serviceName: "AC Installation",
    description: "Professional installation of window and split AC units.",
    discountPercent: 15,
    beforePrice: 1799,
    afterPrice: 1529,
    saved: 270
  },
  {
    id: "ac5",
     image: image1,
    serviceName: "AC Uninstallation",
    description: "Safe removal of AC units with proper disconnection and handling.",
    discountPercent: 20,
    beforePrice: 899,
    afterPrice: 719,
    saved: 180
  },
  {
    id: "ac6",
    image: image1,
    serviceName: "AC Wet Service",
    description: "Deep water-based cleaning for coils and filters.",
    discountPercent: 28,
    beforePrice: 899,
    afterPrice: 647,
    saved: 252
  },
  // {
  //   id: "ac7",
  //  image: image1,
  //   serviceName: "AC Dry Service",
  //   description: "Dry cleaning of internal components without water.",
  //   discountPercent: 18,
  //   beforePrice: 699,
  //   afterPrice: 573,
  //   saved: 126
  // },
  // {
  //   id: "ac8",
  //   image: image1,
  //   serviceName: "AC Jet Pump Cleaning",
  //   description: "High-pressure cleaning of indoor and outdoor units.",
  //   discountPercent: 35,
  //   beforePrice: 1299,
  //   afterPrice: 844,
  //   saved: 455
  // },
  // {
  //   id: "ac9",
  //    image: image1,
  //   serviceName: "AC Annual Maintenance",
  //   description: "Year-round maintenance including 3 services and minor fixes.",
  //   discountPercent: 40,
  //   beforePrice: 2999,
  //   afterPrice: 1799,
  //   saved: 1200
  // },
  // {
  //   id: "ac10",
  //    image: image1,
  //   serviceName: "AC PCB Board Repair",
  //   description: "Repair or replacement of AC circuit (PCB) boards for proper functioning.",
  //   discountPercent: 22,
  //   beforePrice: 1699,
  //   afterPrice: 1325,
  //   saved: 374
  // }
];
