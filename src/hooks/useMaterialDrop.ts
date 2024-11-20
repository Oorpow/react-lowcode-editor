import { useDrop } from "react-dnd"
import { useComponentConfigStore } from "../editor/stores/component-config"
import { useComponentsStore } from "../editor/stores/components"

export const useMaterialDrop = (accept: string[], id: number) => {
    const { addComponent } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore()

    const [{ canDrop }, drop] = useDrop(() => {
        return {
            accept,
            drop: (item: { type: string }, monitor) => {
                if (monitor.didDrop()) return

                const props = componentConfig[item.type].defaultProps
                addComponent({
                    id: new Date().getTime(),
                    name: item.type,
                    props
                }, id)
            },
            collect: (monitor) => ({
                canDrop: monitor.canDrop()
            })
        }
    })

    return { canDrop, drop }
}