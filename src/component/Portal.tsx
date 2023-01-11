import { css } from '@emotion/react';
import { cx } from '@emotion/css';
import { isValidElement, cloneElement, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Modal = () => {
    return <div>Modal</div>;
};

interface Props {
    children?: ReactNode;
    container?: Element;
}
export const Portal = (props: Props) => {
    const { children, container } = props;

    useEffect(() => {
        createPortal(children, document.body);
    }, []);

    return createPortal(
        <div className="Portal">
            <div>Portal</div>
            {isValidElement(children) &&
                cloneElement(children, {
                    style: {
                        margin: '1rem',
                        padding: '1rem',
                        userSelect: 'none',
                    },
                } as any)}
        </div>,
        container ?? document.body,
    );
};

Portal.defaultProps = {
    container: document.body,
};
