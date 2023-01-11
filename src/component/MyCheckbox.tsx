import * as M from '@mui/material';

export interface MyCheckboxProps {
  // value: { [k: string]: boolean } | boolean[];
  value: boolean[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: boolean[]) => any;
}
export const MyCheckbox = ({ value, onChange }: MyCheckboxProps) => {
  // const [values, setValues] = React.useState(value);

  return (
    <M.Box>
      <M.Checkbox
        className='---전체---'
        checked={value.every((e) => e)}
        indeterminate={new Set(value).size === 2}
        onChange={(e, v) => {
          const cv = [...value.fill(v)];
          onChange(e, cv);
        }}
      />

      {value.map((checked, index) => (
        <M.Checkbox
          className='---개별---'
          key={`checkbox-${index}`}
          checked={checked}
          onChange={(e, v) => {
            value[index] = v;
            onChange(e, [...value]);
          }}
        />
      ))}
    </M.Box>
  );
};

MyCheckbox.defaulyProps = {
  onchange: () => {},
};
