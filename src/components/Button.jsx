export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-6 py-2 rounded-xl font-semibold uppercase tracking-wide bg-gradient-to-r from-[#23243a] to-[#181824] border border-[var(--accent-blue)] text-[var(--accent-blue)] shadow-md hover:border-[var(--accent-pink)] hover:text-[var(--accent-pink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-2 transition-all duration-300 ${className}`}
            style={{
                fontFamily: 'Poppins, Arial, sans-serif',
            }}
            {...props}
        >
            {children}
        </button>
    );
}