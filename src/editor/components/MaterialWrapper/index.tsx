import { FunctionComponent, useState } from "react";
import { Segmented } from "antd";
import Material from "../Material";
import Outline from "../Outline";
import Source from "../Source";

interface MaterialWrapperProps {
    
}

const MaterialWrapper: FunctionComponent<MaterialWrapperProps> = () => {
    const [key, setKey] = useState('物料')
    const segmentedOptions = ['物料', '大纲', '源码']

    return <div className="pt-5">
        <Segmented onChange={setKey} block options={segmentedOptions} />
        {
            key === '物料' && <Material />
        }
        {
            key === '大纲' && <Outline />
        }
        {
            key === '源码' && <Source />
        }
    </div>;
}

export default MaterialWrapper;