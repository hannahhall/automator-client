import { ChangeEvent, useEffect, useState } from 'react';
import { fetchPrograms } from '../../data/program';
import { Program } from '../../interfaces';
import Panel from '../panel';

function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [links, setLinks] = useState([]);
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

  useEffect(() => {
    setLinks(programs.map(
      (program) => ({
        id: program.id,
        href: `/programs/${program.id}`,
        text: program.name,
      }),
    ));
  }, [programs, setLinks]);

  return (
    <Panel heading="Programs" links={links} handleSearch={handleSearch} />
  );
}

export default ProgramList;
