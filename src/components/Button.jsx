export function Button(props) {
  const { 
    children, 
    title, 
    className, 
    onClick 
  } = props;
  return (
    <div className="__button">
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