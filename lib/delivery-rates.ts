export type DeliveryRate = {
  state: string;
  type: "flat" | "choice";
  flatPrice?: number;
  homePrice?: number;
  parkPrice?: number;
};

export const deliveryRates: DeliveryRate[] = [
  // Lagos — special flat exception
  { state: "Lagos", type: "flat", flatPrice: 6000 },

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
