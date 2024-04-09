import { Link } from "react-router-dom";

type Props = {
    to: string,
    bg: string,
    text: string,
    textColor: string,
    onClick?:() => Promise<void>
}



function NavigationLink(props: Props) {
    return (
        <Link className='nav-link' style={{background: props.bg, color: props.textColor}} to={props.to}>{props.text}</Link>
    );
}

export default NavigationLink;