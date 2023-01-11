import { Box, BoxProps, css, SxProps, Theme, useTheme } from '@mui/material';
import { CSSProperties, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { cx } from '@emotion/css';

type RenderHandle = (
  value: any,
  data: any | null,
  indexs?: { rowIndex: number; colIndex: number },
) => any;

interface OtherProps {
  [k: string]: any;
  sx?: SxProps<Theme>;
}

interface Col {
  [k: string]: any;
  span?: number;
  style?: CSSProperties;
  css?: any;
}

export interface RenderOption {
  name: string;
  hr?: RenderHandle;
  dr?: RenderHandle;
  hp?: OtherProps;
  dp?: OtherProps;
  caption?: string;
  col?: Col;
}

interface MyTableProps {
  [k: string]: any;
  list: any[];
  renders: RenderOption[];
  caption?: any;
  css?: any;
}
const MyTable = (props: BoxProps & MyTableProps) => {
  const {
    list,
    renders,
    cols,
    caption,
    sort,
    css: cssProp,
    fullWidth,
    ...otherProps
  } = props;
  const { palette, spacing } = useTheme();
  const names = useMemo(() => renders.map((e) => e.name), [renders]);

  return (
    <Box
      component="table"
      css={cx([
        css`
          padding: ${spacing(2)};
          border-collapse: collapse;
          background-color: ${palette.mode === 'dark'
            ? 'rgba(0,0,0,0.5)'
            : 'rgba(255,255,255,0.5)'};
          & tbody td {
            border-bottom: 1px solid
              ${palette.mode === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)'};
          }
        `,
        cssProp,
      ])}
      {...otherProps}
    >
      <caption>{caption}</caption>

      <colgroup>
        {renders.map((option, i) => {
          let { name, col } = option;
          return (
            <Box
              component="col"
              data-name={`col-${name}`}
              key={`col-${i}`}
              {...col}
            />
          );
        })}
      </colgroup>

      <thead>
        <tr>
          {renders.map((option, i) => {
            let { name, hr, hp } = option;
            let order = 1;
            if (typeof hr !== 'function') {
              hr = option.hr = () => name;
            }
            return (
              <th key={`th-${i}`} {...hp}>
                {hr(name, names)}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {list.length ? (
          list.map((data, rowIndex) => {
            return (
              <tr key={`row-${rowIndex}`}>
                {renders.map((option, colIndex) => {
                  let { name, dr, dp } = option;
                  let value = data ? data[name] : undefined;
                  if (typeof dr !== 'function') {
                    dr = option.dr = (value) => value;
                  }
                  return (
                    <td key={`td-${rowIndex}-${colIndex}`} {...dp}>
                      {dr(value, data, { rowIndex, colIndex })}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={renders.length}
              css={css`
                color: ${palette.text.disabled};
                text-align: center;
                vertical-align: middle;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
              `}
            >
              No data
            </td>
          </tr>
        )}
      </tbody>
    </Box>
  );
};

export default MyTable;
