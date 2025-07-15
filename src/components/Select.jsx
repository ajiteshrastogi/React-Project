import React , {useId} from 'react';

function Select({
    options, // take options as array beacuse by default it is an array 
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='font-semibold text-[var(--accent-blue)] mb-1 pl-1 inline-block'>{label}</label>}
            <select 
                className={`px-4 py-2 rounded-lg bg-[#181824] text-[var(--accent-blue)] border border-[var(--accent-blue)] focus:border-[var(--accent-pink)] outline-none w-full transition-all duration-300 font-sans ${className}`}
                {...props}
                id = {id}
                ref={ref}
                >
                    {options?.map((option) => (
                        <option key={option} value={option} className='bg-[#181824] text-[var(--accent-blue)]'>
                            {option}
                        </option>
                    ))}
                </select>
        </div>
      );
}

export default React.forwardRef(Select);