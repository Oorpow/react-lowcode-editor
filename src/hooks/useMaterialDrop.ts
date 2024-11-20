import { useDrop } from "react-dnd"
import { useComponentConfigStore } from "../editor/stores/component-config"
import { useComponentsStore } from "../editor/stores/components"

/**
 * 物料区组件Drop到编辑区的逻辑
 * @param accept 接收的组件类型数组
 * @param id 
 * @returns 
 */
export const useMaterialDrop = (accept: string[], id: number) => {
    const { addComponent } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore()

    const [{ canDrop }, drop] = useDrop(() => {
        return {
            accept,
            drop: (item: { type: string }, monitor) => {
                // 防止drop重复执行
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