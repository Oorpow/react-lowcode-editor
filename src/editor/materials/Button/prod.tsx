import { FunctionComponent } from "react";
import { Button as AntdButton } from 'antd';
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../Page";

interface ButtonProps extends CommonComponentProps {
    type: ButtonType;
    text: string;
}

const ProdButton: FunctionComponent<ButtonProps> = ({ type, text, styles }) => {
    return <AntdButton type={type} style={styles}>{text}</AntdButton>;
}

export default ProdButton;