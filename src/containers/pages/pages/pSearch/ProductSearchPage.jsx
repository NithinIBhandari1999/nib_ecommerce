import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import {
	reduxAddToCart,
	reduxRemoveFromCart,
	selectCountCart,
} from '../../../../redux/states/cart';

import envKeys from '../../../../config/envKeys';

const ProductSearchPage = () => {
	// -----
	// redux
	const dispatch = useDispatch();
	const cartList = useSelector(selectCountCart);

	// -----
	// useState
	const [searchQuery, setSearchQuery] = useState('');
	const [productList, setProductList] = useState([]);
	const [page, setPage] = useState(1);
	const [isNextPageAvailable, setIsNextPageAvailable] = useState(false);

	const [requestGetProduct, setRequestGetProduct] = useState({
		loading: true,
		success: '',
		error: '',
	});

	// -----
	// useEffect
	useEffect(() => {
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPage(1);
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	useEffect(() => {
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	// -----
	// functions
	const getProducts = async () => {
		try {
			setIsNextPageAvailable(false);

			setRequestGetProduct({
				loading: true,
				success: '',
				error: '',
			});
			setProductList([]);

			let finalLimit = 4;

			let tempBody = {
				search: searchQuery,
				page: page - 1,
				limit: finalLimit + 1,
			};

			if (tempBody.page < 0) {
				tempBody.page = 0;
			}

			const res = await axios.post(`${envKeys.API_URL}/product/getAllProduct`, tempBody, {});

			let tempProductList = res.data;

			if (Array.isArray(tempProductList)) {
				if (tempProductList.length === finalLimit + 1) {
					setIsNextPageAvailable(true);
					tempProductList.pop();
				}

				setProductList(tempProductList);
			}

			setRequestGetProduct({
				loading: false,
				success: 'success',
				error: '',
			});
		} catch (error) {
			console.error(error);
			setRequestGetProduct({
				loading: false,
				success: '',
				error: 'Unexpected error occured. Please try again later.',
			});
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

	// -----
	// renderFunctions
	const renderFilter = () => {
		return (
			<div className='pb-5'>
				<DebounceInput
					minLength={0}
					debounceTimeout={300}
					type='text'
					class='form-control'
					id='inputSearch'
					placeholder='Search...'
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
					}}
				/>
			</div>
		);
	};

	const renderProductList = () => {
		return (
			<div className='pb-5'>
				<div className='row'>
					{productList.map((item) => {
						let cartStatus = doesExistInCart(item._id);

						return (
							<div className='col-12 col-md-6 col-lg-3'>
								<div className='py-3 h-100'>
									<div
										class='card h-100'
										style={{
											width: '100%;',
										}}
									>
										<img
											src={item.imageUrl}
											class='card-img-top'
											alt='...'
											style={{
												height: '200px',
												objectFit: 'contain',
											}}
										/>
										<div class='card-body'>
											<h5 class='card-title'>{item.name}</h5>
											<div class=''>
												<div className='d-inline-block fw-bold'>
													Rs {item.discountAmount}
												</div>
												<div className='ps-3 d-inline-block text-muted'>
													Rs {item.price}
												</div>
											</div>
											<p class='card-text'>{item.description}</p>
											<div>
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
														<button class='me-1 btn btn-primary'>
															{cartStatus.addedCount}
														</button>
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
												<Link to='/' class=' btn btn-outline-primary ms-3'>
													More Info
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const renderPagination = () => {
		return (
			<div className='text-center'>
				<div className='p-2 my-1 me-1 border d-inline-block fw-bold'>Page: {page}</div>
				{isNextPageAvailable && (
					<button
						className='btn btn-primary ms-3'
						onClick={() => {
							setPage(page + 1);
						}}
					>
						Next Page
					</button>
				)}
				{page >= 2 && (
					<button
						className='btn btn-primary ms-3'
						onClick={() => {
							let tempPage = page - 1;
							if (tempPage <= 1) {
								tempPage = 1;
							}
							setPage(tempPage);
						}}
					>
						PrevPage
					</button>
				)}
			</div>
		);
	};

	return (
		<div className='container-sm py-5'>
			{renderFilter()}

			{requestGetProduct.loading && (
				<div className='text-center py-5'>
					<div class='spinner-border' role='status'></div>
				</div>
			)}

			{!requestGetProduct.loading && requestGetProduct.error !== '' && (
				<div className='text-center py-5'>
					<div class='alert text-danger' role='alert'>
						{requestGetProduct.error}
					</div>
				</div>
			)}

			{renderProductList()}
			{renderPagination()}
		</div>
	);
};

export default ProductSearchPage;
