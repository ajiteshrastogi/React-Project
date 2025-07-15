import React, {useId, forwardRef} from 'react'

const Input = forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 font-semibold text-[var(--accent-blue)]'
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-4 py-2 rounded-lg bg-[#181824] text-[var(--accent-blue)] border border-[var(--accent-blue)] focus:border-[var(--accent-pink)] outline-none w-full transition-all duration-300 font-sans ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input