import { ChangeEvent, useEffect, useState } from 'react';
import { TableProps, Tech } from '../../interfaces';
import Panel from '../panel';
import Table from '../table';
import TechIcon from './icon';

interface TechListProps {
  techs: Tech[];
  search: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TechList({ techs, search }: TechListProps) {
  const [techTable, setTechTable] = useState<TableProps>({
    headers: [],
    footers: [],
    rows: [],
  });

  const buildRows = (data: Tech[]) => data.map((tech: Tech) => ({
    key: `cohort-${tech.id}`,
    data: [
      tech.text,
      <TechIcon src={tech.square_icon} text={tech.text} />,
    ],
  }));

  useEffect(() => {
    if (techs) {
      const columns = ['Tech', 'Icon'];
      setTechTable({
        headers: columns,
        footers: columns,
        rows: buildRows(techs),
      });
    }
  }, [techs]);

  return (
    <Panel heading="Current Techs" color="is-warning" handleSearch={search} placeholderText="Search Techs">
      <div className="panel-block">
        {
          techTable?.rows.length
            ? (
              <Table
                headers={techTable?.headers}
                footers={techTable?.footers}
                rows={techTable?.rows}
              />
            )
            : <span>No Techs found</span>
        }
      </div>
    </Panel>
  );
}

export default TechList;
