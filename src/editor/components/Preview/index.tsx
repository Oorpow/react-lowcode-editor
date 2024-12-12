import React, { FunctionComponent } from "react";
import {Component, useComponentsStore} from "@/editor/stores/components.tsx";
import {useComponentConfigStore} from "@/editor/stores/component-config.tsx";

interface PreviewProps {
    
}
 
const Preview: FunctionComponent<PreviewProps> = () => {
    const { components } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore()

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]
            if (!config?.prod) {
                return null
            }

            return React.createElement(config.prod, {
                key: component.id,
                id: component.id,
                name: component.name,
                styles: component.styles,
                ...config.defaultProps,
                ...component.props,
            }, renderComponents((component.children) || []))
        })
    }

    return <div>
        { renderComponents(components) }
    </div>;
}
 
export default Preview;