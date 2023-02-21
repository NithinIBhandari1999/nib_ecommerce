import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	reduxAddToCart,
	reduxRemoveFromCart,
	selectCountCart,
} from '../../../../redux/states/cart';

const UserCart = () => {
	// redux
	const dispatch = useDispatch();
	const cartList = useSelector(selectCountCart);

	// -----
	// functions
	const getTotalCost = () => {
		try {
			let returnTotal = 0;

			for (let index = 0; index < cartList.length; index++) {
				const element = cartList[index];
				let totalItemCost = element.discountAmount * element.purchaseQuantity;
				returnTotal += totalItemCost;
			}

			return returnTotal;
		} catch (error) {
			return 0;
		}
	};

	const addToCart = (item) => {
		try {
			dispatch(reduxAddToCart(item));
		} catch (error) {
			console.error(error);
		}
	};

	const removeFromCart = (item) => {
		try {
			console.log(cartList);
			dispatch(reduxRemoveFromCart(item));
		} catch (error) {
			console.error(error);
		}
	};

	const doesExistInCart = (productId) => {
		try {
			let returnObj = {
				addedCount: 0,
			};

			if (cartList.length === 0) {
				return returnObj;
			}

			for (let index = 0; index < cartList.length; index++) {
				const element = cartList[index];
				if (element._id === productId) {
					returnObj.addedCount = element.purchaseQuantity;
				}
			}

			return returnObj;
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='py-5'>
			<div className='container'>
				<h1 className='mb-5'>Shopping Cart:</h1>

				<table className='table'>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Price</th>
							<th>Qty</th>
						</tr>
					</thead>
					<tbody>
						{cartList.map((item, index) => {
							let cartStatus = doesExistInCart(item._id);

							return (
								<tr>
									<td>{index + 1}</td>
									<td>
										<img
											src={item.imageUrl}
											alt=''
											style={{
												width: '50px',
												height: '50px',
												objectFit: 'contain',
												padding: '5px',
											}}
											className={'d-none d-md-inline-block'}
										/>
										{item.name}
									</td>
									<td>{item.discountAmount}</td>
									<td>{item.purchaseQuantity}</td>
									<td>
										{cartStatus.addedCount === 0 && (
											<button
												class='btn btn-primary'
												onClick={() => {
													addToCart(item);
												}}
											>
												Add to cart
											</button>
										)}
										{cartStatus.addedCount !== 0 && (
											<Fragment>
												<button
													class='me-1 btn btn-secondary'
													onClick={() => {
														addToCart(item);
													}}
												>
													+1
												</button>
												<button
													class='me-1 btn btn-outline-secondary'
													onClick={() => {
														removeFromCart(item);
													}}
												>
													-1
												</button>
											</Fragment>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className='py-5'>
					<h3>Total: Rs {getTotalCost()}</h3>
				</div>
			</div>
		</div>
	);
};

export default UserCart;
