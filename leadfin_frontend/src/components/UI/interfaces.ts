export interface EditColumnsProps {
    open: boolean;
    onClose: () => void;
    columns: Record<string, boolean>;
    onColumnChange: (selectedColumns: Record<string, boolean>) => void;
}
