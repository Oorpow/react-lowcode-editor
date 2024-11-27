import { FunctionComponent, useMemo } from 'react';
import { useComponentConfigStore } from '../stores/component-config';
import { useDrag } from 'react-dnd';

interface MaterialItemProps {
	name: string;
	description: string;
}

export const MaterialItem: FunctionComponent<MaterialItemProps> = ({
	name,
	description
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
			className="inline-block p-6 m-6 bg-white border border-dashed cursor-move hover:bg-slate-500"
		>
			{description}
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
				return <MaterialItem name={comp.name} description={comp.description} key={comp.name + idx} />;
			})}
		</div>
	);
}

export default Material;
