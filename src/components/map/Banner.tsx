import React from 'react';

const bannerMaxWidth = 2800;
export const bannerMaxChars = 40;
export const subheadMaxChars = 50;

interface Props {
	headlineText: string;
	note?: string;
	scale: number;
	subheadText?: string;
}

const Banner: React.FC<Props> = (props: Props) => {
	const headlineRef = React.useRef<HTMLSpanElement>(null);
	const subheadRef = React.useRef<HTMLSpanElement>(null);
	const [bannerScale, setBannerScale] = React.useState(1);
	const [subheadScale, setSubheadScale] = React.useState(1);
	const headlineText = props.headlineText.substring(0, bannerMaxChars);
	const subheadText = props.subheadText?.substring(0, subheadMaxChars);
	React.useEffect(() => {
		if (!headlineRef.current) throw new Error('Cannot find headline ref');
		const bannerWidth = headlineRef.current.clientWidth;
		setBannerScale(bannerWidth <= bannerMaxWidth ? 1 : bannerMaxWidth / bannerWidth);
	}, [headlineText]);
	React.useEffect(() => {
		if (!subheadText) return;
		if (!subheadRef.current) throw new Error('Cannot find subhead ref');
		const subheadWidth = subheadRef.current.clientWidth;
		setSubheadScale(subheadWidth <= bannerMaxWidth ? 1 : bannerMaxWidth / subheadWidth);
	}, [subheadText]);
	return (
		<div
			style={{
				height: '270px',
				left: '4%',
				pointerEvents: 'none',
				position: 'absolute',
				top: '5%',
				transform: `scale(${props.scale})`,
				transformOrigin: 'top left',
				width: '3500px',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: 'white',
					height: '100%',
					left: '-24px',
					position: 'absolute',
					top: 0,
					width: '16px',
				}}
			/>
			<div
				style={{
					backgroundColor: 'white',
					fontFamily: 'CNN',
					height: '100%',
					position: 'absolute',
					width: '100%',
				}}
			>
				<div
					style={{
						fontSize: subheadText ? '150px' : '160px',
						fontWeight: 800,
						left: subheadText ? '40px' : '60px',
						position: 'absolute',
						textTransform: 'uppercase',
						top: subheadText ? '-24px' : '26px',
						whiteSpace: 'nowrap',
						width: '100%',
					}}
				>
					<span
						ref={headlineRef}
						style={{
							display: 'inline-block',

							transform: `scale(${bannerScale},1)`,
							transformOrigin: 'left',
						}}
					>
						{headlineText}
					</span>
				</div>
				{!subheadText ? null : (
					<div
						style={{
							background:
								'linear-gradient(180deg, rgba(212,225,228,1) 0%, rgba(186,198,200,1) 100%)',
							bottom: 0,
							color: '#112757',
							fontSize: '100px',
							lineHeight: 1.1,
							paddingLeft: '40px',
							position: 'absolute',
							textTransform: 'uppercase',
							width: '100%',
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span
								ref={subheadRef}
								style={{
									display: 'inline-block',
									fontWeight: 500,
									transform: `scale(${subheadScale},1)`,
									transformOrigin: 'left',
								}}
							>
								{subheadText}
							</span>
						</div>
					</div>
				)}
				<span
					style={{
						bottom: subheadText ? 0 : '76px',
						fontFamily: 'CNN',
						fontSize: '80px',
						fontWeight: 500,
						opacity: 0.7,
						position: 'absolute',
						right: '30px',
					}}
				>
					{props.note || null}
				</span>
			</div>
		</div>
	);
};
export default Banner;
