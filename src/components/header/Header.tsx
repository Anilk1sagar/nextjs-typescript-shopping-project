'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import Search from './Search';
import { cn } from '@/lib/utils';

const NavLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Products', href: '/products' },
	{ label: 'Men', href: '/' },
	{ label: 'Women', href: '/' },
	{ label: 'Kids', href: '/' },
];

const Header = () => {
	const cart = useAppSelector((state) => state.cart.cart);
	const currentRoute = usePathname();

	return (
		<header className="min-h-[var(--header-height)] flex items-center shadow fixed top-0 left-0 w-full bg-white z-50">
			<div className="container flex justify-between items-center gap-20">
				<div className="h-[30px]">
					<Link href="/">
						<Image
							src="/assets/images/brand-logo.svg"
							alt="brand-logo"
							className="w-auto h-full"
							width={85}
							height={30}
						/>
					</Link>
				</div>

				<div className="flex-1 flex items-center gap-8 justify-between">
					<nav className="flex items-center gap-5 font-semibold">
						{NavLinks.map((navLink) => (
							<Link
								href={navLink.href}
								key={navLink.href}
								className={currentRoute === navLink.href ? 'text-primary' : ''}
							>
								{navLink.label}
							</Link>
						))}
					</nav>

					<div className="flex-1 justify-end flex items-center gap-8">
						<Search />

						<Link
							href="/cart"
							className={cn('flex gap-1 font-semibold', currentRoute === '/cart' ? 'text-primary' : '')}
						>
							<div className="relative">
								<ShoppingCart size={22} strokeWidth={1.5} />
								{cart.length > 0 && (
									<div className="font-bold absolute -top-[9px] -right-[8px] w-4 h-4 rounded-full flex items-center justify-center text-[12px] leading-[13px] bg-destructive text-destructive-foreground">
										{cart.length > 9 ? '9+' : cart.length}
									</div>
								)}
							</div>
							<span>Cart</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;