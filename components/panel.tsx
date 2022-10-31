import { ChangeEvent, MouseEvent, ReactNode } from 'react';

interface PanelProps {
  color?: string;
  heading: string;
  filters?: string[];
  handleFilter?: (event: MouseEvent<HTMLInputElement>) => void | undefined;
  handleSearch?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
  children: ReactNode;
  placeholderText: string;
}

const defaultProps = {
  color: 'is-primary',
  handleSearch: undefined,
  handleFilter: undefined,
  filters: [],
};

function Panel({
  color, heading, filters, handleFilter, handleSearch, children, placeholderText,
}: PanelProps) {
  return (
    <article className={`panel ${color}`}>
      <p className="panel-heading">
        {heading}
      </p>
      {
        filters.length ? (
          <p className="panel-tabs">
            {filters.map((filter) => (
              <button
                type="button"
                className="button is-ghost"
                key={filter}
                onClick={handleFilter}
              >
                {filter}
              </button>
            ))}
          </p>
        ) : null
      }
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input is-success" type="text" name="search" onChange={handleSearch} placeholder={placeholderText} />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      {children}
    </article>
  );
}

Panel.defaultProps = defaultProps;

export default Panel;
