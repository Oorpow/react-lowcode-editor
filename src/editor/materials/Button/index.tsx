import { FunctionComponent } from "react";
import { Button as AntdButton } from 'antd';
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../Page";

interface ButtonProps extends CommonComponentProps {
    type: ButtonType;
    text: string;
}

const Button: FunctionComponent<ButtonProps> = ({ id, type, text, styles }) => {
    return <AntdButton data-component-id={id} type={type} style={styles}>{text}</AntdButton>;
}

export default Button;