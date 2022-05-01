import React from 'react';

interface Props {
	headlineText: string;
	note?: string;
	scale: number;
	subheadText?: string;
}

const Banner: React.FC<Props> = (props: Props) => {
	return (
		<div
			style={{
				height: '135px',
				left: '4%',
				position: 'absolute',
				top: '5%',
				transform: `scale(${props.scale})`,
				transformOrigin: 'top left',
				width: '1750px',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					backgroundColor: 'white',
					height: '100%',
					left: '-12px',
					position: 'absolute',
					top: 0,
					width: '8px',
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
						fontSize: props.subheadText ? '75px' : '80px',
						fontWeight: 800,
						left: props.subheadText ? '20px' : '30px',
						position: 'absolute',
						textTransform: 'uppercase',
						top: props.subheadText ? '-12px' : '13px',
						width: '100%',
					}}
				>
					{props.headlineText}
				</div>
				{!props.subheadText ? null : (
					<div
						style={{
							background:
								'linear-gradient(180deg, rgba(212,225,228,1) 0%, rgba(186,198,200,1) 100%)',
							bottom: 0,
							color: '#112757',
							fontSize: '50px',
							lineHeight: 1.1,
							paddingLeft: '20px',
							position: 'absolute',
							textTransform: 'uppercase',
							width: '100%',
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span style={{ fontWeight: 500 }}>{props.subheadText}</span>
						</div>
					</div>
				)}
				<span
					style={{
						bottom: props.subheadText ? 0 : '38px',
						fontFamily: 'CNN',
						fontSize: '40px',
						fontWeight: 500,
						opacity: 0.7,
						position: 'absolute',
						right: '15px',
					}}
				>
					{props.note || null}
				</span>
			</div>
		</div>
	);
};
export default Banner;
