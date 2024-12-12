import {useComponentsStore} from "@/editor/stores/components.tsx";
import {Button, Space} from "antd";

function EditorHeader() {
    const { mode, setMode, setCurrentComponentId } = useComponentsStore()

    return <div className="w-full h-full">
        <div className="h-[50px] flex justify-between items-center px-5">
            <h1>Lowcode Editor</h1>
            <Space>
                {
                    mode === 'edit' && <Button type={"primary"} onClick={() => {
                        setMode('preview')
                        setCurrentComponentId(null)
                    }}>Preview</Button>
                }
                {
                    mode === 'preview' && <Button onClick={() => {
                        setMode('edit')
                    }}>Back To Edit</Button>
                }
            </Space>
        </div>
    </div>;
}

export default EditorHeader;