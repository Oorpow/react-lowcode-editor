import { FunctionComponent, PropsWithChildren } from 'react';
import { useMaterialDrop } from '@/hooks/useMaterialDrop';
import { CommonComponentProps } from '../Page';

interface ContainerProps extends CommonComponentProps {}

const Container: FunctionComponent<PropsWithChildren<ContainerProps>> = ({
	children,
	id,
	styles,
}) => {
	const { drop, canDrop } = useMaterialDrop(['Button', 'Container'], id);

	return (
		<div
			data-component-id={id}
			ref={drop}
			className={`border min-h-[100px] p-5 ${
				canDrop ? 'border-2 border-blue-400' : ''
			}`}
			style={styles}
		>
			{children}
		</div>
	);
};

export default Container;
