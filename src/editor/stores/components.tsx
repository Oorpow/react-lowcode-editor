import { CSSProperties } from 'react';
import { create } from 'zustand';

export interface Component {
	id: number;
	name: string;
	props: any;
	description: string;
	styles?: CSSProperties;
	children?: Component[];
	parentId?: number;
}

// store
interface State {
	// 组件树（使用children连接起来的树形结构）
	components: Component[];
	currentComponentId?: number | null;
	currentComponent: Component | null;
}

// 操作组件树的方法
interface Action {
	addComponent: (component: Component, parentId: number) => void;
	removeComponent: (componentId: number) => void;
	updateComponentProps: (componentId: number, props: any) => void;
	setCurrentComponentId: (componentId: number | null) => void;
	updateComponentStyles: (componentId: number, styles: CSSProperties, isReplace?: boolean) => void;
}

/**
 * DFS，根据id查找对应组件，若未找到则返回null
 * @param id
 * @param components
 * @returns
 */
export function getComponentById(
	id: number | null,
	components: Component[]
): Component | null {
	if (!id) return null;

	for (const component of components) {
		if (component.id == id) return component;
		if (component.children && component.children.length > 0) {
			const result = getComponentById(id, component.children);
			if (result !== null) return result;
		}
	}
	return null;
}

export const useComponentsStore = create<State & Action>((set, get) => {
	return {
		// 包含一个名为Page的根组件
		components: [
			{
				id: 1,
				name: 'Page',
				props: {},
				description: '页面',
			},
		],
		currentComponentId: null,
		currentComponent: null,
		// 向组件树添加新组件，若提供了parentId，则将新组件添加到父组件的children，否则添加到根组件列表中
		addComponent: (component, parentId) =>
			set((state) => {
				if (parentId) {
					const parentComponent = getComponentById(
						parentId,
						state.components
					);
					if (parentComponent) {
						if (parentComponent.children) {
							parentComponent.children.push(component);
						} else {
							parentComponent.children = [component];
						}
					}
					component.parentId = parentId;
					return {
						components: [...state.components],
					};
				}

				return {
					components: [...state.components, component],
				};
			}),
		// 从组件树中移除指定组件，如果将被移除的组件存在父组件，则找到其父组件，并从它的children中移除掉
		removeComponent: (componentId) => {
			if (!componentId) return;
			const component = getComponentById(componentId, get().components);
			if (component?.parentId) {
				const parentComponent = getComponentById(
					component.parentId,
					get().components
				);
				if (parentComponent) {
					parentComponent.children = parentComponent.children?.filter(
						(child) => child.id !== componentId
					);
				}
				set({
					components: [...get().components],
				});
			}
		},
		// 查找指定组件，并更新其props
		updateComponentProps: (componentId, props) =>
			set((state) => {
				const component = getComponentById(
					componentId,
					state.components
				);
				if (component) {
					component.props = { ...component.props, ...props };
					return {
						components: [...state.components],
					};
				}

				return {
					components: [...state.components],
				};
			}),
		// click选中编辑区组件时，要展示编辑框，还要在右侧属性区展示对应组件的属性，因此需要保存在全局的state中
		setCurrentComponentId: (componentId) =>
			set((state) => {
				return {
					currentComponentId: componentId,
					currentComponent: getComponentById(
						componentId,
						state.components
					),
				};
			}),
		updateComponentStyles: (componentId, styles, isReplace) =>
			set((state) => {
				const component = getComponentById(
					componentId,
					state.components
				);
				if (component) {
					// BUG: 当用户在CSS编辑器中输入样式更改组件样式后，再去删除样式，组件的样式不会恢复
					// 原因: 👇🏻更新时，新的styles和原来的styles合并了，因此删除样式后，依然有之前的样式
					// component.styles = { ...component.styles, ...styles };
					component.styles = isReplace ? { ...styles } : { ...component.styles, ...styles };
					return {
						components: [...state.components],
					};
				}

				return {
					components: [...state.components],
				};
			}),
	};
});
