import { create } from 'zustand';
import Container from '../materials/Container';
import Button from '../materials/Button';
import Page from '../materials/Page';

export interface ComponentConfig {
	name: string;
	defaultProps: Record<string, any>;
	component: any;
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
            defaultProps: {},
            component: Page
        },
		Container: {
			name: 'Container',
			defaultProps: {},
			component: Container,
		},
		Button: {
			name: 'Button',
			defaultProps: {
				type: 'primary',
				text: 'Button',
			},
			component: Button,
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
