import { useState } from 'react';
import { Segmented } from 'antd';
import { useComponentsStore } from '../../stores/components';
import ComponentAttr from './components/ComponentAttr';
import ComponentStyle from './components/ComponentStyle';
import ComponentEvent from './components/ComponentEvent';

function Settings() {
	const { currentComponentId } = useComponentsStore();
	const [key, setKey] = useState('属性');
	const segmentedOptions = ['属性', '样式', '事件'];

	if (!currentComponentId) return null;

	return (
		<div>
			<Segmented
				value={key}
				onChange={setKey}
				block
				options={segmentedOptions}
			/>
			<div className="mt-4">
				{key === '属性' && <ComponentAttr />}
				{key === '样式' && <ComponentStyle />}
				{key === '事件' && <ComponentEvent />}
			</div>
		</div>
	);
}

export default Settings;
