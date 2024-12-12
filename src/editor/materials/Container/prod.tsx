import React, { FunctionComponent, PropsWithChildren } from 'react';
import { CommonComponentProps } from '../Page';

interface ContainerProps extends CommonComponentProps {}

const Container: FunctionComponent<PropsWithChildren<ContainerProps>> = ({
	children,
	styles,
}) => {

	return (
		<div
            className='p-5'
			style={styles}
		>
			{children}
		</div>
	);
};

export default Container;
