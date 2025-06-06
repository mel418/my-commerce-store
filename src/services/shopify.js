import axios from "axios";

// config
const SHOPIFY_DOMAIN = process.env.REACT_APP_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN;

// create axios instance with shopify config
const shopifyClient = axios.create({
    baseURL: `https://${SHOPIFY_DOMAIN}/api/2025-04/graphql.json`,
    headers: {
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        'Content-Type': 'application/json',
    },
});

// graphQL query to get products
const GET_PRODUCTS_QUERY = `
    query getProducts($first: Int!) {
        products(first: $first) {
            edges {
                node {
                    id
                    title
                    description
                    handle
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                originalSrc
                                altText
                            }
                        }
                    }
                }
            }
        }
    }
`;

// function to fetch products
export const getProducts = async (count = 10) => {
    try {
        const response = await shopifyClient.post('', {
            query: GET_PRODUCTS_QUERY,
            variables: {first: count},
        });

        if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }

        // transform the graphQL response to a simpler format
        const products = response.data.data.products.edges.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            handle: edge.node.handle,
            price: edge.node.priceRange.minVariantPrice.amount,
            currency: edge.node.priceRange.minVariantPrice.currencyCode,
            image: edge.node.images.edges[0]?.node.originalSrc || null,
            imageAlt: edge.node.images.edges[0]?.node.altText || edge.node.title,
        }));

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};