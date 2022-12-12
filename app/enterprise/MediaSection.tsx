type iProjectionProps = {
    title: string
    subTitle: string,
    description: string
}


const MediaSection: React.FC<iProjectionProps> = ({ title, subTitle, description }) => {
    return (
        <div style={{ marginRight: 22, marginLeft: 22}}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
            <div dangerouslySetInnerHTML={{ __html: subTitle }} />
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

export default MediaSection