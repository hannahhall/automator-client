import Multiselect from 'multiselect-react-dropdown';
import { Control, Controller } from 'react-hook-form';
import { Program, TCohort, Tech } from '../../interfaces';

interface Value extends Program, TCohort { }

interface TechMultiSelectProps {
  control: Control<Value>,
  availableTechs: Tech[]
}

function TechMultiSelect({ control, availableTechs }: TechMultiSelectProps) {
  return (
    <div className="field">
      <Controller
        control={control}
        name="techs"
        render={({ field: { value, onChange } }) => (
          <>
            <p className="label">Choose existing techs</p>
            <Multiselect
              options={availableTechs}
              placeholder="Search Techs"
              displayValue="text"
              closeOnSelect={false}
              onSelect={onChange}
              onRemove={onChange}
              selectedValues={value}
              avoidHighlightFirstOption
              isObject
            />
          </>
        )}
      />
    </div>
  );
}

export default TechMultiSelect;
