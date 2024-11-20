import { createElement, ReactNode, useEffect } from "react";
import { Component, useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";

function EditArea() {
	const { components, addComponent } = useComponentsStore()
	const { componentConfig } = useComponentConfigStore()

	useEffect(() => {
		addComponent({
			id: 2,
			name: 'Container',
			props: {},
			children: [],
		}, 1)
	}, [])

	function renderComponents(components: Component[]): ReactNode {
		return components.map((comp: Component) => {
			const config = componentConfig?.[comp.name]

			if (!config.component) {
				return null
			}

			return createElement(config.component, {
				key: comp.id,
				id: comp.id,
				name: comp.name,
				...config.defaultProps,
				...comp.props
			}, renderComponents(comp.children || []))
		})
	}

	return <div className="h-full">
		{/* <pre>
			{
				JSON.stringify(components, null, 2)
			}
		</pre> */}
		{ renderComponents(components) }
	</div>;
}

export default EditArea;
