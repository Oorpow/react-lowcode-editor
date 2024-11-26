import { FunctionComponent, PropsWithChildren } from 'react';
import { useMaterialDrop } from '@/hooks/useMaterialDrop';

export interface CommonComponentProps {
	id: number;
	name: string;
	[key: string]: any;
}

interface PageProps extends CommonComponentProps{}

const Page: FunctionComponent<PropsWithChildren<PageProps>> = ({
	children,
	id,
	name,
}) => {
	const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id)

	return (
		<div
			data-component-id={id}
			data-component-name={name}
			ref={drop}
			className={`box-border h-full p-6 ${canDrop ? 'border-2 border-blue-400' : 'border-none'}`}
		>
			{children}
		</div>
	);
};

export default Page;
