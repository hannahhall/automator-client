import { ChangeEvent, useEffect, useState } from 'react';
import { fetchPrograms } from '../../data/program';
import { Program } from '../../interfaces';
import Panel from '../panel';

function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [search, setSearch] = useState('');

  const getData = () => {
    fetchPrograms(search).then((res) => {
      const { data } = res;
      setPrograms(data);
    });
  };

  useEffect(() => {
    if (search.length !== 1) {
      getData();
    }
  }, [search]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Panel heading="Programs" handleSearch={handleSearch} placeholderText="Search Programs">
      {
        programs.length
          ? (
            programs.map((program) => (
              <a href={`/programs/${program.id}`} key={program.id} className="panel-block">
                {program.name}
              </a>
            ))
          )
          : <div className="panel-block">No programs found</div>
      }
    </Panel>
  );
}

export default ProgramList;
