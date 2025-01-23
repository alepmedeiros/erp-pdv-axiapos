export interface MercadoPagoBrickSettings {
    initialization: {
      amount: number;
    };
    customization: {
      visual: {
        style: {
          theme: string;
        };
      };
      paymentMethods: {
        creditCard: string;
        debitCard: string;
        bankTransfer: string[];
      };
    };
    callbacks: {
      onReady: () => void;
      onSubmit: (formData: any) => Promise<void>;
      onError: (error: any) => void;
    };
  }
  