import { FunctionComponent, PropsWithChildren } from 'react';

interface ContainerProps {}

const Container: FunctionComponent<PropsWithChildren<ContainerProps>> = ({
	children,
}) => {
	return <div className="border min-h-[100px] p-5">{children}</div>;
};

export default Container;
