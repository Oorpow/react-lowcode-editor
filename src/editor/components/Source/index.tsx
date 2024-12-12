import { FunctionComponent } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useComponentsStore } from '@/editor/stores/components';

interface SourceProps {}

const Source: FunctionComponent<SourceProps> = () => {
	const { components } = useComponentsStore();

	const handleEditorMount: OnMount = (editor, monaco) => {
		// 支持使用cmd + J来进行格式化
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
			editor.getAction('editor.action.formatDocument')?.run();
		});
	};

	return (
		<MonacoEditor
            height='100%'
			language="json"
			path="components.json"
			value={JSON.stringify(components, null, 2)}
			onMount={handleEditorMount}
			options={{
				fontSize: 14,
				scrollBeyondLastLine: false,
				minimap: {
					enabled: false,
				},
				scrollbar: {
					verticalScrollbarSize: 6,
					horizontalScrollbarSize: 6,
				},
			}}
		/>
	);
};

export default Source;
