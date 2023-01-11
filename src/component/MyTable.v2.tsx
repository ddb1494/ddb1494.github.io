import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  SxProps,
  Theme,
  TableContainer,
} from '@mui/material';

type RenderHandle = (value: any, data: any | null) => any;

interface OtherProps {
  [k: string]: any;
  sx?: SxProps<Theme>;
}

interface RenderOption {
  name: string;
  th?: RenderHandle;
  td?: RenderHandle;
  hp?: OtherProps;
  dp?: OtherProps;
}

interface MyTableProps {
  [k: string]: any;
  list: any[];
  renderOptions: RenderOption[];
}
const MyTable = (props: MyTableProps) => {
  const { list, renderOptions, ...otherProps } = props;

  return (
    <TableContainer {...otherProps}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {renderOptions.map((option, i) => {
              let { name, th, hp } = option;
              let item = list.find((e) => e && name in e);
              if (typeof th !== 'function') {
                th = option.th = () => name;
              }

              return (
                <TableCell key={`th-${i}`} {...hp}>
                  {item ? th(item[name], item) : name}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((data, i1) => {
            return (
              <TableRow key={`row-${i1}`}>
                {renderOptions.map((option, i2) => {
                  let { name, td, dp } = option;
                  let value = data ? data[name] : undefined;
                  if (typeof td !== 'function') {
                    td = option.td = () => value;
                  }
                  return (
                    <TableCell key={`td-${i1}-${i2}`} {...dp}>
                      {td(value, data)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
