export interface ColumnData {
    [key: string]: string | number;
}

export interface DataItem {
    Day: string;
    Traffic: ColumnData;
    Views: ColumnData;
    'Status "Accepted"': ColumnData;
    'Status "Hold"': ColumnData;
    'Status "In Process"': ColumnData;
    'Status "Rejected"': ColumnData;
    CR: number;
    ERC: number;
    ECPM: number;
    Total: ColumnData;
}

export interface EditColumnsProps {
    open: boolean;
    columns: Record<string, boolean>;
    onClose: () => void;
    onColumnChange: (selectedColumns: Record<string, boolean>) => void;
}

export interface StatisticExportProps {
    open: boolean;
    onClose: () => void;
  }

  export interface TableHeaderProps {
    onEditColumns: () => void;
    onAddCustomColumn: (columnDetails: any) => void; 
};

export interface ColumnDetails {
    name: string;
    formula: string;
  };