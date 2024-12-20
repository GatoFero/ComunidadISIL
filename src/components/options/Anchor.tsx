interface AnchorProps {
    onNavigate: () => void;
    textContent: string;
    textPath: string;
}

export function Anchor(
    { onNavigate , textContent, textPath }: AnchorProps
){
    return(
        <span className="anchor">
            <p>{textContent}</p>
            <a onClick={onNavigate}>{textPath}</a>
        </span>
    )
}