import { FunctionComponent, useMemo } from 'react';
import { useComponentConfigStore } from '../stores/component-config';
import { useDrag } from 'react-dnd';

interface MaterialItemProps {
	name: string;
}

export const MaterialItem: FunctionComponent<MaterialItemProps> = ({
	name,
}) => {
	const [_, drag] = useDrag({
		type: name,
		item: {
			type: name,
		},
	});

	return (
		<div
			ref={drag}
			className="border-dashed border p-6 m-6 cursor-move inline-block bg-white hover:bg-slate-500"
		>
			{name}
		</div>
	);
};

function Material() {
	const { componentConfig } = useComponentConfigStore();

	const components = useMemo(() => {
		return Object.values(componentConfig);
	}, [componentConfig]);

	return (
		<div>
			{components.map((comp, idx) => {
				return <MaterialItem name={comp.name} key={comp.name + idx} />;
			})}
		</div>
	);
}

export default Material;
