import { CSSProperties, FunctionComponent, useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { debounce } from 'lodash-es';
import StyleToObject from 'style-to-object';

import {
	ComponentSetter,
	useComponentConfigStore,
} from '@/editor/stores/component-config';
import { useComponentsStore } from '@/editor/stores/components';
import CssEditor from './CssEditor';

interface ComponentStyleProps {}

const ComponentStyle: FunctionComponent<ComponentStyleProps> = () => {
	const [form] = Form.useForm();
	const { currentComponentId, currentComponent, updateComponentStyles } =
		useComponentsStore();
	const { componentConfig } = useComponentConfigStore();

	// 选中的组件发生变化时，将props设置到表单回显数据
	useEffect(() => {
		// 切换选中组件时，清空表单
		form.resetFields();
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

	/** 用户输入CSS样式后（防抖处理），存储到store中，由于change事件拿到的是CSS字符串，store需要的是对象，用style-to-object转换处理 */
	const handleCssEditorChange = debounce((value) => {
		const css: Record<string, any> = {};
		try {
			// 只保留中间的样式部分，不需要样式名、{}
			const cssStr = value
				.replace(/\/\*.*\*\//, '') // 去掉注释 /** */
				.replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
				.replace('}', ''); // 去掉 }

			// 将短横线样式，转为驼峰
			StyleToObject(cssStr, (name, value) => {
				css[
					name.replace(/-\w/, (item) =>
						item.toUpperCase().replace('-', '')
					)
				] = value;
			});
			// console.log(form.getFieldsValue(), css);
			updateComponentStyles(
				currentComponentId,
				{ ...form.getFieldsValue(), ...css },
				true
			);
		} catch (error) {
			console.log('css change error', error);
		}
	}, 1000);

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
			<div className=" h-[200px] border border-gray-300">
				<CssEditor
					value={`.comp{\n\n}`}
					onChange={handleCssEditorChange}
				/>
			</div>
		</Form>
	);
};

export default ComponentStyle;
