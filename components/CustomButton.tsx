'use client'

import { useDropzone } from '@/context/ConversionContext'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React from 'react'

type CustomButtonProps = {
    label: string | JSX.Element
    className?: string
    variant?: 'success' | 'danger' | 'outline' | ''
    onClick?: () => void
    disabled?: boolean
    icon?: LucideIcon
    id?: string
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    variant,
    onClick,
    disabled,
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'flex flex-row items-center justify-center gap-x-2 xmd:h-12 h-14 tracking-wide text-xl capitalize font-medium rounded-lg bg-neutral-100 border-none outline-none hover:opacity-90 text-neutral-900 focus:outline-none w-full transition-all duration-250',
                className,
                variant === 'success' &&
                    'bg-green-500 text-white hover:opacity-90 focus:opacity-90 animate-pulse duration-[2000] ease-in-out',
                variant === 'danger' &&
                    'bg-red-500 text-white hover:opacity-90 focus:opacity-90',
                variant === 'outline' &&
                    'border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-100 focus:bg-neutral-100'
            )}
        >
            {
                // If icon is provided, render it
                Icon && <Icon className="w-5 h-5" />
            }
            {label}
        </button>
    )
}
