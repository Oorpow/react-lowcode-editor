import {
	createElement,
	MouseEventHandler,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { Component, useComponentsStore } from '../stores/components';
import { useComponentConfigStore } from '../stores/component-config';
import HoverMask from './HoverMask';

function EditArea() {
	const [hoverComponentId, setHoverComponentId] = useState<number>();

	const { components, addComponent } = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	useEffect(() => {
		addComponent(
			{
				id: 2,
				name: 'Container',
				props: {},
				children: [],
			},
			1
		);
	}, []);

	function renderComponents(components: Component[]): ReactNode {
		return components.map((comp: Component) => {
			const config = componentConfig?.[comp.name];

			if (!config.component) {
				return null;
			}

			return createElement(
				config.component,
				{
					key: comp.id,
					id: comp.id,
					name: comp.name,
					...config.defaultProps,
					...comp.props,
				},
				renderComponents(comp.children || [])
			);
		});
	}

	// 获取data-component-id
	const handleMouseOver: MouseEventHandler = (e) => {
		// 无遍历获取data-component-id方式
		const target = (e.target as HTMLElement).closest('[data-component-id]')
		if (target) {
			const componentId = target.getAttribute('data-component-id');
			if (componentId) {
				setHoverComponentId(+componentId);
			}
		}
		// const path = e.nativeEvent.composedPath();
		// for (let i = 0; i < path.length; i += 1) {
		// 	const el = path[i] as HTMLElement;
		// 	// 取出material组件里的自定义属性data-component-id
		// 	const componentId = el.dataset.componentId;
		// 	if (componentId) {
		// 		setHoverComponentId(+componentId);
		// 		return;
		// 	}
		// }
	};

	return (
		<div
			className="h-full edit-area"
			onMouseOver={handleMouseOver}
			onMouseLeave={() => {
				setHoverComponentId(undefined);
			}}
		>
			{hoverComponentId && (
				<HoverMask
					componentId={hoverComponentId}
					containerClassName="edit-area"
					portalWrapperClassName="portal-wrapper"
				/>
			)}
			{renderComponents(components)}
			<div className='portal-wrapper'></div>
		</div>
	);
}

export default EditArea;
