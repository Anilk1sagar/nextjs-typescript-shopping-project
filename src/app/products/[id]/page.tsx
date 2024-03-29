'use client';

import Product404 from '@/components/Product404';
import { useAppDispatch } from '@/store/hooks';
import { fetchProductById } from '@/store/slices/products';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductImages from './_components/ProductImages';
import ProductDetails from './_components/ProductDetails';

type Props = {
	params: { id: string };
};
const ProductPage = (props: Props) => {
	const { params } = props;
	const dispatch = useAppDispatch();

	const [product, setProduct] = useState<{ data: Product | null; isLoading: boolean; error: any | null }>({
		data: null,
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		dispatch(fetchProductById({ productId: +params.id }))
			.unwrap()
			.then((resp) => {
				setProduct({ data: resp, isLoading: false, error: null });
			})
			.catch((err: any) => {
				setProduct({ data: null, isLoading: false, error: err });
			});
	}, [dispatch, params.id]);

	if (product.isLoading) {
		return (
			<div className="flex-1 container flex flex-col items-center justify-center gap-3">
				<Loader2 size={50} className="animate-spin text-primary" />
				<span>Loading product, please wait...</span>
			</div>
		);
	}

	if (product.error) {
		return (
			<p className="text-red-600">
				Something went wrong from server side
				<br />
				Error: {product.error.message}
			</p>
		);
	}

	if (!product.data) {
		return <Product404 />;
	}

	return (
		<div className="flex-1 flex flex-col pt-10 pb-20">
			<div className="container">
				<section className="flex gap-10 max-md:flex-col max-sm:gap-6">
					<div className="flex-1">
						<ProductImages product={product.data} />
					</div>

					<div className="basis-[40%]">
						<ProductDetails product={product.data} />
					</div>
				</section>
			</div>
		</div>
	);
};

export default ProductPage;
