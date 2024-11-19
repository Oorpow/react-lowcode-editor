import { FunctionComponent } from "react";
import { Button as AntdButton } from 'antd';
import { ButtonType } from "antd/es/button";

interface ButtonProps {
    type: ButtonType;
    text: string;
}

const Button: FunctionComponent<ButtonProps> = ({ type, text }) => {
    return <AntdButton type={type}>{text}</AntdButton>;
}

export default Button;