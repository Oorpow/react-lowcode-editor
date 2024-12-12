import { useComponentsStore } from '@/editor/stores/components';
import { FunctionComponent } from 'react';
import { Tree } from 'antd';

interface OutlineProps {}

const Outline: FunctionComponent<OutlineProps> = () => {
	const { components, setCurrentComponentId } = useComponentsStore();

	return (
		<Tree
			showLine
			defaultExpandAll
			fieldNames={{ title: 'description', key: 'id' }}
			treeData={components as any}
			onSelect={([selectedKey]) => {
				setCurrentComponentId(selectedKey as number);
			}}
		/>
	);
};

export default Outline;
