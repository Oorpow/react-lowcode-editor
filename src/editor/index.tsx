import Material from './components/Material';
import EditArea from './components/EditArea';
import EditorHeader from './components/EditorHeader';
import Settings from './components/Settings';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

const LowcodeEditor = () => {
	return (
		<div className="min-h-screen h-[100vh] flex flex-col">
			<div className='h-[70px] flex items-center border-b border-black'>
                <EditorHeader />
            </div>
			<Allotment>
				<Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
					<Material />
				</Allotment.Pane>
				<Allotment.Pane>
					<EditArea />
				</Allotment.Pane>
				<Allotment.Pane preferredSize={240} maxSize={500} minSize={200}>
					<Settings />
				</Allotment.Pane>
			</Allotment>
		</div>
	);
};

export default LowcodeEditor;
