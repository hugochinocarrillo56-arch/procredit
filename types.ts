export interface LoanSimulation {
  amount: number;
  months: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export enum PawnCategory {
  JOYERIA = 'Joyería',
  VEHICULOS = 'Vehículos',
  ELECTRONICOS = 'Electrónicos',
  INMUEBLES = 'Inmuebles',
}