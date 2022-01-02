interface IForecastData {
  country: string
  zipCode: string;
  data: any;
};

export type ForecastData = Readonly<IForecastData>;