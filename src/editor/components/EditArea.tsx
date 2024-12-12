import {
	createElement,
	MouseEventHandler,
	ReactNode,
	useState,
} from 'react';
import { Component, useComponentsStore } from '../stores/components';
import { useComponentConfigStore } from '../stores/component-config';
import HoverMask from './HoverMask';
import SelectedMask from './SelectedMask';

function EditArea() {
	const [hoverComponentId, setHoverComponentId] = useState<number>();

	const {
		components,
		currentComponentId,
		setCurrentComponentId,
	} = useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	function renderComponents(components: Component[]): ReactNode {
		return components.map((comp: Component) => {
			const config = componentConfig?.[comp.name];

			if (!config.dev) {
				return null;
			}

			return createElement(
				config.dev,
				{
					key: comp.id,
					id: comp.id,
					name: comp.name,
					styles: comp.styles,
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
		const target = (e.target as HTMLElement).closest('[data-component-id]');
		if (target) {
			const componentId = target.getAttribute('data-component-id');
			if (componentId) {
				setHoverComponentId(+componentId);
			}
		}
	};

	const handleClick: MouseEventHandler = (e) => {
		const target = (e.target as HTMLElement).closest('[data-component-id]');
		if (target) {
			const componentId = target.getAttribute('data-component-id');
			if (componentId) {
				setCurrentComponentId(+componentId);
			}
		}
	};

	return (
		<div
			className="h-full edit-area"
			onMouseOver={handleMouseOver}
			onMouseLeave={() => {
				setHoverComponentId(undefined);
			}}
			onClick={handleClick}
		>
			{/* 防止hover框跟click框重合 */}
			{hoverComponentId && hoverComponentId !== currentComponentId && (
				<HoverMask
					componentId={hoverComponentId}
					containerClassName="edit-area"
					portalWrapperClassName="portal-wrapper"
				/>
			)}
			{currentComponentId && (
				<SelectedMask
					componentId={currentComponentId}
					containerClassName="edit-area"
					portalWrapperClassName="portal-wrapper"
				/>
			)}
			{renderComponents(components)}
			<div className="portal-wrapper"></div>
		</div>
	);
}

export default EditArea;
