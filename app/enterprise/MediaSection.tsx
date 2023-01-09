type iProjectionProps = {
    title: string
    subTitle: string,
    description: string
}


const MediaSection: React.FC<iProjectionProps> = ({ title, subTitle, description }) => {
    return (
        <div className="ml-[22px] mr-[22px]">
            <div dangerouslySetInnerHTML={{ __html: title }} />
            <div dangerouslySetInnerHTML={{ __html: subTitle }} />
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

export default MediaSection