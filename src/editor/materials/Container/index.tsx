import { FunctionComponent, PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';
import { useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';

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
	const { componentConfig } = useComponentConfigStore();
	const { addComponent } = useComponentsStore();

	const [{ canDrop }, drop] = useDrop(() => {
		return {
			accept: ['Button', 'Container'],
			drop: (item: { type: string }, monitor) => {
				// 防止同时触发其它组件的drop
				if (monitor.didDrop()) return;

				const props = componentConfig[item.type].defaultProps;
				addComponent(
					{
						id: new Date().getTime(),
						name: item.type,
						props,
					},
					id
				);
			},
			collect: (monitor) => ({
				canDrop: monitor.canDrop(),
			}),
		};
	});

	return (
		<div ref={drop} className="border min-h-[100px] p-5">
			{children}
		</div>
	);
};

export default Container;
