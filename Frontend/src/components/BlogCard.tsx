interface BlogCardPros {
    authorName : string,
    title : string,
    content : string,
    publishedDate : string
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
} : BlogCardPros) => {
    
    return (
        
        <div className="cursor-pointer m-5">
        <div className="flex items-center">
        <div className="mx-3">
           <Avtar  authorName={authorName}></Avtar>
        </div>
        <div className="flex items-center">
        <div className="text-sm text-slate-400">{authorName}</div>
        <div className="text-slate-400">&nbsp;&middot;&nbsp;</div>
        <div className="text-sm text-slate-400">{publishedDate}</div>
        </div>
        
        </div>
        
        <div className="text-xl font-semibold ml-3 pt-2">
           {title}
        </div>
        <div className="text-sm font-thin text-slate-500 ml-3">
            {content.length >= 185 ? content.slice(0,185) + "..." : content.slice(0,100)}
        </div>
        <div className="text-slate-500 text-sm text-thin ml-3 pt-2">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
        <div className="pt-3"><hr /></div>
        
        </div>
        
       
    )
}

function Avtar ({authorName} : {authorName : string}) {
    return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
  {authorName ? (
    `${authorName.charAt(0).toUpperCase()}${authorName.split(" ")[1] ? authorName.split(" ")[1].charAt(0).toUpperCase() : ''}`
  ) : (
    ''
  )}
</span>
    </div>
    )
}