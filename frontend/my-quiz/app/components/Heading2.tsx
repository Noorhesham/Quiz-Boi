
const Heading2 = ({className,title,text,tag}:{className?:string,title?:string,text?:string,tag?:string}) => {
  return (
    <div className={`${className||""} max-w-[50rem] mx-auto mb-12 lg:mb-20`}>
      {/* {tag&& <TagLine className="mb-4 md:justify-center">{tag}</TagLine>} */}
      {title&&<h2 className="h2">{title}</h2>}
      {text&&<p className="body-2 mt-4 text-gray-400">{text}</p>}
    </div>
  )
}

export default Heading2
