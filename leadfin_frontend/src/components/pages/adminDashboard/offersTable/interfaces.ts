export interface OfferProps {
  open: boolean;
  onClose: () => void;
}

export interface OffersExportProps extends OfferProps {}

export interface AddOfferFormProps extends OfferProps {}

export interface EditColumnsProps extends OfferProps {
  columns: Record<string, boolean>;
  onColumnChange: (selectedColumns: Record<string, boolean>) => void;
}

export interface TableHeaderProps {
  numberOfOffers: number;
  onEditColumns: () => void;
}

export interface NavigationButtonsProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export interface FormStep1Props {
  data: {
      title: string;
      note: string;
      advertiser: string;
      kpi: string;
  };
  onChange: (field: string, value: string) => void;
}

export interface FormStep2Props {
  data: {
      logo: File | null;
      status: string;
      sendEmailStatusChange: boolean;
      tags: string;
      privacyLevel: string;
      scheduleEnabled: boolean;
      startDate: string;
      endDate: string;
      timeZone: string;
      statusAfterStop: string;
      privacyLevelAfterStop: string;
      sendEmailStatusChangeBeforeStop: boolean;
      sendEmailTime: string;
      categories: string;
  };
  onChange: (field: string, value: any) => void;
  onLogoUpload: (file: File | null) => void;
}

export interface FormStep3Props {
  data: {
      trackingURL: string;
      viewURL: string;
      trafficBackURL: string;
      trackingDomainURL: string;
      sessionLifetime: string;
      minSessionLifetime: string;
  };
  onChange: (field: string, value: string) => void;
}

export interface FormStep4Props {
  data: {
      countries: string;
      regions: string;
      cities: string;
      connectionType: string;
      operatingSystem: string;
      mobileOperators: string;
      devices: string;
      deviceManufacturers: string;
      browsers: string;
      ipRange: string;
      postalCodes: string;
  };
  onChange: (field: string, value: string) => void;
}

export interface OfferData {
  id: number;
  name: string;
  categories: string;
  client: string;
  status: string;
  privacyLevel: string;
  weekCr: number;
  dailyLimit: string;
  totalLimit: string;
  today: number;
  payment: number;
  income: string;
  notes: string;
}

export interface EditOfferModalProps extends OfferProps {
  offer: OfferData
}


