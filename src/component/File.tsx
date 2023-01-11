import { css } from '@emotion/react';
import {
  cloneElement,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  ReactNode,
  MouseEvent,
  ChangeEvent,
} from 'react';

type FileProps = {
  onChange?: (e: ChangeEvent, v: File[]) => any;
  multiple?: boolean;
  children?: ReactNode;
};

export const File = (props: FileProps) => {
  const { onChange, children, ...otherProps } = props;

  const [filename, setFilename] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const refRoot = useRef() as MutableRefObject<HTMLInputElement>;
  const refInput = useRef() as MutableRefObject<HTMLInputElement>;

  const changeHandler = (event: ChangeEvent) => {
    const files = Array.from(refInput.current.files as FileList);
    setFiles(files);
    if (typeof onChange === 'function') {
      onChange(event, files);
    }
  };

  // console.log(children);

  const openHandler = (event: MouseEvent) => {
    refInput.current.click();
    // console.log(event);
  };

  useEffect(() => {
    const rootElement = refRoot.current;
    const dragOverHandler = (event: DragEvent) => {
      event.preventDefault();
      rootElement.classList.add('draging');
    };
    const dropHandler = (event: DragEvent) => {
      event.preventDefault();
      const v = event.dataTransfer?.files;
      const files: File[] = v ? Array.from(v) : [];
      setFiles(files);
      rootElement.classList.remove('draging');
    };
    rootElement.addEventListener('dragover', dragOverHandler, {
      capture: true,
    });
    rootElement.addEventListener('drop', dropHandler, { capture: true });

    return () => {
      rootElement.removeEventListener('dragover', dragOverHandler, {
        capture: true,
      });
      rootElement.removeEventListener('drop', dropHandler, { capture: true });
    };
  }, []);

  return (
    <div
      css={css`
        background-color: rgba(255, 255, 0, 0.5);
        min-height: 2rem;
        &.draging {
          background-color: rgba(255, 255, 0, 1);
        }
      `}
      onClick={openHandler}
      ref={refRoot}
    >
      <input
        hidden
        type="file"
        ref={refInput}
        onChange={changeHandler}
        {...otherProps}
      />

      {files.map((e) => (
        <div
          key={e.name}
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <div>{e.name}</div>
          <div>{e.size}</div>
        </div>
      ))}

      {![undefined, null].some((e) => e === children) &&
        cloneElement(children as any, { files })}
    </div>
  );
};

export const FileInfo = (props: { files?: File[] }) => {
  return (
    <div>
      {'files: '}
      {props.files &&
        props.files.map((e: File) => <div key={e.name}>{e.name}</div>)}
    </div>
  );
};
