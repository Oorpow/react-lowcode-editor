import { FunctionComponent, PropsWithChildren } from 'react';

interface PageProps {}

const Page: FunctionComponent<PropsWithChildren<PageProps>> = ({
	children,
}) => {
	return <div className="p-6 h-full box-border">{children}</div>;
};

export default Page;
