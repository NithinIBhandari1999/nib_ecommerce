import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCountCart } from '../../redux/states/cart';

const Header = () => {
	const count = useSelector(selectCountCart);

	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary bg-light'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					Ecommerce
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link className='nav-link active' aria-current='page' to='/search'>
								Search
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/cart'>
								Cart ({count.length})
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
