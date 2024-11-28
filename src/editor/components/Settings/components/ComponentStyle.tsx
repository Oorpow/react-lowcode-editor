import { CSSProperties, FunctionComponent, useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import {
	ComponentSetter,
	useComponentConfigStore,
} from '@/editor/stores/component-config';
import { useComponentsStore } from '@/editor/stores/components';

interface ComponentStyleProps {}

const ComponentStyle: FunctionComponent<ComponentStyleProps> = () => {
	const [form] = Form.useForm();
	const { currentComponentId, currentComponent, updateComponentStyles } =
		useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	// 选中的组件发生变化时，将props设置到表单回显数据
	useEffect(() => {
		const data = form.getFieldsValue();
		form.setFieldsValue({
			...data,
			...currentComponent?.styles,
		});
	}, [currentComponent]);

	if (!currentComponent || !currentComponentId) return null;

	function renderFormElement(setting: ComponentSetter) {
		const { type, options } = setting;

		if (type === 'select') {
			return <Select options={options} />;
		} else if (type === 'input') {
			return <Input />;
		} else if (type === 'inputNumber') {
			return <InputNumber />;
		}
	}

	/** 表单值发生变化时，更新到store中 */
	function handleValueChange(changeValues: CSSProperties) {
		if (currentComponentId) {
			updateComponentStyles(currentComponentId, changeValues);
		}
	}

	return (
		<Form
			form={form}
			onValuesChange={handleValueChange}
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 14 }}
		>
			{componentConfig[currentComponent.name].stylesSetter?.map(
				(setting) => {
					return (
						<Form.Item
							key={setting.name}
							name={setting.name}
							label={setting.label}
						>
							{renderFormElement(setting)}
						</Form.Item>
					);
				}
			)}
		</Form>
	);
};

export default ComponentStyle;
