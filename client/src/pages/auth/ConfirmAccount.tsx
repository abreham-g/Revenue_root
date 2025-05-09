import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import logoDark from '@/assets/images/logo-dark.png';

const ConfirmAccount: React.FC = () => {
	return (
		<div
			style={{
				display: 'flex',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#f0f2f5',
				fontFamily: 'Arial, sans-serif',
			}}
		>
			<div
				style={{
					display: 'flex',
					backgroundColor: '#ffffff',
					borderRadius: '30px',
					boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
					overflow: 'hidden',
					width: '500px',
					padding: '2rem',
					flexDirection: 'column',
					textAlign: 'center',
					position: 'relative',
				}}
			>
				<Link
					to="/"
					style={{
						position: 'absolute',
						top: '1rem',
						right: '1rem',
						color: '#007BFF',
						fontSize: '1.5rem',
						cursor: 'pointer',
					}}
				>
					<AiOutlineHome />
				</Link>
				<img
					src={logoDark}
					alt="Logo"
					style={{ width: '100px', margin: '0 auto 1rem' }}
				/>
				<h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
					Please check your inbox
				</h3>
				<div style={{ marginBottom: '1.5rem' }}>
					<svg
						className="w-20 h-20 mx-auto text-primary"
						viewBox="0 0 24 24"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						style={{ width: '80px', height: '80px', color: '#007BFF' }}
					>
						<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
							<rect id="bound" x={0} y={0} width={24} height={24} />
							<path
								d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z"
								id="Combined-Shape"
								fill="currentColor"
								opacity="0.3"
							/>
							<path
								d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z"
								id="Combined-Shape"
								fill="currentColor"
							/>
						</g>
					</svg>
				</div>
				<p style={{ marginBottom: '1rem', color: 'gray' }}>
					We sent a confirmation link to you at{' '}
					<span style={{ fontWeight: 'bold', color: '#007BFF' }}>
						youremail@domain.com
					</span>
				</p>
				<p style={{ marginBottom: '1.5rem', color: 'gray' }}>
					Simply click on the link available in the email to confirm your
					account.
				</p>
				<div>
					<p style={{ color: 'gray' }}>
						Back to{' '}
						<Link
							to="/login"
							style={{ color: '#007BFF', fontWeight: 'bold' }}
						>
							Log In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConfirmAccount;
