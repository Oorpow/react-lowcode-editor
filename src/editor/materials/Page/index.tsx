import { message } from 'antd';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';
import { useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';

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
	const { componentConfig } = useComponentConfigStore();
	const { addComponent } = useComponentsStore();

	const [{ canDrop }, drop] = useDrop(() => {
		return {
			// 能够接收的组件类型
			accept: ['Button', 'Container'],
			// drop时，显示传递过来的item数据
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
				console.log(id);

				message.success(item.type);
			},
			collect: (monitor) => ({
				canDrop: monitor.canDrop(),
			}),
		};
	});

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
