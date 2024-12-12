import { create } from 'zustand';
import Container from '../materials/Container';
import Button from '../materials/Button';
import Page from '../materials/Page';
import ProdContainer from '../materials/Container/prod.tsx'
import ProdButton from '../materials/Button/prod.tsx'
import ProdPage from '../materials/Page/prod.tsx'

export interface ComponentSetter {
	name: string;
	label: string;
	type: string;
	[key: string]: any
}

export interface ComponentConfig {
	name: string;
	description: string;
	defaultProps: Record<string, any>;
	setter?: ComponentSetter[]
	stylesSetter?: ComponentSetter[]
	// 区分编辑情况、预览状态
	dev: any
	prod: any
}

interface State {
	componentConfig: {
        // key组件名 value组件配置
		[key: string]: ComponentConfig;
	};
}

interface Action {
	registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
	componentConfig: {
        Page: {
            name: 'Page',
			description: '页面',
            defaultProps: {},
            // component: Page,
			dev: Page,
			prod: ProdPage
        },
		Container: {
			name: 'Container',
			description: '容器',
			defaultProps: {},
			// component: Container,
			dev: Container,
			prod: ProdContainer
		},
		Button: {
			name: 'Button',
			description: '按钮',
			defaultProps: {
				type: 'primary',
				text: 'Button',
			},
			// component: Button,
			dev: Button,
			prod: ProdButton,
			setter: [
				{
					name: 'type',
					label: '按钮类型',
					type: 'select',
					options: [
						{ label: '主要', value: 'primary' },
						{ label: '次要', value: 'default' },
					]
				},
				{
					name: 'text',
					label: '按钮文本',
					type: 'input',
				}
			],
			stylesSetter: [
				{
					name: 'width',
					label: '宽度',
					type: 'inputNumber'
				},
				{
					name: 'height',
					label: '高度',
					type: 'inputNumber'
				}
			]
		},
	},
	registerComponent: (name, componentConfig) =>
		set((state) => {
			return {
				...state,
				componentConfig: {
					...state.componentConfig,
					[name]: componentConfig,
				},
			};
		}),
}));
