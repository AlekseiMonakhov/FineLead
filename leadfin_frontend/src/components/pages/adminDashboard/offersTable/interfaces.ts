export interface OfferProps {
  open: boolean;
  onClose: () => void;
}

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

export interface FormStepProps<T> {
  data: T;
  onChange: (field: string, value: T[keyof T]) => void;
}

export interface FormStep1Props extends FormStepProps<{
  title: string;
  note: string;
  advertiser: string;
  kpi: string;
}> {}

export interface FormStep2Props extends FormStepProps<{
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
}> {}

export interface FormStep3Props extends FormStepProps<{
  trackingURL: string;
  viewURL: string;
  trafficBackURL: string;
  trackingDomainURL: string;
  sessionLifetime: string;
  minSessionLifetime: string;
}> {}

export interface FormStep4Props extends FormStepProps<{
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
}> {}
