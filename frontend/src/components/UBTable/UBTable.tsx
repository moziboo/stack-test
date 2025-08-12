import { forwardRef, createContext, useContext } from 'react';
import styles from './UBTable.module.css';

// Context for sharing table state between compound components
interface TableContextValue {
  striped?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const TableContext = createContext<TableContextValue>({});

// Main Table Component
interface UBTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  size?: 'sm' | 'md' | 'lg';
  caption?: string;
}

const UBTableRoot = forwardRef<HTMLTableElement, UBTableProps>(
  ({ striped = false, size = 'md', caption, className, children, ...restProps }, ref) => {
    return (
      <TableContext.Provider value={{ striped, size }}>
        <div className={styles.tableContainer}>
          <table
            ref={ref}
            className={`${styles.table} ${styles[size]} ${striped ? styles.striped : ''} ${className || ''}`}
            {...restProps}
          >
            {caption && <caption className={styles.caption}>{caption}</caption>}
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

// Header Component
const UBTableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...restProps }, ref) => {
  return (
    <thead ref={ref} className={`${styles.header} ${className || ''}`} {...restProps}>
      {children}
    </thead>
  );
});

// Body Component
const UBTableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...restProps }, ref) => {
  return (
    <tbody ref={ref} className={`${styles.body} ${className || ''}`} {...restProps}>
      {children}
    </tbody>
  );
});

// Footer Component
const UBTableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...restProps }, ref) => {
  return (
    <tfoot ref={ref} className={`${styles.footer} ${className || ''}`} {...restProps}>
      {children}
    </tfoot>
  );
});

// Row Component
interface UBTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  clickable?: boolean;
}

const UBTableRow = forwardRef<HTMLTableRowElement, UBTableRowProps>(
  ({ selected = false, clickable = false, className, children, ...restProps }, ref) => {
    return (
      <tr
        ref={ref}
        className={`${styles.row} ${selected ? styles.selected : ''} ${clickable ? styles.clickable : ''} ${className || ''}`}
        {...restProps}
      >
        {children}
      </tr>
    );
  }
);

// Header Cell Component
interface UBTableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | 'none';
  onSort?: () => void;
}

const UBTableHeaderCell = forwardRef<HTMLTableHeaderCellElement, UBTableHeaderCellProps>(
  (
    { sortable = false, sortDirection = 'none', onSort, className, children, ...restProps },
    ref
  ) => {
    const { size } = useContext(TableContext);

    return (
      <th
        ref={ref}
        className={`${styles.headerCell} ${styles[`${size}Cell`]} ${sortable ? styles.sortable : ''} ${className || ''}`}
        onClick={sortable ? onSort : undefined}
        aria-sort={
          sortable
            ? sortDirection === 'asc'
              ? 'ascending'
              : sortDirection === 'desc'
                ? 'descending'
                : 'none'
            : undefined
        }
        {...restProps}
      >
        <div className={styles.headerCellContent}>
          {children}
          {sortable && (
            <span className={styles.sortIcon} data-direction={sortDirection}>
              {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕'}
            </span>
          )}
        </div>
      </th>
    );
  }
);

// Cell Component
interface UBTableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  numeric?: boolean;
}

const UBTableCell = forwardRef<HTMLTableDataCellElement, UBTableCellProps>(
  ({ numeric = false, className, children, ...restProps }, ref) => {
    const { size } = useContext(TableContext);

    return (
      <td
        ref={ref}
        className={`${styles.cell} ${styles[`${size}Cell`]} ${numeric ? styles.numeric : ''} ${className || ''}`}
        {...restProps}
      >
        {children}
      </td>
    );
  }
);

// Compound component with sub-components attached
const UBTable = Object.assign(UBTableRoot, {
  Header: UBTableHeader,
  Body: UBTableBody,
  Footer: UBTableFooter,
  Row: UBTableRow,
  HeaderCell: UBTableHeaderCell,
  Cell: UBTableCell,
});

// Set display names for better debugging
UBTableRoot.displayName = 'UBTable';
UBTableHeader.displayName = 'UBTable.Header';
UBTableBody.displayName = 'UBTable.Body';
UBTableFooter.displayName = 'UBTable.Footer';
UBTableRow.displayName = 'UBTable.Row';
UBTableHeaderCell.displayName = 'UBTable.HeaderCell';
UBTableCell.displayName = 'UBTable.Cell';

export default UBTable;
export type { UBTableProps, UBTableRowProps, UBTableHeaderCellProps, UBTableCellProps };
