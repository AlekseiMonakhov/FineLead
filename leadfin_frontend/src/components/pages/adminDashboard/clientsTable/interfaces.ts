export interface ClientsProps {
    open: boolean;
    onClose: () => void;
}

export interface ClientsExportProps extends ClientsProps {}

export interface AddClientProps extends ClientsProps {}

export interface ClientsImportProps extends ClientsProps {}

export interface EditColumnsProps extends ClientsProps {
    columns: Record<string, boolean>;
    onColumnChange: (selectedColumns: Record<string, boolean>) => void;
}

export interface TableHeaderProps {
    numberOfClients: number;
    onEditColumns: () => void;
}



