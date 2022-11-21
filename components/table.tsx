import { TableProps } from '../interfaces';

function Table({ headers, footers, rows }: TableProps) {
  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          {
            headers.map((header) => <th key={header}>{header}</th>)
          }
        </tr>
      </thead>
      <tfoot>
        <tr>
          {
            footers.map((footer) => <th key={footer}>{footer}</th>)
          }
        </tr>
      </tfoot>
      <tbody>
        {
          rows.map((row) => (
            <tr key={`row-${row.key}`}>
              {
                row.data.map((data, index) => (
                  index === 0
                    ? <th key={`${row.key}-${headers[index]}`}>{data}</th>
                    : <td key={`${row.key}-${headers[index]}`}>{data}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
