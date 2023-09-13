import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, forwardedRef) => {
    const { children, className, ...rest } = props // get the children of the props
    return (
        <div
            ref={forwardedRef}
            className={cn(
                'py-1 px-2 border rounded text-sm italic w-full h-full flex items-center justify-center',
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )
})

Badge.displayName = 'Badge'
export default Badge
export type { BadgeProps }
