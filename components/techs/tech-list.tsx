import { ChangeEvent, useEffect, useState } from 'react';
import { TableProps, Tech } from '../../interfaces';
import Panel from '../panel';
import Table from '../table';
import TechModalForm from './tech-modal-form';
import TechIcon from './icon';

interface TechListProps {
  techs: Tech[];
  search: (event: ChangeEvent<HTMLInputElement>) => void;
  refresh: () => void;
}

function TechList({ techs, search, refresh }: TechListProps) {
  const [techTable, setTechTable] = useState<TableProps>({
    headers: [],
    footers: [],
    rows: [],
  });

  const [techToEdit, setTechToEdit] = useState<Tech>(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditOpen = (tech: Tech) => {
    setTechToEdit(tech);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTechToEdit(null);
    refresh();
  };

  const buildRows = (data: Tech[]) => data.map((tech: Tech) => ({
    key: `cohort-${tech.id}`,
    data: [
      tech.text,
      <TechIcon src={tech.square_icon} text={tech.text} />,
      <button type="button" onClick={() => handleEditOpen(tech)}>Edit</button>,
    ],
  }));

  useEffect(() => {
    if (techs) {
      const columns = ['Tech', 'Icon', ''];
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
      {
        showModal ? (
          <TechModalForm
            showModal={showModal}
            closeModal={handleCloseModal}
            initialData={techToEdit}
          />
        ) : null
      }
    </Panel>
  );
}

export default TechList;
