import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput, VerticalForm } from '@/components';
import { AiOutlineHome } from 'react-icons/ai';
import logoDark from '@/assets/images/logo-dark.png';

interface UserData {
	email: string;
}

// * form validation schema
const schemaResolver = yupResolver(
	yup.object().shape({
		email: yup.string().email('Invalid email').required('Please enter email'),
	})
);

const RecoverPassword: React.FC = () => {
	useEffect(() => {
		if (document.body) {
			document.body.classList.add('bg-slate-100', 'tracking-wide');
		}

		return () => {
			if (document.body) {
				document.body.classList.remove('bg-slate-100', 'tracking-wide');
			}
		};
	}, []);

	return (
		<div style={{
			display: 'flex',
			height: '100vh',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#f0f2f5',
			fontFamily: 'Arial, sans-serif'
		}}>
			<div style={{
				display: 'flex',
				backgroundColor: '#ffffff',
				borderRadius: '30px',
				boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
				overflow: 'hidden',
				width: '500px',
				padding: '2rem',
				flexDirection: 'column',
				textAlign: 'center',
				position: 'relative'
			}}>
				<Link to="/" style={{
					position: 'absolute',
					top: '1rem',
					right: '1rem',
					color: '#007BFF',
					fontSize: '1.5rem',
					cursor: 'pointer'
				}}>
					<AiOutlineHome />
				</Link>
				<img
					src={logoDark}
					alt="Logo"
					style={{ width: '100px', margin: '0 auto 1rem' }}
				/>
				<h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Reset Password</h3>
				<p style={{ marginBottom: '1.5rem' }}>
					Enter your email address and we'll send you an email with instructions to reset your password.
				</p>

				<VerticalForm<UserData>
					onSubmit={() => {
						null;
					}}
					resolver={schemaResolver}
				>
					<FormInput
						name="email"
						label=""
						containerClass="mb-4"
						className="py-2 px-4 leading-6 block w-full border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
						placeholder="Email"
						style={{
							width: '100%',
							padding: '0.8rem',
							margin: '0.5rem 0',
							border: '1px solid #ccc',
							borderRadius: '8px'
						}}
					/>
					<button
						type="submit"
						style={{
							width: '100%',
							backgroundColor: '#007BFF',
							color: '#fff',
							border: 'none',
							padding: '0.8rem',
							borderRadius: '8px',
							cursor: 'pointer',
							marginTop: '1rem',
							fontWeight: 'bold'
						}}
					>
						Submit
					</button>
				</VerticalForm>

				<div style={{ marginTop: '1rem' }}>
					<p>
						Back to{' '}
						<Link to="/login" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
							Log In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecoverPassword;
