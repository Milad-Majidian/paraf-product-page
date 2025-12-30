import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, formatToman } from "@/feature/product/mocks/products"
import ProductPage from "@/feature/product/components/ProductPage"

export const dynamic = "force-dynamic"

type PageProps = {
	params: { slug: string } | Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params
	const product = await getProductBySlug(slug)

	if (!product) {
		return {
			title: "محصول پیدا نشد",
			robots: { index: false, follow: false },
		}
	}

	const title = `${product.title} | پاراف`
	const description = product.description
	const canonical = `/product/${product.slug}`

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			type: "website",
			url: canonical,
			images: product.images.slice(0, 1).map((img) => ({ url: img.src, alt: img.alt })),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: product.images.slice(0, 1).map((img) => img.src),
		},
	}
}

export default async function Page({
	params,
}: PageProps) {
	const { slug } = await params
	const product = await getProductBySlug(slug)
	
	console.log('product',product)

	if (!product) {
		notFound()
	}

	return (
		<>
			<ProductPage product={product} />
		</>
	)
}