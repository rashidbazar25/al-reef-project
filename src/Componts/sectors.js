import { Handshake, ShieldCheck, Gavel } from "lucide-react";

import eduImg from "../assets/logo.png";

export const sectors = [
  {
    id: "care",
    title: "قطاع الرعاية المجتمعية",
    icon: Handshake,
    description:
      "يركز هذا القطاع على توفير الرعاية الشاملة للمجتمع المحلي، مع التركيز على الفئات الأكثر احتياجاً.",
    points: [
      "برامج الدعم الغذائي",
      "الرعاية الصحية الأولية",
      "دعم الأسر المتعففة",
      "برامج كفالة الأيتام",
    ],
    image: eduImg,
  },

  {
    id: "empowerment",
    title: "قطاع الحماية والتمكين",
    icon: ShieldCheck,
    description:
      "يهدف إلى حماية المرأة والطفل وتمكينهما من خلال برامج التدريب والتأهيل المهني.",
    points: [
      "برامج التدريب المهني",
      "المشاريع الصغيرة والمتوسطة",
      "برامج محو الأمية",
      "التوعية الصحية والاجتماعية",
    ],
    image: eduImg,
  },

  {
    id: "rights",
    title: "قطاع الحقوق",
    icon: Gavel,
    description:
      "يعمل على نشر الوعي الحقوقي وحماية حقوق المرأة والطفل في المجتمع.",
    points: [
      "التوعية الحقوقية",
      "الاستشارات القانونية",
      "حملات المناصرة",
      "التدريب على الحقوق",
    ],
    image: eduImg,
  },
];