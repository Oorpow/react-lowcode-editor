import EditArea from './components/EditArea';
import EditorHeader from './components/EditorHeader';
import Settings from './components/Settings';
import MaterialWrapper from './components/MaterialWrapper';
import Preview from "@/editor/components/Preview";

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import {useComponentsStore} from "@/editor/stores/components.tsx";

const LowcodeEditor = () => {
	const { mode } = useComponentsStore()

	return (
		<div className="min-h-screen h-[100vh] flex flex-col">
			<div className='h-[70px] flex items-center border-b border-black'>
                <EditorHeader />
            </div>
			{
				mode === 'edit'
				?
					<Allotment>
						<Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
							<MaterialWrapper />
						</Allotment.Pane>
						<Allotment.Pane>
							<EditArea />
						</Allotment.Pane>
						<Allotment.Pane preferredSize={240} maxSize={500} minSize={200}>
							<Settings />
						</Allotment.Pane>
					</Allotment>
					: <Preview />
			}
		</div>
	);
};

export default LowcodeEditor;
