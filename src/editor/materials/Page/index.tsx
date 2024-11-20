import { FunctionComponent, PropsWithChildren } from 'react';
import { useMaterialDrop } from '../../../hooks/useMaterialDrop';

interface PageProps {
	id: number;
	name: string;
	[key: string]: any;
}

const Page: FunctionComponent<PropsWithChildren<PageProps>> = ({
	children,
	id,
	name,
}) => {
	const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id)

	return (
		<div
			ref={drop}
			className="p-6 h-full box-border"
			style={{ border: canDrop ? '2px solid blue' : 'none' }}
		>
			{children}
		</div>
	);
};

export default Page;
