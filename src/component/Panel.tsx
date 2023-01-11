import { ReactNode, cloneElement, isValidElement } from 'react';

interface Props {
  [k: string | number | symbol]: any;
  title?: string;
  children?: ReactNode;
}

export const Panel = (props: Props) => {
  const { title, children, ...otherProps } = props;
  console.log(props);

  return (
    <div {...otherProps}>
      <h3>{props.title}</h3>
      {isValidElement(children) && (
        <div>{cloneElement(children, otherProps)}</div>
      )}
    </div>
  );
};

Panel.defaultProps = {
  title: 'TITLE',
};
