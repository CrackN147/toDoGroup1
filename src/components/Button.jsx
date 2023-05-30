export function Button(props) {
  const { 
    theme,
    children, 
    title, 
    className, 
    onClick 
  } = props;
  return (
    <div className={`__button ${theme}`}>
      <button 
        type="button"
        onClick={onClick}
        className={className}
      >
        {children || title}
      </button>
    </div>
  )
}