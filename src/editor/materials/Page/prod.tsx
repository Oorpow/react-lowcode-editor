import React, {
	CSSProperties,
	FunctionComponent,
	PropsWithChildren,
} from 'react';

export interface CommonComponentProps {
	id: number;
	name: string;
	styles?: CSSProperties;
	[key: string]: any;
}

interface PageProps extends CommonComponentProps {}

const Page: FunctionComponent<PropsWithChildren<PageProps>> = ({
	children,
	styles,
}) => {
	return (
		<div className="p-5" style={{ ...styles }}>
			{children}
		</div>
	);
};

export default Page;
