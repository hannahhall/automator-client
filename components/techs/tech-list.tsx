import { ChangeEvent, useEffect, useState } from 'react';
import { TableProps, Tech } from '../../interfaces';
import Panel from '../panel';
import Table from '../table';
import TechModalForm from './tech-modal-form';
import TechIcon from './icon';
import DeleteModal from '../delete-modal';

interface TechListProps {
  techs: Tech[];
  search: (event: ChangeEvent<HTMLInputElement>) => void;
  refresh: () => void;
  handleRemoveTech: (tech: Tech) => void;
}

function TechList({
  techs, search, refresh, handleRemoveTech,
}: TechListProps) {
  const [techTable, setTechTable] = useState<TableProps>({
    headers: [],
    footers: [],
    rows: [],
  });

  const [techToEdit, setTechToEdit] = useState<Tech>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditOpen = (tech: Tech) => {
    setTechToEdit(tech);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setTechToEdit(null);
    refresh();
  };

  const handleDeleteOpen = (tech: Tech) => {
    setShowDeleteModal(true);
    setTechToEdit(tech);
  };

  const buildRows = (data: Tech[]) => data.map((tech: Tech) => ({
    key: `cohort-${tech.id}`,
    data: [
      tech.text,
      <TechIcon src={tech.square_icon} text={tech.text} />,
      (
        <div className="buttons">
          <button
            type="button"
            className="button is-ghost"
            onClick={() => handleEditOpen(tech)}
            data-testid={`edit-${tech.id}`}
          >
            <span className="icon is-medium has-text-info">
              <i className="fas fa-lg fa-edit" />
            </span>
          </button>
          <button
            type="button"
            className="button is-ghost"
            onClick={() => handleDeleteOpen(tech)}
            data-testid={`delete-${tech.id}`}
          >
            <span className="icon is-medium has-text-danger">
              <i className="fas fa-lg fa-trash" />
            </span>
          </button>
        </div>
      ),
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
        showEditModal ? (
          <TechModalForm
            showModal={showEditModal}
            closeModal={handleCloseModal}
            initialData={techToEdit}
          />
        ) : null
      }
      {
        showDeleteModal ? (
          <DeleteModal
            isActive={showDeleteModal}
            handleCancel={handleCloseModal}
            name={techToEdit?.text}
            handleSubmit={() => {
              handleRemoveTech(techToEdit);
              setShowDeleteModal(false);
              setTechToEdit(null);
            }}
          />
        ) : null
      }
    </Panel>
  );
}

export default TechList;
