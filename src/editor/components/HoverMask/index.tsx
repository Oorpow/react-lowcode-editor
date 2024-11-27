import {
	getComponentById,
	useComponentsStore,
} from '@/editor/stores/components';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

interface HoverMaskProps {
	portalWrapperClassName: string;
	containerClassName: string;
	componentId: number;
}

function HoverMask({
	containerClassName,
	portalWrapperClassName,
	componentId,
}: HoverMaskProps) {
	const [position, setPosition] = useState({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		labelTop: 0,
		labelLeft: 0,
	});

	const { components } = useComponentsStore();

	function updatePosition() {
		if (!componentId) return;

		const container = document.querySelector(`.${containerClassName}`);
		if (!container) return;

		const node = document.querySelector(
			`[data-component-id="${componentId}"]`
		);
		if (!node) return;

		const { top, left, width, height } = node.getBoundingClientRect();
		const { top: containerTop, left: containerLeft } =
			container.getBoundingClientRect();

		let labelTop = top - containerTop + container.scrollTop;
		const labelLeft = left - containerLeft + width;

		if (labelTop <= 0) {
			labelTop -= -20;
		}

		setPosition({
			top: top - containerTop + container.scrollTop,
			left: left - containerLeft + container.scrollTop,
			width,
			height,
			labelTop,
			labelLeft,
		});
	}

	const el = useMemo(() => {
		return document.querySelector(`.${portalWrapperClassName}`)!;
	}, []);

	const curComponent = useMemo(() => {
		return getComponentById(componentId, components);
	}, [componentId]);

	useEffect(() => {
		updatePosition();
	}, [componentId]);

	useEffect(() => {
		updatePosition();
	}, [components]);

	return createPortal(
		<>
			<div
				className="box-border absolute border-2 border-blue-400 pointer-events-none "
				style={{
					left: position.left,
					top: position.top,
					backgroundColor: 'rgba(0, 0, 255, 0.05)',
					width: position.width,
					height: position.height,
					zIndex: 12,
				}}
			/>
			<div
				className="absolute -translate-x-full -translate-y-full "
				style={{
					left: position.labelLeft,
					top: position.labelTop,
					zIndex: 13,
					display:
						!position.width || position.width < 10
							? 'none'
							: 'inline',
				}}
			>
				<div
                    className='px-2 text-sm text-white bg-blue-500 border-4 cursor-pointer whitespace-nowrap'
				>
					{curComponent?.description}
				</div>
			</div>
		</>,
		el
	);
}

export default HoverMask;
