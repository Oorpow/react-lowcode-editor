import { FunctionComponent, PropsWithChildren } from 'react';
import { useMaterialDrop } from '../../../hooks/useMaterialDrop';

interface ContainerProps {
	id: number;
	name: string;
	[key: string]: any;
}

const Container: FunctionComponent<PropsWithChildren<ContainerProps>> = ({
	children,
	id,
	name,
}) => {
	const { drop } = useMaterialDrop(['Button', 'Container'], id)

	return (
		<div ref={drop} className="border min-h-[100px] p-5">
			{children}
		</div>
	);
};

export default Container;
