export type DeliveryRate = {
  state: string;
  type: "flat" | "choice" | "zones" | "pickup";
  flatPrice?: number;
  homePrice?: number;
  parkPrice?: number;
  zones?: { name: string; price: number; areas?: string }[];
};

export const deliveryRates: DeliveryRate[] = [
  // Free pickup — no state needed
  { state: "Pick Up (Free)", type: "pickup", flatPrice: 0 },

  // Lagos — zone-based pricing
  {
    state: "Lagos",
    type: "zones",
    zones: [
      {
        name: "Mainland Zone A",
        price: 3000,
        areas:
          "Alapere, Gbagada, Ifako Ijaiye, Ikeja, Ikosi, Ketu, Magodo, Magodo 1, Maryland, Mile 12, New Garage, Obawole, Ogba, Ogudu, Ojota, Ojodu, Olowoira, Omole 1, Omole 2, Oworo",
      },
      {
        name: "Mainland Zone B",
        price: 3500,
        areas:
          "Anthony, Idi Araba, Idi Iroko, Obanikoro, Somolu, Yaba, Surulere, Pedro, Gbagada Phase 1, Bariga, Isolo, Ajao Estate, Ikeja Airport, Jakande, Ago Palace, Costain, Ebute Metta, Jibowu, Fadeyi, Mushin, Ilupeju, Ilasamaja, Ilasa, Iddo, Cement, LUTH, Mangoro, Opic, Papa Ajao, Palmgrove, Oshodi, Oyingbo, Oninanu",
      },
      {
        name: "Mainland Zone C",
        price: 4000,
        areas:
          "Abuleegba, Agege, Ajegunle, Akowonjo, Alaguntan, Alimosho, Amuwo, Apapa, Ayobo, Egbeda, Ejigbo, Festac, Idimu, Igando, Ijegun, Ikotun, Isheri Oshun, Isheri Olofin, Ipaja, Iyana Ipaja, Meiran, Mile 2, Shasha, Satellite",
      },
      {
        name: "Island Zone A",
        price: 4000,
        areas: "Ikate, Ikoyi, Ilasan, Jakande, Lagos Island, Lekki 1, Marina, Oniru, VI, Osapa",
      },
      {
        name: "Island Zone B",
        price: 4000,
        areas: "Agungi, Chevron, Ikota, Lekki 2, Ologolo, Orchid, VGC",
      },
      {
        name: "Island Zone C",
        price: 5000,
        areas: "Abijo, Ajah, Awoyaya, Badore, Ogombo, Sangotedo",
      },
      {
        name: "Extreme Lagos",
        price: 6000,
        areas:
          "Abule Ado, Agbara, Akute, Alaagbado, Araga, Arepo, Asese, Badagry, Dangote Refinery, Epe, Ibeju, Ikorodu, Ibafo, Imota, Kola, LASU, Mowe, Ojo, Okokomiako, Sango Otta, Shibiti, Tradefair",
      },
      {
        name: "Others (Area not listed)",
        price: 6000,
      },
    ],
  },

  // South West (home delivery only, per rate card)
  { state: "Ekiti", type: "flat", flatPrice: 6500 },
  { state: "Ondo", type: "flat", flatPrice: 6500 },
  { state: "Osun", type: "flat", flatPrice: 6500 },
  { state: "Oyo", type: "flat", flatPrice: 6500 },
  { state: "Ogun", type: "flat", flatPrice: 6500 },

  // South South
  { state: "Akwa Ibom", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Cross River", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Bayelsa", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Rivers", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Delta", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Edo", type: "choice", homePrice: 8500, parkPrice: 7500 },

  // South East
  { state: "Enugu", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Anambra", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Ebonyi", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Imo", type: "choice", homePrice: 8500, parkPrice: 7500 },
  { state: "Abia", type: "choice", homePrice: 8500, parkPrice: 7500 },

  // North Central
  { state: "Niger", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Benue", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Nasarawa", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Plateau", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Kogi", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Abuja (FCT)", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Kwara", type: "choice", homePrice: 9500, parkPrice: 8500 },

  // North West
  { state: "Jigawa", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Kano", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Katsina", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Kaduna", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Zamfara", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Sokoto", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Kebbi", type: "choice", homePrice: 9500, parkPrice: 8500 },

  // North East
  { state: "Gombe", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Bauchi", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Yobe", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Borno", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Adamawa", type: "choice", homePrice: 9500, parkPrice: 8500 },
  { state: "Taraba", type: "choice", homePrice: 9500, parkPrice: 8500 },
];
