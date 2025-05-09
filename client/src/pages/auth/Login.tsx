import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineHome } from 'react-icons/ai';
import logo from '../../assets/images/logo-dark.png';

const Login: React.FC = () => {
	const navigate = useNavigate();

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
					src={logo} 
					alt="Logo" 
					style={{ width: '100px', margin: '0 auto 1rem' }} 
				/>
				<h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Welcome back!</h3>
				<p style={{ marginBottom: '1.5rem' }}>Sign in to access the admin panel.</p>

				<button style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					backgroundColor: '#fff',
					color: '#000',
					border: '1px solid #ccc',
					padding: '0.8rem',
					borderRadius: '8px',
					cursor: 'pointer',
					marginBottom: '1rem',
					fontWeight: 'bold'
				}}>
					<FcGoogle style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} />
					Sign in with Google
				</button>

				<button style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					backgroundColor: '#7289da',
					color: '#fff',
					border: 'none',
					padding: '0.8rem',
					borderRadius: '8px',
					cursor: 'pointer',
					marginBottom: '1.5rem',
					fontWeight: 'bold'
				}}>
					<FaDiscord style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} />
					Sign in with Discord
				</button>

				<form>
					<input type="text" placeholder="Email" required style={{
						width: '100%',
						padding: '0.8rem',
						margin: '0.5rem 0',
						border: '1px solid #ccc',
						borderRadius: '8px'
					}} />
					<input type="password" placeholder="Password" required style={{
						width: '100%',
						padding: '0.8rem',
						margin: '0.5rem 0',
						border: '1px solid #ccc',
						borderRadius: '8px'
					}} />
					<p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'gray', textAlign: 'right' }}>
						<Link to="/forget-password" style={{ color: 'gray', textDecoration: 'none' }}>Forgot Password?</Link>
					</p>
					

					<button type="submit" style={{
						width: '80%',
						backgroundColor: '#007BFF',
						color: '#fff',
						border: 'none',
						padding: '0.8rem',
						borderRadius: '8px',
						cursor: 'pointer',
						marginTop: '1rem',
						fontWeight: 'bold'
					}} onClick={(e) => {
						e.preventDefault();
						const emailInput = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value;
						const passwordInput = (document.querySelector('input[type="password"]') as HTMLInputElement)?.value;

						if (emailInput === 'admin@revenueroots.com' && passwordInput === 'admin123') {
							navigate('/dashboard');
						} else {
							alert('Invalid email or password');
						}
					}}>Login</button>
				</form>

				<div style={{ marginTop: '1rem' }}>
					<p>Don't have an account? <Link to="/register" style={{ color: '#4CAF50', fontWeight: 'bold' }}>Sign Up</Link></p>
					
				</div>
			</div>
		</div>
	);
}

export default Login;
