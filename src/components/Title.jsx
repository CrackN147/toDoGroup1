export function Title(props) {
  const {type, text, className} = props;
  return (
    <div className="__title">
      {type === "h1" && 
        <h1 className={className}>{text}</h1>
      }
      {type === "h2" && 
        <h2 className={className}>{text}</h2>
      }
      {type === "h3" && 
        <h3 className={className}>{text}</h3>
      }
      {type === "h4" && 
        <h4 className={className}>{text}</h4>
      }
      {type === "h5" && 
        <h5 className={className}>{text}</h5>
      }
      {type === "label" && 
        <label className={className}>{text}</label>
      }
    </div>  
  )
}