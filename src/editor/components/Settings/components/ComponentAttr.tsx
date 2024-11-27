import { FunctionComponent, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import {
	ComponentConfig,
	ComponentSetter,
	useComponentConfigStore,
} from '@/editor/stores/component-config';
import { useComponentsStore } from '@/editor/stores/components';

interface ComponentAttrProps {}

const ComponentAttr: FunctionComponent<ComponentAttrProps> = () => {
	const [form] = Form.useForm();
	const { currentComponentId, currentComponent, updateComponentProps } =
		useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	// 选中的组件发生变化时，将props设置到表单回显数据
	useEffect(() => {
		const data = form.getFieldsValue();
		form.setFieldsValue({
			...data,
			...currentComponent?.props,
		});
	}, [currentComponent]);

	if (!currentComponent || !currentComponentId) return null;

	function renderFormElement(setting: ComponentSetter) {
		const { type, options } = setting;

		if (type === 'select') {
			return <Select options={options} />;
		} else if (type === 'input') {
			return <Input />;
		}
	}

	/** 表单值发生变化时，更新到store中 */
	function handleValueChange(changeValues: ComponentConfig) {
		if (currentComponentId) {
			updateComponentProps(currentComponentId, changeValues);
		}
	}

	return (
		<Form
			form={form}
			onValuesChange={handleValueChange}
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 14 }}
		>
			<Form.Item label="组件id">
				<Input value={currentComponent.id} disabled />
			</Form.Item>
			<Form.Item label="组件名称">
				<Input value={currentComponent.name} disabled />
			</Form.Item>
			<Form.Item label="组件描述">
				<Input value={currentComponent.description} disabled />
			</Form.Item>
			{componentConfig[currentComponent.name].setter?.map((setting) => {
				return (
					<Form.Item
						key={setting.name}
						name={setting.name}
						label={setting.label}
					>
						{renderFormElement(setting)}
					</Form.Item>
				);
			})}
		</Form>
	);
};

export default ComponentAttr;
