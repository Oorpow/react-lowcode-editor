import { FunctionComponent } from 'react';
import MonacoEditor, { OnMount, EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface CssEditorProps {
	value: string;
	onChange?: EditorProps['onChange'];
	options?: editor.IStandaloneEditorConstructionOptions;
}

const CssEditor: FunctionComponent<CssEditorProps> = ({
	value,
	onChange,
	options,
}) => {
	const editorOptions: editor.IStandaloneEditorConstructionOptions = {
		fontSize: 14,
		scrollBeyondLastLine: false,
		minimap: {
			enabled: false,
		},
		scrollbar: {
			verticalScrollbarSize: 6,
			horizontalScrollbarSize: 6,
		},
		...options,
	};

	const handleOnMount: OnMount = (editor, monaco) => {
		// 支持使用cmd + J来进行格式化
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
			editor.getAction('editor.action.formatDocument')?.run();
		});
	};

	return (
		<MonacoEditor
			path="component.css"
			height={'100%'}
			options={editorOptions}
			language="css"
			value={value}
			onMount={handleOnMount}
			onChange={onChange}
		/>
	);
};

export default CssEditor;
